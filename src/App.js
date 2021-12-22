import { useEffect, useContext } from "react";
import { useWallet } from "use-wallet";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// ******** Components ********
import ScrollToTop from "./components/ScrollToTop";
// ******** Pages ********
import Landing from "./pages/Landing/Landing";
import Minting from "./pages/Minting/Minting";
import TermsOfUse from "./pages/Terms/Terms";
import Whitepaper from "./pages/Whitepaper/Whitepaper";
import Factory from "./pages/Game/Factory/Factory";
import Statistics from "./pages/Game/Statistics/Statistics";
import Crafting from "./pages/Game/Crafting/Crafting";
import Merging from "./pages/Game/Merging/Merging";
import Evolve from "./pages/Game/Evolve/Evolve";
import Upgrade from "./pages/Game/Upgrade/Upgrade";
// ******** Stores ********
import { UserContext } from "./store/user-context";
import { BalanceContext } from "./store/balance-context";
// ******** Services ********
import metamask from "./services/metamask";

// TODO
// Get DMT and OOGEAR balance and set
// use useeffect and check if the user is connected first

const App = () => {
  const { saveUserMetaMaskToken } = useContext(UserContext);
  const { getDmtBalance } = useContext(BalanceContext);
  const wallet = useWallet();

  useEffect(() => {
    getDmtBalance();
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
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/whitepaper" element={<Whitepaper />} />
        <Route path="/minting" element={<Minting />} />
        <Route path="/game/factory" element={<Factory />} />
        <Route path="/game/statistics" element={<Statistics />} />
        <Route path="/game/crafting" element={<Crafting />} />
        <Route path="/game/merging" element={<Merging />} />
        <Route path="/game/evolve" element={<Evolve />} />
        <Route path="/game/upgrade" element={<Upgrade />} />
        <Route path="/game" element={<Navigate to="/game/factory" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
