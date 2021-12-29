// ******** components ********
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
// ******** Images ********
import HeroGameImage from "../../assets/landing-image.png";
import MekaApeImage from "../../assets/meka-ape-landing.png";
import CoinImage from "../../assets/coin-landing.png";
// ******** Styled ********
import {
  Wrapper,
  Title,
  ButtonWrapper,
  Content,
  MainBox,
  IntroText,
  BottomContent,
  HeroImage,
  Text,
  BoxesWrapper,
  Box,
} from "./Landing.styles";

const Landing = () => {

  return (
    <Wrapper>
      <Header page="landing" />
      <Content>
        <Title>
          MEKAAPES GAME: <span>GENESIS</span>
        </Title>
        <MainBox>
          <h4 className="desktop">Welcome!</h4>
          <IntroText>
            <div>
              <p>The danger of attack is imminent.</p>
              <p>
                Factory needs to be protected. <span>Build your team.</span>
              </p>
            </div>
            <div>
              <p>
                Recruit unique Robo Apes and <span>Apes to the fight.</span>
              </p>
              <p>
                Earn $OG or $DMT as your <span>champions battle!</span>
              </p>
            </div>
          </IntroText>
          <BottomContent>
            <HeroImage>
              <img src={HeroGameImage} alt="mekaape hero" />
            </HeroImage>
            <Text>Use $OG or $DMT exclusively to add to your force.</Text>
            <ButtonWrapper>
              <Link to="/minting">Minting</Link>
              <Link to="/game/factory">Play</Link>
            </ButtonWrapper>
          </BottomContent>
          <h4 className="mobile">Welcome!</h4>
        </MainBox>
        <BoxesWrapper>
          <Box>
            <h5>Robo Ooga</h5>
            <img src={HeroGameImage} alt="Robo Oogas" />
            <p>
              Robo Oogas that work in the Factory produce $OG.<span>Join the guild and earn $DMT!</span>
            </p>
          </Box>
          <Box>
            <h5>MekaApes</h5>
            <img src={MekaApeImage} alt="Robo Oogas" />
            <p>
              Guard the Factory! <span>Join the guild and earn $DMT!</span>
            </p>
          </Box>
          <Box>
            <h5>$OG</h5>
            <img src={CoinImage} alt="Robo Oogas" />
            <p>
              The ony Appes currency. $OG is the ONLY way to mint new guards
              for your factory.
            </p>
          </Box>
          <Box>
            <h5>$DMT</h5>
            <img src={CoinImage} alt="Robo Oogas" />
            <p>
              The ony Appes currency. $OG is the ONLY way to mint new guards
              for your factory.
            </p>
          </Box>
        </BoxesWrapper>
      </Content>
      <Footer page="landing" />
    </Wrapper>
  );
};

export default Landing;
