import { useEffect, useContext } from "react";
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
import { MintedContext } from "./store/minted-context";
// ******** Services ********
import metamask from "./services/metamask";

const App = () => {
  const { saveUserMetaMaskToken, userMetaMaskToken } = useContext(UserContext);
  const { getDmtBalance, getOogearBalance } = useContext(BalanceContext);
  const { getTotalMinted } = useContext(MintedContext);

  useEffect(() => {
    document.addEventListener("touchstart", function () {}, false);
    return () => {
      document.removeEventListener("touchstart", function () {}, false);
    };
  }, []);

  useEffect(() => {
    metamask.checkMetamaskConnection();
    if (userMetaMaskToken) {
      getDmtBalance();
      getOogearBalance();
    }
  }, [userMetaMaskToken, getDmtBalance, getOogearBalance]);

  useEffect(() => {
    let userAddress = localStorage.getItem("mekaape_useraddress");
    if (userAddress) {
      saveUserMetaMaskToken(userAddress);
    }
  }, [saveUserMetaMaskToken]);

  // Get total minted number
  useEffect(() => {
    getTotalMinted();
  }, [getTotalMinted]);

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
