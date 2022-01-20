import { useState, useContext, useEffect } from "react";
import { useLazyQuery, useApolloClient } from "@apollo/client";
import { BigNumber } from "ethers";
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
  ACTION_LOADING_UPGRADE,
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
  const [isDisabled, setIsDisabled] = useState(true);
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
  ] = useLazyQuery(GET_ROBO_OOGAS_UNSTAKED_UPGRADE_TOKENS);
  const [
    getStakedRoboOogas,
    { loading: stakedRoboLoading, data: stakedRoboData },
  ] = useLazyQuery(GET_ROBO_OOGAS_STAKED_UPGRADE_TOKENS);
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

  // Set Price
  useEffect(() => {
    if (userMetaMaskToken && prices && !priceLoading) {
      let level = 1;
      if (selectedApe) {
        level = selectedApe.level;
      }
      const levelUpPrice = prices?.["roboLevelupPrice"]?.[level]
        ? prices?.["roboLevelupPrice"]?.[level]
        : prices?.[priceOrder["roboLevelupPrice"]]?.[level];
      setPrice(levelUpPrice);
    }
  }, [prices, userMetaMaskToken, priceLoading, selectedApe]);

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
    if (selectedApe) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [selectedApe]);

  const handleSaveApe = (ape) => {
    setSelectedApe(ape);
  };

  const handleOpenApeModal = () => {
    setIsApeModalOpen(true);
  };

  const handleCloseApeModal = () => {
    setIsApeModalOpen(false);
  };

  const getLevel = (type) => {
    if (selectedApe) {
      let lvl = 0;
      if (type === "up") {
        if (selectedApe && selectedApe.level !== undefined) {
          lvl = +selectedApe.level + 1;
        }
      } else if (type === "down") {
        if (selectedApe && selectedApe.level !== undefined) {
          return +selectedApe.level;
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

  const renderRoboOoga = () => {
    if (selectedApe) {
      return (
        <ApeBox>
          <Ape currentLvl={selectedApe.level} onClick={handleOpenApeModal}>
            {renderRoboOogaImage(selectedApe)}
          </Ape>
          <Name>Robo Ooga #{selectedApe.id}</Name>
        </ApeBox>
      );
    } else {
      return (
        <ApeBox>
          <Ape currentLvl={""} onClick={handleOpenApeModal}>
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
    } else if (selectedApe) {
      disabled = false;
    } else {
      disabled = true;
    }
    return disabled;
  };

  const handleCloseResultsModal = async () => {
    setIsResultsModalOpen(false);
    await getFreshData();
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
    setSelectedApe(null);
    getFreshData();
    setActionLoading(false);
    setIsResultsModalOpen(true);
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
          setLoading(false);
          message.error(SOMETHING_WENT_WRONG);
        });
    } catch (error) {
      console.log(error);
      message.error(SOMETHING_WENT_WRONG);
    }
    setIsApprovedBtnDisabled(false);
  };

  const handleClickButton = async () => {
    if (!isMintSale) {
      if (DMTBalanceBigNumber.gt(price)) {
        if (selectedApe) {
          setIsDisabled(true);
          try {
            let tsx = await contract.levelUpRoboOooga(selectedApe.id);
            setActionLoading(true);
            tsx
              .wait()
              .then(async (receipt) => {
                getUpgradeEvent(receipt);
                getDmtBalance();
              })
              .catch((error) => {
                console.log(error);
                message.error(SOMETHING_WENT_WRONG);
                setActionLoading(false);
              });
          } catch (error) {
            console.log(error);
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
            <h4>Infuse Robo Oogas with $DMT</h4>
            <h6>
              Level-up Robo Oogas using $DMT to make them produce more $OG and
              gain other features. You don't need to unstake Robo Oogas to
              upgrade them! Every Robo Ooga starts as a Garbage Compactor (Lvl
              1) and can get upgraded to become an Executive Bot (Lvl 4).
            </h6>
          </TitleBox>
          <LeftSide>
            {selectedApe && (
              <>
                <LevelBox level={getLevel("down")} />
                <h6>Current Level:</h6>
                <LevelList>{getLevelText(getLevel("down"))}</LevelList>
              </>
            )}
          </LeftSide>
          <Middle>
            {renderRoboOoga()}
            <ButtonBox>
              {isApproved ? (
                <button
                  disabled={getIfItsDisabled()}
                  onClick={handleClickButton}>
                  Upgrade Robo Ooga!
                </button>
              ) : (
                <button
                  disabled={isApprovedBtnDisabled}
                  onClick={handleClickApproveDMT}>
                  Approve $DMT Transaction
                </button>
              )}
            </ButtonBox>
            <HelperText>
              Each Level-Up costs {convertBigNumberToPrice(price)} $DMT. You can
              convert $OG to $DMT here:
              <a
                href="https://opensea.io/collection/oogaverse"
                target="_blank"
                rel="noreferrer">
                SushiSwap
              </a>
            </HelperText>
          </Middle>
          <RightSide>
            {selectedApe && (
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
          text={ACTION_LOADING_UPGRADE}
          tsxNumber={1}
          tsxTotalNumber={1}
        />
      )}
    </Wrapper>
  );
};

export default withConnect(Upgrade, "/game/upgrade");
