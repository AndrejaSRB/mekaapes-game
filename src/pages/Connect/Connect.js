import { useEffect, useContext } from "react";
import { useWallet } from "use-wallet";
import { useNavigate } from "react-router-dom";
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
  const { saveUserMetaMaskToken, userMetaMaskToken } = useContext(UserContext);

  useEffect(() => {
    if (wallet && wallet.account) {
      saveUserMetaMaskToken(wallet.account);
      localStorage.setItem("mekaape_useraddress", wallet.account);
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
      {!userMetaMaskToken ? (
        <Content>
          <Title>
            Let's <span>Connect</span>
          </Title>
          <Subtitle>You need to connect your wallet.</Subtitle>
          <Button onClick={handleClickMetamask}>Connect Wallet</Button>
        </Content>
      ) : (
        <Title>You are already conected!</Title>
      )}
      <Footer page="connect" />
    </Wrapper>
  );
};

export default Connect;

Connect.propTypes = {
  page: PropTypes.string.isRequired,
};
