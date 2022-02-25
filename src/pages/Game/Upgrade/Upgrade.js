import { useState, useContext, useEffect } from "react";
import { useLazyQuery, useApolloClient } from "@apollo/client";
import { BigNumber } from "ethers";
import * as Sentry from "@sentry/react";
// ******** Components ********
import { message } from "antd";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import LevelRoboOogas from "../../../components/Modals/LevelRoboOogas/LevelRoboOogas";
import UpgradeInfo from "../../../components/Modals/UpgradeInfo/UpgradeInfo";
import Loading from "../../../components/Modals/Loading/Loading";
import ResultsModal from "../../../components/Modals/ResultModal/ResultModal";
import ActionsLoading from "../../../components/Modals/ActionLoading/ActionLoading";
import LevelCounter from "./LevelCounter";
import BurnRoboModal from "../../../components/Modals/BurnRoboModal/BurnRoboModal";
// ******** HOC ********
import withConnect from "../../../hoc/withConnect";
// ******** Icons ********
import { InfoOutlined } from "@ant-design/icons";
// ******** Images ********
import Placeholder from "../../../assets/placeholder.png";
// ******** Functions ********
import { getLevelText, convertBigNumberToPrice, getAllPrices } from "./helpers";
import { beautifyPrice, getReducedEstimatedGas } from "../Factory/helper";
// ******** Store ********
import { BalanceContext } from "../../../store/balance-context";
import { UserContext } from "../../../store/user-context";
import { MintedContext } from "../../../store/minted-context";
// ******** Hooks ********
import usePrices from "../../../hooks/usePrices";
import useIsDMTTransactionApproved from "../../../hooks/useIsDMTTransactionApproved";
// ******** Queires ********
import {
  GET_ROBO_OOGAS_UNSTAKED_UPGRADE_TOKENS,
  GET_ROBO_OOGAS_STAKED_UPGRADE_TOKENS,
} from "../../../queries";
// ******** Services ********
import contract from "../../../services/contract";
// ******** Config ********
import priceOrder from "../../../config/pricesOrder";
// ******** Events ********
import { LEVELUP_ROBO, getAllEvents } from "../../../eventsListeners";
// ******** Text ********
import {
  DONT_ENOUGH_DMT,
  DONT_ENOUGH_OG,
  PRE_SALE_IS_ONGOING,
  SOMETHING_WENT_WRONG,
  getActionLoadingUpgrade,
} from "../../../messages";
// ******** Styles ********
import {
  Wrapper,
  Title,
  Content,
  MainBox,
  TitleBox,
  ButtonBox,
  HelperText,
  LeftSide,
  Middle,
  RightSide,
  LevelBoxWrapper,
  ApeBox,
  Ape,
  LevelList,
  Name,
  InfoIcon,
  LevelBoxContainer,
  PlaceholderImage,
  ApesWrapper,
  ButtonWrapper,
  Price,
} from "./Upgrade.styles";

const LevelBox = ({ level }) => (
  <LevelBoxContainer>
    <LevelBoxWrapper currentLvl={`${level}`}>
      <span>lvl</span>
      <p>{+level}</p>
    </LevelBoxWrapper>
  </LevelBoxContainer>
);

