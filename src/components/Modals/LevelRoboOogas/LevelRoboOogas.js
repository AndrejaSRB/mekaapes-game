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
} from "./LevelRoboOogas.styles";

// TODO
// Filter out all level 3 RoboOgas from the list and present other

const LevelRoboOogas = ({ open, handleCloseModal }) => {
  return (
    <ModalWrapper
      visible={open}
      onCancel={handleCloseModal}
      centered
      width={744}
      maskClosable={false}>
      <div className="content">
        <Title>Robo Oogas</Title>
        <Subtitle>
          Choose your Robo Ooga to upgrade it to another Level.
        </Subtitle>
        <MekaApesBox>
          <Ape>
            <ApeImage active currentLvl="2" src={MekaApeExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active currentLvl="1" src={RoboOogaExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active currentLvl="1" src={MekaApeExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active currentLvl="0" src={RoboOogaExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active currentLvl="2" src={MekaApeExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active currentLvl="2" src={RoboOogaExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active currentLvl="1" src={MekaApeExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active currentLvl="2" src={RoboOogaExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active currentLvl="2" src={MekaApeExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active currentLvl="1" src={MekaApeExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active currentLvl="0" src={MekaApeExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active currentLvl="0" src={MekaApeExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active currentLvl="2" src={MekaApeExample} alt="Ape" />
          </Ape>
          <Ape>
            <ApeImage active currentLvl="2" src={MekaApeExample} alt="Ape" />
          </Ape>
        </MekaApesBox>
        <ButtonWrapper>
          <Button>Choose</Button>
          <CancelBtn onClick={handleCloseModal}>Cancel</CancelBtn>
        </ButtonWrapper>
        <Text>
          By clicking choose you will available to upgrade your Robo Ooga.
        </Text>
      </div>
    </ModalWrapper>
  );
};

export default LevelRoboOogas;

LevelRoboOogas.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  clickedApe: PropTypes.object,
};
