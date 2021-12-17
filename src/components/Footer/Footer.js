// ******** Components ********
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTop from "react-scroll-to-top";
// ******** Icons ********
import {
  faDiscord,
  faMedium,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
// ******** Styled ********
import { FooterWrapper, Logo, Button, SocialWrapper } from "./Footer.styles";

const Footer = ({ page }) => {
  return (
    <FooterWrapper page={page}>
      <div className="content">
        <Logo>MegaApes</Logo>
        <SocialWrapper>
          <Button
            href="http://discord.gg/oogaverse"
            target="_blank"
            rel="noreferrer">
            <FontAwesomeIcon icon={faDiscord} />
            Discord
          </Button>
          <Button
            href="https://medium.com/@OogaVerse"
            target="_blank"
            rel="noreferrer">
            <FontAwesomeIcon icon={faMedium} />
            Medium
          </Button>
          <Button
            href="https://opensea.io/collection/oogaverse"
            target="_blank"
            rel="noreferrer">
            <span />
            OpenSea
          </Button>
          <Button
            href="https://twitter.com/oogaverse"
            target="_blank"
            rel="noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
            Twitter
          </Button>
        </SocialWrapper>
      </div>
      <ScrollToTop smooth className="scroll-to-top" top={100} />
    </FooterWrapper>
  );
};

export default Footer;
