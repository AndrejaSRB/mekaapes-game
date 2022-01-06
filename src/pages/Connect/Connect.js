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
import { Title, Subtitle, Wrapper, Button, Content } from "./Connect.styles";
import metamask from "../../services/metamask";

//TODO: Check connect page on laptop, footer is weird
// Think maybe you can get the current height of the page and do something?
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
      message.error("Metamask wallet not found. Please install it.");
    }
  };

  return (
    <Wrapper>
      <Header page="landing" />
      {!token ? (
        <Content>
          <Title>{/* Let's <span>Connect</span> */}</Title>
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
