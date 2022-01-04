import React from "react";
import ReactDOM from "react-dom";
import { UseWalletProvider } from "use-wallet";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// ******** Components ********
import App from "./App";
// ******** Stores ********
import AppContextProvider from "./store/index";
// ******** Styles ********
import "antd/dist/antd.css";
import "./index.css";

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID;
const GRAPHQL_SERVER = process.env.REACT_APP_GRAPHQL_SERVER;

const client = new ApolloClient({
  uri: GRAPHQL_SERVER,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client} connectToDevTools={true}>
    <UseWalletProvider
      chainId={CHAIN_ID}
      connectors={{
        portis: { dAppId: "mekaape-game" },
      }}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </UseWalletProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
