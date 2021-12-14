import { useContext } from "react";
import PropTypes from "prop-types";
// ******** Pages ********
import Connect from "../pages/Connect/Connect";
// ******** Stores ********
import { UserContext } from "../store/user-context";

const withConnect = (Component, page) => (props) => {
  const { userMetaMaskToken } = useContext(UserContext);
  return (
    <>
      {userMetaMaskToken ? <Component {...props} /> : <Connect page={page} />}
    </>
  );
};

export default withConnect;

withConnect.propTypes = {
  elementType: PropTypes.elementType.isRequired,
  page: PropTypes.string.isRequired,
};
