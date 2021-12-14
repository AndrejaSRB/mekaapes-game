import { useEffect, useContext } from "react";
import { useWallet } from "use-wallet";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
// ******** Components ********
import { message } from "antd";
// ******** Stores ********
import { UserContext } from "../../store/user-context";

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
    <div>
      {!userMetaMaskToken && (
        <div>
          Connect:
          <button onClick={handleClickMetamask}>Metmask</button>
        </div>
      )}
    </div>
  );
};

export default Connect;

Connect.propTypes = {
  page: PropTypes.string.isRequired,
};
