import { useEffect, useContext } from "react";
import { useWallet } from "use-wallet";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// ******** Components ********
import ScrollToTop from "./components/ScrollToTop";
// ******** Pages ********
import Landing from "./pages/Landing/Landing";
import Minting from "./pages/Minting/Minting";
import Factory from "./pages/Game/Factory/Factory";
import Statistics from "./pages/Game/Statistics/Statistics";
import Crafting from "./pages/Game/Crafting/Crafting";
// ******** Pages ********
import { UserContext } from "./store/user-context";
// ******** Services ********
import metamask from "./services/metamask";

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
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/minting" element={<Minting />} />
        <Route path="/game/factory" element={<Factory />} />
        <Route path="/game/statistics" element={<Statistics />} />
        <Route path="/game/crafting" element={<Crafting />} />
        <Route path="/game" element={<Navigate to="/game/factory" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
