// ******** Providers ********
import UserContextProvider from "./user-context";
import BalanceContextProvider from "./balance-context";
import ClaimContextProvider from "./claim-context";
// ******** Components ********
import { combineComponents } from "./combineProviders";

const providers = [UserContextProvider, BalanceContextProvider, ClaimContextProvider];

const AppContextProvider = combineComponents(...providers);

export default AppContextProvider;
