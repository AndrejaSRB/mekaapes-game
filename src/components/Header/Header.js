import { useContext } from "react";
import { useWallet } from "use-wallet";
import { useNavigate } from "react-router-dom";
// ******** Stores ********
import { UserContext } from "../../store/user-context";

const Header = () => {
  const { userMetaMaskToken, deleteUserMetaMaskToken } =
    useContext(UserContext);
  const navigate = useNavigate();
  const wallet = useWallet();

  const handleDiscconect = () => {
    wallet.reset();
    deleteUserMetaMaskToken();
    navigate("/");
  };

  const reduceAddress = (address) => {
    let string = address;
    if (address) {
      let userAddress = address;
      let firstSix = userAddress.slice(0, 6);
      let lastFour = userAddress.slice(-4);
      string = `${firstSix}...${lastFour}`;
    }
    return string;
  };

  return (
    <div>
      <div>MekaApe</div>
      <div>
        {wallet.account
          ? reduceAddress(wallet.account)
          : reduceAddress(userMetaMaskToken)}
      </div>
      {userMetaMaskToken && (
        <button onClick={handleDiscconect}>Disconnect</button>
      )}
    </div>
  );
};

export default Header;
