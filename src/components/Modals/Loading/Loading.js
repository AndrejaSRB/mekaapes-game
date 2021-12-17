import PropTypes from "prop-types";
// ******** Image ********
import LoadingImage from "../../../assets/landing-image.png";
// ******** Styles ********
import { ModalWrapper, LoadingPicture, Text } from "./Loading.styles";

const Loading = ({ open }) => {
  return (
    <ModalWrapper visible={open} centered width={744} maskClosable={false}>
      <div className="content">
        <LoadingPicture>
          <img src={LoadingImage} alt="Loading" />
        </LoadingPicture>
        <Text>Loading data...</Text>
      </div>
    </ModalWrapper>
  );
};

export default Loading;

Loading.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};
