import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
// ******** Components ********
import { message } from "antd";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// ******** Stores ********
import { UserContext } from "../../store/user-context";
// ******** Styled ********
import { Title, Subtitle, Wrapper, Button, Content, FooterApp } from "./Connect.styles";
import metamask from "../../services/metamask";
// ******** Text ********
import { METAMASK_ERROR } from "../../messages";

const Connect = ({ page }) => {
  const navigate = useNavigate();
  const { saveUserMetaMaskToken } = useContext(UserContext);
  const token = localStorage.getItem("mekaape_useraddress");

  const handleClickMetamask = async () => {
    if (window?.ethereum) {
      let address = await metamask.getUserAddress();
      if (address) {
        localStorage.setItem("mekaape_useraddress", address);
        saveUserMetaMaskToken(address);
      }
      if (page) {
        navigate(page);
      }
    } else {
      message.error(METAMASK_ERROR);
    }
  };

  return (
    // <Wrapper>
    //   <Header page="landing" />
    //   {!token ? (
    //     <Content>
    //       <Title>{/* Let's <span>Connect</span> */}</Title>
    //       <Subtitle>You need to connect your wallet.</Subtitle>
    //       <Button onClick={handleClickMetamask}>Connect Wallet</Button>
    //     </Content>
    //   ) : (
    //     <Content>
    //       <Title>
    //         Welcome, you are <span>conected!</span>
    //       </Title>
    //       <Subtitle>You can switch the page.</Subtitle>
    //     </Content>
    //   )}
    //   <Footer page="connect" />
    // </Wrapper>
    <Wrapper>
      <Header page="landing" />
      {!token ? (
        <Content>
          <Subtitle>You need to connect your wallet.</Subtitle>
          <Button onClick={handleClickMetamask}>Connect Wallet</Button>
        </Content>
      ) : (
        <Content>
          <Title>
            Welcome, you are <span>conected!</span>
          </Title>
          <Subtitle>You can switch the page.</Subtitle>
        </Content>
      )}
      <FooterApp>
        <Footer page="connect" />
      </FooterApp>
    </Wrapper>
  );
};

export default Connect;

Connect.propTypes = {
  page: PropTypes.string.isRequired,
};
