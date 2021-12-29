import { useState } from "react";
// ******** Components ********
import { Tooltip } from "antd";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import LevelRoboOogas from "../../../components/Modals/LevelRoboOogas/LevelRoboOogas";
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
  TooltipList,
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

const tooltipText = (
  <TooltipList>
    <li>Infuse Robo Oogas with $DMT to level up.</li>
    <li>
      The Robo Oogas get a trait named “DMT” with the value “Level 1, Level 2,
      Level 3”{" "}
    </li>
    <li>
      {" "}
      DMT level 1 -{">"} Earn 25% more $OG + Decrease the risk of OOGEAR
      getting stolen to 25% when unstaking
    </li>
    <li>
      DMT level 2 -{">"} Earn 50% more $OG + Decrease the unstaking time by
      25%
    </li>
    <li>DMT level 3 -{">"} Earn 100% more $OG</li>
    <li>Price for each level is 100 $DMT</li>
  </TooltipList>
);

// TODO
// Disable buttons if the user has less than 100 $DMT
// Connect with the contract

const Upgrade = () => {
  const [isApeModalOpen, setIsApeModalOpen] = useState(false);
  const [selectedApe, setSelectedApe] = useState(null);

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

  return (
    <Wrapper>
      <Header page="game" />
      <Content>
        <Title>
          Upgrade your <span>Robo Ooga</span>
        </Title>
        <MainBox>
          <Tooltip placement="top" title={tooltipText} color="white">
            <InfoIcon>
              <InfoOutlined />
            </InfoIcon>
          </Tooltip>
          <TitleBox>
            <h4>Robo Ooga Leveling</h4>
            <h6>Levelin Up your Robo Oogas get stronger.</h6>
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
              <button disabled={!Boolean(selectedApe)}>
                Level Up Robo Oogas
              </button>
            </ButtonBox>
            <HelperText>Spend 100 $DMT to level up your Robo Oogas</HelperText>
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
    </Wrapper>
  );
};

export default withConnect(Upgrade, "/game/upgrade");
