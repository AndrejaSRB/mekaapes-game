import { useContext } from "react";
import { useWallet } from "use-wallet";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
// ******** Stores ********
import { UserContext } from "../../../store/user-context";
// ******** Styles ********
import {
  ModalWrapper,
  DisconnectBtn,
  CancelBtn,
  WalletId,
  Text,
} from "./Disconnect.styles";

const Disconnect = ({ open, handleCloseModal, reduceAddress }) => {
  const { userMetaMaskToken, deleteUserMetaMaskToken } =
    useContext(UserContext);
  const navigate = useNavigate();
  const wallet = useWallet();

  const handleClick = () => {
    wallet.reset();
    deleteUserMetaMaskToken();
    navigate("/");
    handleCloseModal();
  };

  return (
    <ModalWrapper
      visible={open}
      onCancel={handleCloseModal}
      centered
      width={744}
      maskClosable={false}>
      <div className="content">
        <WalletId>
          {reduceAddress(wallet.account ? wallet.account : userMetaMaskToken)}
        </WalletId>
        <Text>Disconnect from metamask.</Text>
        <DisconnectBtn onClick={handleClick}>Disconnect</DisconnectBtn>
        <CancelBtn onClick={handleCloseModal}>Cancel</CancelBtn>
      </div>
    </ModalWrapper>
  );
};

export default Disconnect;

Disconnect.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  reduceAddress: PropTypes.func.isRequired,
};
