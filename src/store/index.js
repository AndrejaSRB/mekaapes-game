// ******** Providers ********
import UserContextProvider from "./user-context";
import BalanceContextProvider from "./balance-context";
import ClaimContextProvider from "./claim-context";
import MintedContextProvider from "./minted-context";
// ******** Components ********
import { combineComponents } from "./combineProviders";

const providers = [
  UserContextProvider,
  BalanceContextProvider,
  ClaimContextProvider,
  MintedContextProvider,
];

const AppContextProvider = combineComponents(...providers);

export default AppContextProvider;
