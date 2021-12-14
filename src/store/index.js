// ******** Providers ********
import UserContextProvider from './user-context';
// ******** Components ********
import { combineComponents } from './combineProviders';

const providers = [
  UserContextProvider,
];

const AppContextProvider = combineComponents(...providers);

export default AppContextProvider;
