import { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
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
import PlaceholderApe from "../../../assets/placeholder_ape.png";
import MekaApeExample from "../../../assets/meka-ape-landing.png";
import RoboOogaExample from "../../../assets/landing-image.png";
// ******** Functions ********
import { getLevelText } from "./helpers";
// ******** Store ********
import { BalanceContext } from "../../../store/balance-context";
import { UserContext } from "../../../store/user-context";
// ******** Services ********
import contract from "../../../services/contract";
import prices from "../../../services/prices";
// ******** Text ********
import { APPROVE_DMT_TRANSACTION, DONT_ENOUGH_DMT } from '../../../messages';
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
} from "./Upgrade.styles";

const EXAMPLE_DATA = [
  {
    img: RoboOogaExample,
    name: "Ape #2323",
    level: 0,
    id: 1,
  },
  {
    img: MekaApeExample,
    name: "Ape #1121",
    level: 1,
    id: 2,
  },
  {
    img: RoboOogaExample,
    name: "Ape #12",
    level: 1,
    id: 3,
  },
  {
    img: RoboOogaExample,
    name: "Ape #31231",
    level: 2,
    id: 4,
  },
  {
    img: MekaApeExample,
    name: "Ape #9393",
    level: 3,
    id: 5,
  },
  {
    img: RoboOogaExample,
    name: "Ape #1123",
    level: 0,
    id: 6,
  },
  {
    img: MekaApeExample,
    name: "Ape #8828",
    level: 0,
    id: 7,
  },
  {
    img: MekaApeExample,
    name: "Ape #838",
    level: 1,
    id: 8,
  },
  {
    img: RoboOogaExample,
    name: "Ape #1231",
    level: 2,
    id: 9,
  },
  {
    img: MekaApeExample,
    name: "Ape #111",
    level: 2,
    id: 32,
  },
  {
    img: RoboOogaExample,
    name: "Ape #989",
    level: 0,
    id: 73,
  },
  {
    img: MekaApeExample,
    name: "Ape #642",
    level: 3,
    id: 19,
  },
  {
    img: RoboOogaExample,
    name: "Ape #100",
    level: 1,
    id: 770,
  },
];

const LevelBox = ({ level }) => (
  <LevelBoxContainer>
    <LevelBoxWrapper currentLvl={`${level}`}>
      <span>lvl</span>
      <p>{level}</p>
    </LevelBoxWrapper>
  </LevelBoxContainer>
);

const Upgrade = () => {
  const { userMetaMaskToken } = useContext(UserContext);
  const { dmtBalance, getDmtBalance } = useContext(BalanceContext);
  const [isApeModalOpen, setIsApeModalOpen] = useState(false);
  const [selectedApe, setSelectedApe] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(true);
  const [isApprovedBtnDisabled, setIsApprovedBtnDisabled] = useState(false);
  const [isOpenUpgradeInfoModal, setIsOpenUpgradeInfoModal] = useState(false);

  // Check if $DMT transaction is approved
  useEffect(() => {
    if (userMetaMaskToken && price > 0) {
      const checkIfApprovedDMTTransaction = async () => {
        let isApproved = await contract.isDMTtransactionApproved(
          userMetaMaskToken,
          price
        );
        setIsApproved(isApproved);
      };
      checkIfApprovedDMTTransaction();
    }
  }, [userMetaMaskToken, price]);

  // Get the LevelUp $DMT Price
  useEffect(() => {
    const getPriceMintAndStake = async () => {
      let price = await prices.getMintStakePrice();
      setPrice(ethers.utils.formatEther(price));
    };
    getPriceMintAndStake();
  }, []);

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

  const renderRoboOoga = () => {
    if (selectedApe) {
      return (
        <ApeBox>
          <Ape currentLvl={selectedApe.level} onClick={handleOpenApeModal}>
            <img src={selectedApe.img} alt={selectedApe.name} />
          </Ape>
          <Name>{selectedApe.name}</Name>
        </ApeBox>
      );
    } else {
      return (
        <ApeBox>
          <Ape currentLvl={""} onClick={handleOpenApeModal}>
            <img src={PlaceholderApe} alt="ape" />
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
      tsx.wait().then(async () => {
        let isApproved = await contract.isDMTtransactionApproved(
          userMetaMaskToken,
          price
        );
        setIsApproved(isApproved);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
    setIsApprovedBtnDisabled(false);
  };

  const handleClickButton = async () => {
    if (dmtBalance > price) {
      if (selectedApe) {
        setIsDisabled(true);
        try {
          //TODO: fix the hardcoded number with selectedApe.token_id
          let tsx = await contract.levelUpRoboOooga(1219);
          setLoading(true);
          tsx.wait().then(async () => {
            //TODO: get the fresh list of robo oogas
            getDmtBalance();
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
              Each Level-Up costs {price} $DMT. You can convert $OG to $DMT
              here:
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
          list={EXAMPLE_DATA}
          handleSaveApe={handleSaveApe}
          selectedApe={selectedApe}
        />
      )}
      <Loading open={loading} />
      <UpgradeInfo
        open={isOpenUpgradeInfoModal}
        handleClose={() => setIsOpenUpgradeInfoModal(false)}
      />
    </Wrapper>
  );
};

export default withConnect(Upgrade, "/game/upgrade");
