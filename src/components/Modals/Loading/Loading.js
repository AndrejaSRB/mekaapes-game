import PropTypes from "prop-types";
// ******** Image ********
import LoadingImage from "../../../assets/loading-animation.gif";
// ******** Styles ********
import { ModalWrapper, LoadingPicture, Text, Dot } from "./Loading.styles";

const Loading = ({ open }) => {
  return (
    <ModalWrapper visible={open} centered width={744} maskClosable={false}>
      <div className="content">
        <LoadingPicture>
          <img src={LoadingImage} alt="Loading" />
        </LoadingPicture>
        <Text>
          Loading data
          <Dot>.</Dot>
          <Dot>.</Dot>
          <Dot>.</Dot>
        </Text>
      </div>
    </ModalWrapper>
  );
};

export default Loading;

Loading.propTypes = {
  open: PropTypes.bool.isRequired,
};
