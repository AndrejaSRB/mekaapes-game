import { useEffect, useContext } from "react";
import { useWallet } from "use-wallet";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// ******** Pages ********
import Landing from "./pages/Landing/Landing";
import Minting from "./pages/Minting/Minting";
import Game from "./pages/Game/Game";
// ******** components ********
import Header from "./components/Header/Header";
// ******** Stores ********
import { UserContext } from "./store/user-context";
// ******** Services ********
import metamask from "./services/metamask";
// ******** Styles ********
import "./styles/main.scss";

const App = () => {
  const { saveUserMetaMaskToken } = useContext(UserContext);
  const wallet = useWallet();

  useEffect(() => {
    const checkOnLoadMetamaskConnection = async () => {
      await metamask.isMetaMaskConnected().then((connected) => {
        if (connected) {
          const address = localStorage.getItem("mekaape_useraddress");
          if (address) {
            wallet.connect();
            saveUserMetaMaskToken(address);
          }
        } else {
          localStorage.removeItem("mekaape_useraddress");
        }
      });
    };
    checkOnLoadMetamaskConnection();
    metamask.checkMetamaskConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveUserMetaMaskToken]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/minting" element={<Minting />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