const Upgrade = () => {
  const client = useApolloClient();
  const { userMetaMaskToken } = useContext(UserContext);
  const { isMintSale } = useContext(MintedContext);
  const {
    getDmtBalance,
    DMTBalanceBigNumber,
    getOogearBalance,
    OGBalanceBigNumber,
  } = useContext(BalanceContext);
  const [isApeModalOpen, setIsApeModalOpen] = useState(false);
  const [selectedApe, setSelectedApe] = useState(null);
  const [keepApe, setKeepApe] = useState(null);
  const [apeType, setApeType] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loader, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(true);
  const [isApprovedBtnDisabled, setIsApprovedBtnDisabled] = useState(false);
  const [isOpenUpgradeInfoModal, setIsOpenUpgradeInfoModal] = useState(false);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [list, setList] = useState(null);
  // Levels
  const [level, setLevel] = useState(1);
  const [levelCounter, setLevelCounter] = useState(1);
  const [nextLevel, setNextLevel] = useState(1);

  const [isRoboBurnModalOpen, setIsRoboBurnModalOpen] = useState(false);

  const [
    getUnstakedRoboOogas,
    { loading: unstakedRoboLoading, data: unstakedRoboData },
  ] = useLazyQuery(GET_ROBO_OOGAS_UNSTAKED_UPGRADE_TOKENS, {
    fetchPolicy: "no-cache",
  });
  const [
    getStakedRoboOogas,
    { loading: stakedRoboLoading, data: stakedRoboData },
  ] = useLazyQuery(GET_ROBO_OOGAS_STAKED_UPGRADE_TOKENS, {
    fetchPolicy: "no-cache",
  });
  // Prices
  const { data: prices, isLoading: priceLoading } =
    usePrices(userMetaMaskToken);
  const [dmtPrice, setDMTPrice] = useState(BigNumber.from(0));
  const [ogPrice, setOGPrice] = useState(BigNumber.from(0));
  const [allDMTPrices, setDMTPrices] = useState([
    BigNumber.from(0),
    BigNumber.from(0),
    BigNumber.from(0),
    BigNumber.from(0),
    BigNumber.from(0),
    BigNumber.from(0),
  ]);
  const [allOGPrices, setOGPrices] = useState([
    BigNumber.from(0),
    BigNumber.from(0),
    BigNumber.from(0),
    BigNumber.from(0),
    BigNumber.from(0),
    BigNumber.from(0),
  ]);
  // $DMT Transaction approve
  const {
    data: isDMTApprovedStatus,
    isLoading: isDMTpprovedLoading,
    refetch: getIfDMTIsApproved,
  } = useIsDMTTransactionApproved(userMetaMaskToken, dmtPrice);
  // Events
  const [tokens, setTokens] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    if (
      priceLoading ||
      isDMTpprovedLoading ||
      stakedRoboLoading ||
      unstakedRoboLoading
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [
    priceLoading,
    isDMTpprovedLoading,
    unstakedRoboLoading,
    stakedRoboLoading,
  ]);

  useEffect(() => {
    if (userMetaMaskToken) {
      getDmtBalance();
      getOogearBalance();
    }
  }, [getDmtBalance, userMetaMaskToken, getOogearBalance]);

  useEffect(() => {
    if (
      unstakedRoboData &&
      unstakedRoboData.spaceOogas &&
      stakedRoboData &&
      stakedRoboData.spaceOogas
    ) {
      setList([...unstakedRoboData.spaceOogas, ...stakedRoboData.spaceOogas]);
    } else {
      setList(null);
    }
  }, [unstakedRoboData, stakedRoboData]);

  useEffect(() => {
    let isMounted = true;
    if (userMetaMaskToken && isMounted && isApeModalOpen) {
      getUnstakedRoboOogas({
        variables: {
          owner: userMetaMaskToken,
        },
      });
      getStakedRoboOogas({
        variables: {
          owner: userMetaMaskToken,
        },
      });
    }
    return () => {
      isMounted = false;
    };
  }, [
    userMetaMaskToken,
    getUnstakedRoboOogas,
    isApeModalOpen,
    getStakedRoboOogas,
  ]);

  // Set Price
  useEffect(() => {
    if (userMetaMaskToken && prices && !priceLoading) {
      // DMT Prices
      const levelUpDMTPrice = prices?.["roboLevelupPrice"]
        ? prices?.["roboLevelupPrice"]
        : prices?.[priceOrder["roboLevelupPrice"]];

      // OG Prices
      const levelUpOGPrice = prices?.["roboLevelupPriceOG"]
        ? prices?.["roboLevelupPriceOG"]
        : prices?.[priceOrder["roboLevelupPriceOG"]];

      if (levelUpDMTPrice) {
        setDMTPrices([...levelUpDMTPrice]);
      }

      if (levelUpOGPrice) {
        setOGPrices([...levelUpOGPrice]);
      }
    }
  }, [prices, userMetaMaskToken, priceLoading, keepApe]);

  // SUM current $DMT price based on level
  useEffect(() => {
    let level = 1;
    if (keepApe) {
      level = keepApe.level;
    }
    if (keepApe) {
      let all_dmt_prices = [...allDMTPrices];
      const totalDMTPrice = getAllPrices(all_dmt_prices, level, levelCounter);
      setDMTPrice(totalDMTPrice);
    } else {
      setDMTPrice(allDMTPrices[level]);
    }
  }, [levelCounter, keepApe, allDMTPrices]);

  // SUM current $OG price based on level
  useEffect(() => {
    let level = 1;
    if (keepApe) {
      level = keepApe.level;
    }
    if (keepApe) {
      let all_og_prices = [...allOGPrices];
      const totalOGPrice = getAllPrices(all_og_prices, level, levelCounter);
      setOGPrice(totalOGPrice);
    } else {
      setOGPrice(allOGPrices[level]);
    }
  }, [levelCounter, keepApe, allOGPrices]);

  // Set Next Level
  useEffect(() => {
    if (levelCounter) {
      setNextLevel(levelCounter + level);
    }
  }, [levelCounter, level]);

  // Check if $DMT transaction is approved
  useEffect(() => {
    if (isDMTApprovedStatus !== null && isDMTApprovedStatus !== undefined) {
      setIsApproved(isDMTApprovedStatus);
    }
  }, [isDMTApprovedStatus]);

  useEffect(() => {
    if (keepApe) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [keepApe]);

  const handleSaveApe = (ape) => {
    if (apeType === "keep") {
      setKeepApe(ape);
      setLevel(ape.level);
      setLevelCounter(1);
      setNextLevel(ape.level + 1);
    }
    setApeType(null);
  };

  const handleOpenApeModal = (type) => () => {
    if (type === "keep") {
      setSelectedApe(keepApe);
    }
    setApeType(type);
    setIsApeModalOpen(true);
  };

  const handleCloseApeModal = () => {
    setIsApeModalOpen(false);
  };

  const handleOpenOGBurnModal = () => {
    if (OGBalanceBigNumber.gt(ogPrice) || OGBalanceBigNumber.eq(ogPrice)) {
      setIsRoboBurnModalOpen(true);
    } else {
      message.error(DONT_ENOUGH_OG);
    }
  };

  const handleCloseOGBurnModal = () => {
    setIsRoboBurnModalOpen(false);
  };

  const getLevel = (type) => {
    if (keepApe) {
      let lvl = 0;
      if (type === "up") {
        if (keepApe && keepApe.level !== undefined) {
          lvl = +keepApe.level + 1;
        }
      } else if (type === "down") {
        if (keepApe && keepApe.level !== undefined) {
          return +keepApe.level;
        }
      }
      return lvl;
    }
  };

  const renderRoboOogaImage = (ape) => {
    if (ape?.image) {
      return <img src={ape.img} alt={ape.id} />;
    } else {
      return <PlaceholderImage />;
    }
  };

  const renderKeepRoboOoga = () => {
    if (keepApe) {
      return (
        <ApeBox>
          <Ape currentLvl={keepApe.level} onClick={handleOpenApeModal("keep")}>
            {renderRoboOogaImage(keepApe)}
          </Ape>
          <Name>Robo Ooga #{keepApe.id}</Name>
        </ApeBox>
      );
    } else {
      return (
        <ApeBox>
          <Ape currentLvl={""} onClick={handleOpenApeModal("keep")}>
            <img src={Placeholder} alt="ape" />
            <p>
              Select <span>Robo Ooga</span>
            </p>
          </Ape>
          <Name>Robo Ooga</Name>
        </ApeBox>
      );
    }
  };

  const getFreshData = async () => {
    await client.cache.reset().then(async () => {
      getUnstakedRoboOogas({
        variables: {
          owner: userMetaMaskToken,
        },
      });
      getStakedRoboOogas({
        variables: {
          owner: userMetaMaskToken,
        },
      });
    });
  };

  const getIfItsDisabled = () => {
    let disabled = true;
    if (isDisabled) {
      disabled = true;
    } else if (keepApe) {
      disabled = false;
    } else {
      disabled = true;
    }
    return disabled;
  };

  const handleCloseResultsModal = async () => {
    setIsResultsModalOpen(false);
    await getFreshData();
    setText("");
    setTokens(null);
  };

  const getUpgradeEvent = (receipt) => {
    let { mekaApesContract } = contract;
    let upgradeEvent = getAllEvents(receipt, mekaApesContract, LEVELUP_ROBO);
    let allTokens = [];
    if (upgradeEvent?.length > 0) {
      let event = upgradeEvent[upgradeEvent.length - 1];
      if (
        event.args.account.toLowerCase() === userMetaMaskToken.toLowerCase()
      ) {
        let id = event.args.oogaId.toNumber();
        let level = event.args.newLevel.toNumber();
        allTokens.push({
          type: "upgrade",
          id: id,
          level: level,
        });
      }
    }
    setTokens(allTokens);
    setKeepApe(null);
    getFreshData();
    setActionLoading(false);
    setIsResultsModalOpen(true);
  };

  const getEstimatedGas = async (id, levels) => {
    let gasEstimation =
      await contract.mekaApesContract.estimateGas.levelUpRoboOoga(id, levels);
    let totalGasEstimation = getReducedEstimatedGas(gasEstimation);
    return totalGasEstimation;
  };

  const handleClickApproveDMT = async () => {
    setIsApprovedBtnDisabled(true);
    try {
      let tsx = await contract.approveDMTtransaction();
      setLoading(true);
      tsx
        .wait()
        .then(async () => {
          getIfDMTIsApproved();
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          Sentry.captureException(new Error(error), {
            tags: {
              section: "Robo Upgrade ApproveDMT tsx.wait",
            },
          });
          setLoading(false);
          message.error(SOMETHING_WENT_WRONG);
        });
    } catch (error) {
      console.log(error);
      Sentry.captureException(new Error(error), {
        tags: {
          section: "Robo Upgrade ApproveDMT 1st tsx",
        },
      });
      message.error(SOMETHING_WENT_WRONG);
    }
    setIsApprovedBtnDisabled(false);
  };

  const handleClickDMTButton = async () => {
    if (!isMintSale) {
      if (
        DMTBalanceBigNumber.gt(dmtPrice) ||
        DMTBalanceBigNumber.eq(dmtPrice)
      ) {
        if (keepApe) {
          setIsDisabled(true);
          setText(getActionLoadingUpgrade(keepApe.id));
          try {
            // get Gas Estimation from the contract
            let totalGasEstimation = getEstimatedGas(keepApe.id, levelCounter);
            let tsx = await contract.levelUpRoboOoga(
              keepApe.id,
              levelCounter,
              totalGasEstimation
            );
            setActionLoading(true);
            tsx
              .wait()
              .then(async (receipt) => {
                getUpgradeEvent(receipt);
                getDmtBalance();
              })
              .catch((error) => {
                console.log(error);
                Sentry.captureException(new Error(error), {
                  tags: {
                    section: "Robo Upgrade tsx.wait",
                  },
                });
                message.error(SOMETHING_WENT_WRONG);
                setActionLoading(false);
              });
          } catch (error) {
            console.log(error);
            Sentry.captureException(new Error(error), {
              tags: {
                section: "Robo Upgrade 1st tsx",
              },
            });
            message.error(SOMETHING_WENT_WRONG);
          }
          setIsDisabled(false);
        }
      } else {
        message.error(DONT_ENOUGH_DMT);
      }
    } else {
      message.info(PRE_SALE_IS_ONGOING);
    }
  };

  return (
    <Wrapper>
      <Header page="game" />
      <Content>
        <Title>
          Robo Ooga <span>Upgrade</span>
        </Title>
        <MainBox>
          <InfoIcon onClick={() => setIsOpenUpgradeInfoModal(true)}>
            <InfoOutlined />
          </InfoIcon>
          <TitleBox>
            <h4>Upgrade Robo Oogas with $DMT or $OG</h4>
            <h6>
              Upgrade Robo Oogas to make them produce more Crew $OG. Upgrading
              with $OG requires to burn 1 Robo Ooga for each level-up. $DMT
              upgrading does not require to burn Robo Oogas. You can upgrade
              multiple levels in one transaction. Robo Ooga Levels only affect
              the $OG production in Meka Crews.
            </h6>
          </TitleBox>
          <LeftSide>
            {keepApe && (
              <>
                <LevelBox level={getLevel("down")} />
                <h6>Current Level:</h6>
                <LevelList>{getLevelText(getLevel("down"))}</LevelList>
              </>
            )}
          </LeftSide>
          <Middle>
            <ApesWrapper>{renderKeepRoboOoga()}</ApesWrapper>
            {keepApe && (
              <LevelCounter
                level={level}
                setLevelCounter={setLevelCounter}
                levelCounter={levelCounter}
                keepApe={keepApe}
              />
            )}
            <ButtonBox>
              <ButtonWrapper>
                <div>
                  <button
                    className="noselect"
                    disabled={getIfItsDisabled()}
                    onClick={handleOpenOGBurnModal}>
                    Upgrade with $OG
                  </button>
                  {keepApe && (
                    <Price className="noselect">
                      {beautifyPrice(convertBigNumberToPrice(ogPrice))} $OG
                    </Price>
                  )}
                </div>
                {isApproved ? (
                  <div>
                    <button
                      className="noselect"
                      disabled={getIfItsDisabled()}
                      onClick={handleClickDMTButton}>
                      Upgrade with $DMT
                    </button>
                    {keepApe && (
                      <Price className="noselect">
                        {beautifyPrice(convertBigNumberToPrice(dmtPrice))} $DMT
                      </Price>
                    )}
                  </div>
                ) : (
                  <div>
                    <button
                      className="noselect"
                      disabled={isApprovedBtnDisabled}
                      onClick={handleClickApproveDMT}>
                      Approve $DMT Transaction
                    </button>
                    {keepApe && <Price />}
                  </div>
                )}
              </ButtonWrapper>
            </ButtonBox>
            <HelperText>
              You can convert $OG to $DMT here:
              <a
                href="https://app.sushi.com/swap?inputCurrency=0xE89C20096b636fFec9fd26d1a623F42A33eaD309&outputCurrency=0x5b1d655c93185b06b00f7925791106132cb3ad75"
                target="_blank"
                rel="noreferrer">
                SushiSwap
              </a>
            </HelperText>
          </Middle>
          <RightSide>
            {keepApe && (
              <>
                <LevelBox level={nextLevel} />
                <h6>Next Level:</h6>
                <LevelList>{getLevelText(nextLevel)}</LevelList>
              </>
            )}
          </RightSide>
        </MainBox>
      </Content>
      <Footer page="game" />
      {isApeModalOpen && (
        <LevelRoboOogas
          open={isApeModalOpen}
          handleCloseModal={handleCloseApeModal}
          list={list}
          handleSaveApe={handleSaveApe}
          selectedApe={selectedApe}
        />
      )}
      {loader && <Loading open={loader} />}
      {isOpenUpgradeInfoModal && (
        <UpgradeInfo
          open={isOpenUpgradeInfoModal}
          handleClose={() => setIsOpenUpgradeInfoModal(false)}
        />
      )}
      {isResultsModalOpen && (
        <ResultsModal
          open={isResultsModalOpen}
          handleClose={handleCloseResultsModal}
          tokens={tokens}
        />
      )}
      {actionLoading && (
        <ActionsLoading
          open={actionLoading}
          text={text}
          tsxNumber={1}
          tsxTotalNumber={1}
        />
      )}
      {isRoboBurnModalOpen && (
        <BurnRoboModal
          open={isRoboBurnModalOpen}
          levels={levelCounter}
          roboList={list}
          tokenUpgrade={keepApe}
          type="upgrade"
          handleCloseModal={handleCloseOGBurnModal}
          setIsResultsModalOpen={setIsResultsModalOpen}
          setTokens={setTokens}
        />
      )}
    </Wrapper>
  );
};

export default withConnect(Upgrade, "/game/upgrade");
