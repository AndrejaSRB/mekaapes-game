import React from "react";
import ReactDOM from "react-dom";
import { UseWalletProvider } from "use-wallet";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "react-query";
// ******** Components ********
import App from "./App";
// ******** Stores ********
import AppContextProvider from "./store/index";
// ******** Styles ********
import "antd/dist/antd.css";
import "./index.css";

const GRAPHQL_SERVER = process.env.REACT_APP_GRAPHQL_SERVER;

const queryClient = new QueryClient();

const client = new ApolloClient({
  uri: GRAPHQL_SERVER,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client} connectToDevTools={true}>
    <UseWalletProvider
      connectors={{
        portis: { dAppId: "mekaape-game" },
      }}>
      <AppContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AppContextProvider>
    </UseWalletProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
