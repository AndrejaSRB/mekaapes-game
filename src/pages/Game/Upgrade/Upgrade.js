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
// ******** HOC ********
import withConnect from "../../../hoc/withConnect";
// ******** Icons ********
import { InfoOutlined } from "@ant-design/icons";
// ******** Images ********
import Placeholder from "../../../assets/placeholder.png";
// ******** Functions ********
import { getLevelText, convertBigNumberToPrice } from "./helpers";
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
import { LEVELUP_ROBO, getEvent } from "../../../eventsListeners";
// ******** Text ********
import {
  DONT_ENOUGH_DMT,
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
  ApeTitle,
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
  const { getDmtBalance, DMTBalanceBigNumber } = useContext(BalanceContext);
  const [isApeModalOpen, setIsApeModalOpen] = useState(false);
  const [selectedApe, setSelectedApe] = useState(null);
  const [burnedApe, setBurnedApe] = useState(null);
  const [keepApe, setKeepApe] = useState(null);
  const [oppositeApe, setOpposite] = useState(null);
  const [apeType, setApeType] = useState(null);
  const [isDMTDisable, setIsDMTDisabled] = useState(true);
  const [isOGDisabled, setIsOGDisabled] = useState(true);
  const [loader, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(true);
  const [isApprovedBtnDisabled, setIsApprovedBtnDisabled] = useState(false);
  const [isOpenUpgradeInfoModal, setIsOpenUpgradeInfoModal] = useState(false);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [list, setList] = useState(null);
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
  const [price, setPrice] = useState(BigNumber.from(0));
  // $DMT Transaction approve
  const {
    data: isDMTApprovedStatus,
    isLoading: isDMTpprovedLoading,
    refetch: getIfDMTIsApproved,
  } = useIsDMTTransactionApproved(userMetaMaskToken, price);
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
    }
  }, [getDmtBalance, userMetaMaskToken]);

  // Set Price
  useEffect(() => {
    if (userMetaMaskToken && prices && !priceLoading) {
      let level = 1;
      if (keepApe) {
        level = keepApe.level;
      }
      const levelUpPrice = prices?.["roboLevelupPrice"]?.[level]
        ? prices?.["roboLevelupPrice"]?.[level]
        : prices?.[priceOrder["roboLevelupPrice"]]?.[level];
      setPrice(levelUpPrice);
    }
  }, [prices, userMetaMaskToken, priceLoading, keepApe]);

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

  // Check if $DMT transaction is approved
  useEffect(() => {
    if (isDMTApprovedStatus !== null && isDMTApprovedStatus !== undefined) {
      setIsApproved(isDMTApprovedStatus);
    }
  }, [isDMTApprovedStatus]);

  useEffect(() => {
    if (keepApe) {
      setIsDMTDisabled(false);
    } else {
      setIsDMTDisabled(true);
    }
  }, [keepApe]);

  useEffect(() => {
    if (burnedApe) {
      setIsOGDisabled(false);
    } else {
      setIsOGDisabled(true);
    }
  }, [burnedApe]);

  const handleSaveApe = (ape) => {
    if (apeType === "keep") {
      setKeepApe(ape);
    } else {
      setBurnedApe(ape);
    }
    setApeType(null);
  };

  const handleOpenApeModal = (type) => () => {
    if (type === "keep") {
      setSelectedApe(keepApe);
      setOpposite(burnedApe);
    } else {
      setSelectedApe(burnedApe);
      setOpposite(keepApe);
    }
    setApeType(type);
    setIsApeModalOpen(true);
  };

  const handleCloseApeModal = () => {
    setIsApeModalOpen(false);
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
          <ApeTitle>Keep</ApeTitle>
          <Ape currentLvl={keepApe.level} onClick={handleOpenApeModal("keep")}>
            {renderRoboOogaImage(keepApe)}
          </Ape>
          <Name>Robo Ooga #{keepApe.id}</Name>
        </ApeBox>
      );
    } else {
      return (
        <ApeBox>
          <ApeTitle>Keep</ApeTitle>
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

  const renderBurnRoboOoga = () => {
    if (burnedApe) {
      return (
        <ApeBox>
          <ApeTitle>Burn</ApeTitle>
          <Ape
            currentLvl={burnedApe.level}
            onClick={handleOpenApeModal("burn")}>
            {renderRoboOogaImage(burnedApe)}
          </Ape>
          <Name>Robo Ooga #{burnedApe.id}</Name>
        </ApeBox>
      );
    } else {
      return (
        <ApeBox>
          <ApeTitle>Burn</ApeTitle>
          <Ape currentLvl={""} onClick={handleOpenApeModal("burn")}>
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

  const getIfItsDMTDisabled = () => {
    let disabled = true;
    if (isDMTDisable) {
      disabled = true;
    } else if (keepApe) {
      disabled = false;
    } else {
      disabled = true;
    }
    return disabled;
  };

  const getIfItsOGDisabled = () => {
    let disabled = true;
    if (isOGDisabled) {
      disabled = true;
    } else if (keepApe && burnedApe) {
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
    let upgradeEvent = getEvent(receipt, mekaApesContract, LEVELUP_ROBO);
    let allTokens = [];
    if (upgradeEvent) {
      let id = upgradeEvent.args.oogaId.toNumber();
      let level = upgradeEvent.args.newLevel.toNumber();
      allTokens.push({
        type: "upgrade",
        id: id,
        level: level,
      });
    }
    setTokens(allTokens);
    setKeepApe(null);
    setBurnedApe(null);
    getFreshData();
    setActionLoading(false);
    setIsResultsModalOpen(true);
  };

  const getEstimatedGas = async (id) => {
    let gasEstimation =
      await contract.mekaApesContract.estimateGas.levelUpRoboOooga(id);
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

  const handleClickButton = async () => {
    if (!isMintSale) {
      if (DMTBalanceBigNumber.gt(price) || DMTBalanceBigNumber.eq(price)) {
        if (keepApe) {
          setIsDMTDisabled(true);
          setIsOGDisabled(true);
          setText(getActionLoadingUpgrade(keepApe.id));
          try {
            // get Gas Estimation from the contract
            let totalGasEstimation = getEstimatedGas(keepApe.id);
            let tsx = await contract.levelUpRoboOooga(
              keepApe.id,
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
          setIsDMTDisabled(false);
          setIsOGDisabled(false);
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
            <h4>Infuse Robo Oogas with $DMT</h4>
            <h6>
              Level-up Robo Oogas using $DMT to make them produce more $OG and
              gain other features. You don't need to unstake Robo Oogas to
              upgrade them! Every Robo Ooga starts as a Garbage Compactor (Lvl
              1) and can get upgraded to become an Executive Bot (Lvl 4).
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
            <ApesWrapper>
              {renderBurnRoboOoga()}
              {renderKeepRoboOoga()}
            </ApesWrapper>
            <ButtonBox>
              {isApproved ? (
                <ButtonWrapper>
                  <div>
                    <button
                      disabled={getIfItsOGDisabled()}
                      onClick={handleClickButton}>
                      Upgrade with $OG
                    </button>
                    <Price>4,000 $OG</Price>
                  </div>
                  <div>
                    <button
                      disabled={getIfItsDMTDisabled()}
                      onClick={handleClickButton}>
                      Upgrade with $DMT
                    </button>
                    <Price>300 $DMT</Price>
                  </div>
                </ButtonWrapper>
              ) : (
                <button
                  disabled={isApprovedBtnDisabled}
                  onClick={handleClickApproveDMT}>
                  Approve $DMT Transaction
                </button>
              )}
            </ButtonBox>
            <HelperText>
              Each Level-Up costs{" "}
              {beautifyPrice(convertBigNumberToPrice(price))} $DMT. You can
              convert $OG to $DMT here:
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
                <LevelBox level={getLevel("up")} />
                <h6>Next Level:</h6>
                <LevelList>{getLevelText(getLevel("up"))}</LevelList>
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
          oppositeApe={oppositeApe}
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
    </Wrapper>
  );
};

export default withConnect(Upgrade, "/game/upgrade");
