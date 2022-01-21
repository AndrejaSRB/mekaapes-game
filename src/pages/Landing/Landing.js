// ******** components ********
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
// ******** Images ********
import HeroLandingAnimation from "../../assets/main_landing_animation.gif";
import RoboOogaImage from "../../assets/robo-ooga-landing.png";
import MekaApeImage from "../../assets/mekaape_landing.png";
import OGToken from "../../assets/og_token.png";
import DMTToken from "../../assets/dmt_token.gif";
import Logo from "../../assets/logo.svg";
// ******** Styled ********
import {
  Wrapper,
  LogoImage,
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
        <LogoImage>
          <img src={Logo} alt="Meka Apes" />
        </LogoImage>
        <MainBox>
          <h4 className="desktop">Welcome!</h4>
          <IntroText>
            <div>
              <p>
                With MekaApes Game, OogaVerse introduces exciting new game
                mechanics such as evolution, fusion and a unique levelling-up
                system.
              </p>
            </div>
            <div>
              <p>
                The interconnection with the expansive{" "}
                <a
                  href="https://opensea.io/collection/oogaverse"
                  target="_blank"
                  rel="noreferrer">
                  OogaVerse collection
                </a>
                , makes MekaApes the most in depth strategy game available on
                the Ethereum blockchain.
              </p>
            </div>
          </IntroText>
          <BottomContent>
            <HeroImage>
              <img src={HeroLandingAnimation} alt="mekaape hero" />
            </HeroImage>
            <Text>
              Stake Robo Oogas and MekaApes in the factory to earn $OG. Upgrade
              Robo Oogas or merge two MekaApes to unlock extra utility!
            </Text>
            <ButtonWrapper>
              <Link to="/minting">Minting</Link>
              <Link to="/game/factory">Enter the Game</Link>
            </ButtonWrapper>
          </BottomContent>
          <h4 className="mobile">Welcome!</h4>
        </MainBox>
        <BoxesWrapper>
          <Box>
            <h5>Robo Ooga</h5>
            <img src={RoboOogaImage} alt="Robo Oogas" />
            <p>
              Robo Oogas produce $OG when they are staked in the factory. There
              are 4 levels - Use $DMT to level up Robo Oogas and make them more
              productive.
            </p>
          </Box>
          <Box>
            <h5>MekaApes</h5>
            <img src={MekaApeImage} alt="Robo Oogas" />
            <p>
              MekaApes protect the factory and receive a 23% tax of all $OG
              that's produced. Merge 2 MekaApes to receive a Mega Meka. Mega
              Mekas have the ability to receive Robo Oogas as a tribute.
            </p>
          </Box>
          <Box>
            <h5>$OG</h5>
            <img src={OGToken} alt="Robo Oogas" />
            <p className="width">
              In the Factory, Robo Oogas convert scrap metal into $OG which is
              used to craft new Robo Oogas and MekaApes.
            </p>
          </Box>
          <Box>
            <h5>$DMT</h5>
            <img src={DMTToken} alt="Robo Oogas" />
            <p>
              With $DMT you can mint and level-up Robo Oogas. $DMT is only
              produced by holding a Genesis Ooga from the{" "}
              <a
                href="https://opensea.io/collection/oogaverse"
                target="_blank"
                rel="noreferrer">
                OogaVerse collection
              </a>
              .
            </p>
          </Box>
        </BoxesWrapper>
      </Content>
      <Footer page="landing" />
    </Wrapper>
  );
};

export default Landing;
