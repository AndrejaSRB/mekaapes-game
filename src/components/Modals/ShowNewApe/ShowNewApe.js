import PropTypes from "prop-types";
// ******** Image ********
import LoadingImage from "../../../assets/landing-image.png";
// ******** Styles ********
import { ModalWrapper, Text, Animation, Title } from "./ShowNewApe.styles";

const ShowNewApe = ({ open }) => {
  return (
    <ModalWrapper visible={open} centered width={744} maskClosable={false}>
      <div className="content">
        <Title>And here’s what heppend...</Title>
        <Animation>
          <img src={LoadingImage} alt="animation" />
        </Animation>
        <Text>And it arrived safely in the factory</Text>
      </div>
    </ModalWrapper>
  );
};

export default ShowNewApe;

ShowNewApe.propTypes = {
  open: PropTypes.bool.isRequired,
};
