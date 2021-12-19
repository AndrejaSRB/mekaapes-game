import React from "react";
import ReactDOM from "react-dom";
import { UseWalletProvider } from "use-wallet";
import { QueryClient, QueryClientProvider } from "react-query";
// ******** Components ********
import App from "./App";
// ******** Stores ********
import AppContextProvider from "./store/index";
// ******** Styles ********
import "antd/dist/antd.css";
import "./index.css";

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID;

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <UseWalletProvider
      chainId={CHAIN_ID}
      connectors={{
        injected: {
          chainId: [CHAIN_ID],
        },
        portis: { dAppId: "mekaape-game" },
      }}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </UseWalletProvider>
  </QueryClientProvider>,
  document.getElementById("root")
);
