import PropTypes from "prop-types";
// // ******** Images ********
// import Image from "../../../assets/factory_animation.gif";
// ******** Styles ********
import {
  ModalWrapper,
  Text,
  Title,
  ButtonWrapper,
  //   Animation,
} from "./SuccessModal.styles";

const SuccessModal = ({ open, title, text, handleClose }) => {

  return (
    <ModalWrapper
      visible={open}
      centered
      width={744}
      maskClosable={false}
      onCancel={handleClose}>
      <div className="content">
        <Title>{title}</Title>
        <Text>{text}</Text>
        <ButtonWrapper>
          <button onClick={handleClose}>Close</button>
        </ButtonWrapper>
      </div>
    </ModalWrapper>
  );
};

export default SuccessModal;

SuccessModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};
