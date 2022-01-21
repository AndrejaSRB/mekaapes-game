import React from "react";
import ReactDOM from "react-dom";
import { UseWalletProvider } from "use-wallet";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "react-query";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
// ******** Components ********
import App from "./App";
// ******** Stores ********
import AppContextProvider from "./store/index";
// ******** Styles ********
import "antd/dist/antd.css";
import "./index.css";

const GRAPHQL_SERVER = process.env.REACT_APP_GRAPHQL_SERVER;
const SENTRY_DNS = process.env.REACT_APP_SENTRY;

Sentry.init({
  dsn: SENTRY_DNS,
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

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
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </QueryClientProvider>
    </UseWalletProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
