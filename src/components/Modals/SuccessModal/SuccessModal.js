import PropTypes from "prop-types";
// ******** Image ********
import LoadingImage from "../../../assets/landing-image.png";
// ******** Styles ********
import { ModalWrapper, Text, Animation, Title } from "./SuccessModal.styles";

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
        <Animation>
          <img src={LoadingImage} alt="animation" />
        </Animation>
        <Text>{text}</Text>
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
