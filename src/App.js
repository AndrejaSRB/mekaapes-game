import { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import * as Sentry from "@sentry/react";
// ******** Components ********
import ScrollToTop from "./components/ScrollToTop";
import { notification } from "antd";
// ******** Pages ********
import Landing from "./pages/Landing/Landing";
// import Minting from "./pages/Minting/Minting";
// import TermsOfUse from "./pages/Terms/Terms";
import Whitepaper from "./pages/Whitepaper/Whitepaper";
import Factory from "./pages/Game/Factory/Factory";
import Statistics from "./pages/Game/Statistics/Statistics";
import Crafting from "./pages/Game/Crafting/Crafting";
import Merging from "./pages/Game/Merging/Merging";
import Evolve from "./pages/Game/Evolve/Evolve";
import Upgrade from "./pages/Game/Upgrade/Upgrade";
import OogaAttacked from "./pages/Game/OogaAttacked/OogaAttacked";
import WhitepaperOnePointFive from './pages/Whitepaper_1.5/Whitepaper_1.5';
// ******** Stores ********
import { UserContext } from "./store/user-context";
// ******** Services ********
import metamask from "./services/metamask";

const DEVTOOLS = process.env.REACT_APP_DEVTOOLS;
const CHAIN_ID = process.env.REACT_APP_CHAIN_ID;
const CHAIN_NAME = process.env.REACT_APP_CHAIN_NAME;

const App = () => {
  const { saveUserMetaMaskToken, userMetaMaskToken } = useContext(UserContext);

  useEffect(() => {
    document.addEventListener("touchstart", function () {}, false);
    return () => {
      document.removeEventListener("touchstart", function () {}, false);
    };
  }, []);

  useEffect(() => {
    if (userMetaMaskToken) {
      Sentry.setUser({ email: userMetaMaskToken });
    }
  }, [userMetaMaskToken]);

  useEffect(() => {
    if (userMetaMaskToken) {
      metamask.checkMetamaskConnection();
    }
  }, [userMetaMaskToken]);

  useEffect(() => {
    if (userMetaMaskToken) {
      const getChainId = async () => {
        let network = await metamask.getChainId();
        if (+network?.chainId !== +CHAIN_ID) {
          notification.error({
            message: "EVM Network Problem!",
            description: `Please switch your network to the ${CHAIN_NAME}.`,
            duration: 0,
          });
        }
      };
      getChainId();
    }
  }, [userMetaMaskToken]);

  useEffect(() => {
    let userAddress = localStorage.getItem("mekaape_useraddress");
    if (userAddress) {
      saveUserMetaMaskToken(userAddress);
    }
  }, [saveUserMetaMaskToken]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {DEVTOOLS && <ReactQueryDevtools initialIsOpen={false} />}
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* <Route path="/terms" element={<TermsOfUse />} /> */}
        <Route path="/whitepaper" element={<Whitepaper />} />
        <Route path="/whitepaper-1-5" element={<WhitepaperOnePointFive />} />
        {/* {isMintSale && <Route path="/minting" element={<Minting />} />} */}
        <Route path="/game/gifted" element={<OogaAttacked />} />
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
