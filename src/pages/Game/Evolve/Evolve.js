import { useState } from "react";
// ******** Components ********
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
// ******** HOC ********
import withConnect from "../../../hoc/withConnect";
// ******** Images ********
import PlaceholderApe from "../../../assets/placeholder_ape.png";
import MekaApeExample from "../../../assets/meka-ape-landing.png";
import RoboOogaExample from "../../../assets/landing-image.png";
// ******** Styles ********
import {
  Wrapper,
  Title,
  Content,
  MainBox,
  TitleBox,
  ButtonBox,
  HelperText,
  ApesBox,
  Ape,
  ApeImage,
  SubtitleBox,
  CustomCheckbox,
} from "./Evolve.styles";

const Evolve = () => {
  const [selectAll, setSelectAll] = useState(false);

  const hadnleChangeCheckbox = (e) => {
    setSelectAll(e.target.checked);
  };

  return (
    <Wrapper>
      <Header page="game" />
      <Content>
        <Title>
          Evolve Your <span>Baby Oogas</span>
        </Title>
        <MainBox>
          <TitleBox>
            <h4>Evolve Baby Oogas</h4>
          </TitleBox>
          <SubtitleBox>
            <p>Guarding the Factory:</p>
            <CustomCheckbox onChange={hadnleChangeCheckbox} checked={selectAll}>
              Select All:
            </CustomCheckbox>
          </SubtitleBox>
          <ApesBox length={16}>
            <Ape>
              <ApeImage active src={MekaApeExample} alt="ape" />
            </Ape>
            <Ape>
              <ApeImage active src={RoboOogaExample} alt="ape" />
            </Ape>
            <Ape>
              <ApeImage active selected src={MekaApeExample} alt="ape" />
            </Ape>
            <Ape>
              <ApeImage active src={RoboOogaExample} alt="ape" />
            </Ape>
            <Ape>
              <ApeImage active src={MekaApeExample} alt="ape" />
            </Ape>
            <Ape>
              <ApeImage active src={RoboOogaExample} alt="ape" />
            </Ape>
            <Ape>
              <ApeImage active src={MekaApeExample} alt="ape" />
            </Ape>
            <Ape>
              <ApeImage active src={RoboOogaExample} alt="ape" />
            </Ape>
            <Ape>
              <ApeImage active src={MekaApeExample} alt="ape" />
            </Ape>
            <Ape>
              <ApeImage active src={RoboOogaExample} alt="ape" />
            </Ape>
            <Ape>
              <ApeImage active src={MekaApeExample} alt="ape" />
            </Ape>
            <Ape>
              <ApeImage active src={RoboOogaExample} alt="ape" />
            </Ape>
            <Ape>
              <ApeImage active src={MekaApeExample} alt="ape" />
            </Ape>
            <Ape>
              <ApeImage active src={RoboOogaExample} alt="ape" />
            </Ape>
            <Ape>
              <ApeImage active src={PlaceholderApe} alt="ape" />
            </Ape>
            <Ape>
              <ApeImage active src={PlaceholderApe} alt="ape" />
            </Ape>
            <Ape>
              <ApeImage active src={PlaceholderApe} alt="ape" />
            </Ape>
            <Ape>
              <ApeImage active src={PlaceholderApe} alt="ape" />
            </Ape>
          </ApesBox>
          <ButtonBox>
            <button>Evolve</button>
          </ButtonBox>
          <HelperText>
            Every Baby Ooga can claim one MekaApe (Only one!)
          </HelperText>
        </MainBox>
      </Content>
      <Footer page="game" />
    </Wrapper>
  );
};

export default withConnect(Evolve, "/game/evolve");
