import PropTypes from "prop-types";
// ******** Images ********
import MekaApeExample from "../../../assets/meka-ape-landing.png";
import RoboOogaExample from "../../../assets/landing-image.png";
// ******** Styles ********
import {
  ModalWrapper,
  Title,
  Subtitle,
  MekaApesBox,
  Text,
  Button,
  CancelBtn,
  ButtonWrapper,
  Ape,
  ApeImage,
} from "./MergeMekaApes.styles";

const MergeMekaApes = ({ open, handleCloseModal }) => {
  return (
    <ModalWrapper
      visible={open}
      onCancel={handleCloseModal}
      centered
      width={744}
      maskClosable={false}>
      <div className="content">
        <Title>MekaApes</Title>
        <Subtitle>Choose your MekaApes to merge it with another one.</Subtitle>
        <MekaApesBox>
          <Ape>
            <ApeImage active src={MekaApeExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active selected src={RoboOogaExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active src={MekaApeExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active src={RoboOogaExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active src={MekaApeExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active src={RoboOogaExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active src={MekaApeExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active src={RoboOogaExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active src={MekaApeExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active src={MekaApeExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active src={MekaApeExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active src={MekaApeExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active src={MekaApeExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active src={MekaApeExample} alt="Ape" />
          </Ape>
        </MekaApesBox>
        <ButtonWrapper>
          <Button>Choose</Button>
          <CancelBtn onClick={handleCloseModal}>Cancel</CancelBtn>
        </ButtonWrapper>
        <Text>
          By clicking choose you will available to merge your MekaApes
        </Text>
      </div>
    </ModalWrapper>
  );
};

export default MergeMekaApes;

MergeMekaApes.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  clickedApe: PropTypes.object,
};
