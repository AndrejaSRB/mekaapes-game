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
} from "./Upgrade.styles";

const LevelBox = ({ level }) => (
  <>
    {level > 0 && (
      <LevelBoxWrapper currentLvl={level}>
        <span>lvl</span>
        <p>{level}</p>
      </LevelBoxWrapper>
    )}
  </>
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
      DMT level 1 -{">"} Earn 25% more $OOGEAR + Decrease the risk of OOGEAR
      getting stolen to 25% when unstaking
    </li>
    <li>
      DMT level 2 -{">"} Earn 50% more $OOGEAR + Decrease the unstaking time by
      25%
    </li>
    <li>DMT level 3 -{">"} Earn 100% more $OOGEAR</li>
    <li>Price for each level is 100 $DMT</li>
  </TooltipList>
);

// TODO
// Disable buttons if the user has less than 100 $DMT

const Upgrade = () => {
  const [isApeModalOpen, setIsApeModalOpen] = useState(false);

  const handleOpenApeModal = () => {
    setIsApeModalOpen(true);
  };

  const handleCloseApeModal = () => {
    setIsApeModalOpen(false);
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
            <LevelBox level="2" />
            <h6>Current Level:</h6>
            <LevelList>
              <li>Earn 50% more $OOGEAR</li>
              <li>Decrease the unstaking time by 25%</li>
            </LevelList>
          </LeftSide>
          <Middle>
            <ApeBox>
              <Ape currentLvl={""} onClick={handleOpenApeModal}>
                <img src={PlaceholderApe} alt="ape" />
                <p>
                  Select <span>Robo Ooga</span>
                </p>
              </Ape>
              <Name>Robo Ooga #3123</Name>
            </ApeBox>
            <ButtonBox>
              <button disabled>Level Up Robo Oogas</button>
            </ButtonBox>
            <HelperText>Spend 100 $DMT to level up your Robo Oogas</HelperText>
          </Middle>
          <RightSide>
            <LevelBox level="3" />
            <h6>Next Level:</h6>
            <LevelList>
              <li>Earn 100% more $OOGEAR</li>
              <li>Earn 100% more $OOGEAR</li>
              <li>Earn 100% more $OOGEAR</li>
              <li>Earn 100% more $OOGEAR</li>
            </LevelList>
          </RightSide>
        </MainBox>
      </Content>
      <Footer page="game" />
      {isApeModalOpen && (
        <LevelRoboOogas
          open={isApeModalOpen}
          handleCloseModal={handleCloseApeModal}
        />
      )}
    </Wrapper>
  );
};

export default withConnect(Upgrade, "/game/upgrade");
