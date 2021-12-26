import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "use-wallet";
import PropTypes from "prop-types";
// ******** Components ********
import { message } from "antd";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// ******** Stores ********
import { UserContext } from "../../store/user-context";
// ******** Styled ********
import { Title, Subtitle, Wrapper, Button, Content } from "./Connect.styles";

const Connect = ({ page }) => {
  const wallet = useWallet();
  const navigate = useNavigate();
  const { saveUserMetaMaskToken } = useContext(UserContext);
  const token = localStorage.getItem("mekaape_useraddress");

  useEffect(() => {
    if (wallet && wallet.account) {
      localStorage.setItem("mekaape_useraddress", wallet.account);
      saveUserMetaMaskToken(wallet.account);
    }
  }, [wallet, saveUserMetaMaskToken]);

  const handleClickMetamask = async () => {
    if (window?.ethereum) {
        wallet.connect();
      if (page) {
        navigate(page);
      }
    } else {
      message.error("Metamask wallet not found. Please install it.");
    }
  };

  return (
    <Wrapper>
      <Header page="landing" />
      {!token ? (
        <Content>
          <Title>
            Let's <span>Connect</span>
          </Title>
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
      <Footer page="connect" />
    </Wrapper>
  );
};

export default Connect;

Connect.propTypes = {
  page: PropTypes.string.isRequired,
};
