import { useEffect, useContext, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import * as Sentry from "@sentry/react";
// ******** Components ********
import ScrollToTop from "./components/ScrollToTop";
import { notification } from "antd";
// ******** Hooks ********
import useGameStatus from "./hooks/Information/useGameStatus";
// ******** Pages ********
import Landing from "./pages/Landing/Landing";
import Maintenance from "./pages/Maintenance/Maintenance";
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
import WhitepaperOnePointFive from "./pages/Whitepaper_1.5/Whitepaper_1.5";
// ******** Stores ********
import { UserContext } from "./store/user-context";
// ******** Services ********
import metamask from "./services/metamask";

const DEVTOOLS = process.env.REACT_APP_DEVTOOLS;
const CHAIN_ID = process.env.REACT_APP_CHAIN_ID;
const CHAIN_NAME = process.env.REACT_APP_CHAIN_NAME;

const App = () => {
  const { saveUserMetaMaskToken, userMetaMaskToken } = useContext(UserContext);
  const { data: gameStatus } = useGameStatus(userMetaMaskToken);
  const [isGameActive, setIsGameActive] = useState(true);

  useEffect(() => {
    if (gameStatus !== null && gameStatus !== undefined) {
      setIsGameActive(gameStatus);
    }
  }, [gameStatus]);

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
        {isGameActive && <Route path="/" element={<Landing />} />}
        {/* <Route path="/terms" element={<TermsOfUse />} /> */}
        {isGameActive && <Route path="/whitepaper" element={<Whitepaper />} />}
        {isGameActive && (
          <Route path="/whitepaper-1-5" element={<WhitepaperOnePointFive />} />
        )}
        {/* {isMintSale && <Route path="/minting" element={<Minting />} />} */}
        {isGameActive && (
          <Route path="/game/gifted" element={<OogaAttacked />} />
        )}
        {isGameActive && <Route path="/game/factory" element={<Factory />} />}
        {isGameActive && (
          <Route path="/game/statistics" element={<Statistics />} />
        )}
        {isGameActive && <Route path="/game/crafting" element={<Crafting />} />}
        {isGameActive && <Route path="/game/merging" element={<Merging />} />}
        {isGameActive && <Route path="/game/evolve" element={<Evolve />} />}
        {isGameActive && <Route path="/game/upgrade" element={<Upgrade />} />}
        {isGameActive && (
          <Route path="/game" element={<Navigate to="/game/factory" />} />
        )}
        {isGameActive && <Route path="*" element={<Navigate to="/" />} />}
        {!isGameActive && <Route path="/maintenance" element={<Maintenance />} />}
        {!isGameActive && (
          <Route path="*" element={<Navigate to="/maintenance" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
