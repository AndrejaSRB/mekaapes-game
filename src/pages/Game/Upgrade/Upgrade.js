import { useState, useContext, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { BigNumber } from "ethers";
// ******** Components ********
import { message } from "antd";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import LevelRoboOogas from "../../../components/Modals/LevelRoboOogas/LevelRoboOogas";
import UpgradeInfo from "../../../components/Modals/UpgradeInfo/UpgradeInfo";
import Loading from "../../../components/Modals/Loading/Loading";
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
// ******** Text ********
import {
  APPROVE_DMT_TRANSACTION,
  DONT_ENOUGH_DMT,
  PRE_SALE_IS_ONGOING,
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
  const { userMetaMaskToken } = useContext(UserContext);
  const { isMintSale } = useContext(MintedContext);
  const { getDmtBalance, DMTBalanceBigNumber } = useContext(BalanceContext);
  const [isApeModalOpen, setIsApeModalOpen] = useState(false);
  const [selectedApe, setSelectedApe] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loader, setLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(true);
  const [isApprovedBtnDisabled, setIsApprovedBtnDisabled] = useState(false);
  const [isOpenUpgradeInfoModal, setIsOpenUpgradeInfoModal] = useState(false);
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
      const levelUpPrice = prices?.["roboLevelupPrice"]?.[0]
        ? prices?.["roboLevelupPrice"]?.[0]
        : prices?.[priceOrder["roboLevelupPrice"]]?.[0];
      setPrice(levelUpPrice);
    }
  }, [prices, userMetaMaskToken, priceLoading]);

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
    if (isApproved) {
      setIsApeModalOpen(true);
    } else {
      message.info(APPROVE_DMT_TRANSACTION);
    }
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
        .catch(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
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
            setLoading(true);
            tsx
              .wait()
              .then(async () => {
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
                getDmtBalance();
                setLoading(false);
                setSelectedApe(null);
              })
              .catch((error) => {
                console.log(error);
                setLoading(false);
              });
          } catch (error) {
            console.log(error);
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
    </Wrapper>
  );
};

export default withConnect(Upgrade, "/game/upgrade");
