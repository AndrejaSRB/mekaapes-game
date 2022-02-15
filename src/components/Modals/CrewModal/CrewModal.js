import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// ******** Components ********
import Ape from "./Ape";
import CrewStep from "./CrewStep";
// ******** Images ********
import PlaceholderApe from "../../../assets/placeholder_ape.png";
// ******** Styles ********
import {
  ModalWrapper,
  Title,
  Subtitle,
  ApesBox,
  Text,
  Button,
  CancelBtn,
  ButtonWrapper,
  NotFoundItem,
  HelperText,
  SelectedText,
} from "./CrewModal.styles";

const NoItemFound = () => (
  <NotFoundItem>
    <img src={PlaceholderApe} alt="placeholder" />
    <p>No items found!</p>
  </NotFoundItem>
);

const SPOTS = 8;

// TODO get Stops from the contract
// TODO check Meka height?

const CrewModal = ({ open, handleCloseModal, roboList, mekaList }) => {
  const [data, setData] = useState(null);
  const [clickedMeka, setClickedMeka] = useState(null);
  const [clickedRobos, setClickedRobos] = useState([]);
  const [mekaListLength, setMekaListLength] = useState(0);
  const [roboListLength, setRoboListLength] = useState(0);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (step === 1) {
      setData(mekaList);
      setMekaListLength(mekaList.length);
    } else if (step === 2) {
      setData(roboList);
      setRoboListLength(roboList.length);
    }
  }, [step, mekaList, roboList]);

  const handleClickMeka = (ape) => {
    if (clickedMeka) {
      if (clickedMeka.id === ape.id) {
        setClickedMeka(null);
      } else {
        setClickedMeka(ape);
      }
    } else {
      setClickedMeka(ape);
    }
  };

  // Kick robo from the selected list
  const handleKickRobo = (ape) => {
    let allRobos = [...clickedRobos];
    let index = null;
    allRobos.forEach((robo, i) => {
      if (robo.id === ape.id) {
        index = i;
      }
    });
    if (index !== null) {
      allRobos.splice(index, 1);
      setClickedRobos(allRobos);
    } else {
      setClickedRobos([...allRobos, ape]);
    }
  };

  const handleClickRobo = (ape) => {
    if (clickedRobos?.length !== SPOTS) {
      let elementPos = clickedRobos
        .map((robo) => {
          return robo.id;
        })
        .indexOf(ape.id);

      if (elementPos === -1) {
        setClickedRobos([...clickedRobos, ape]);
      } else {
        handleKickRobo(ape);
      }
    } else {
      let elementPos = clickedRobos
        .map((robo) => {
          return robo.id;
        })
        .indexOf(ape.id);
      if (elementPos !== -1) {
        handleKickRobo(ape);
      }
    }
  };

  // handle Click Ape
  const handleClickApe = (ape, image, type) => () => {
    let clickedApe = { ...ape };
    clickedApe.image = image;
    clickedApe.img = image;
    if (type === 1) {
      handleClickMeka(clickedApe);
    } else if (type === 2) {
      handleClickRobo(clickedApe);
    }
  };

  // Check if Robo is Active
  const getIfRoboIsActive = (id) => {
    if (clickedRobos?.length > 0) {
      return clickedRobos.find((item) => item.id === id);
    } else {
      return false;
    }
  };

  const getIfActive = (id, type) => {
    if (type === 1) {
      if (clickedMeka) {
        if (clickedMeka.id === id) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else if (type === 2) {
      let isActive = getIfRoboIsActive(id);
      return isActive;
    }
  };

  const getLength = () => {
    if (step === 1) {
      return mekaListLength;
    } else if (step === 2) {
      return roboListLength;
    }
  };

  const getIfItsDisabled = () => {
    if (step === 1) {
      if (!clickedMeka) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const handleRenderElements = () => {
    if (data && data.length > 0) {
      return data.map((ape) => (
        <Ape
          key={ape.id}
          handleClickApe={handleClickApe}
          getIfActive={getIfActive}
          type={step}
          ape={ape}
        />
      ));
    } else {
      return <NoItemFound />;
    }
  };

  const renderTitle = () => {
    if (step === 1) {
      return "Meka Ape";
    } else if (step === 2) {
      return "Robo Oogas";
    } else if (step === 3) {
      return "The Crew";
    }
  };

  const renderSubTitle = () => {
    if (step === 1) {
      return "Select the Meka Ape you want to be a lead of the crew.";
    } else if (step === 2) {
      return "Select the Robo Oogas which would like to be the crew.";
    } else if (step === 3) {
      return "Here's the crew overview.";
    }
  };

  const renderText = () => {
    if (step === 1) {
      return `Click "Next" to see the Robo Oogas list.`;
    } else if (step === 2) {
      return `Click "Next" to see the crew overview.`;
    } else if (step === 3) {
      return `By clicking "Create" you will create your crew.`;
    }
  };

  const handleClickBack = () => {
    if (step !== 1) {
      setStep(step - 1);
    }
  };

  const handleClickNext = () => {
    if (step !== 3) {
      setStep(step + 1);
    }
  };

  const handleClickCreate = () => {
    let crew = [clickedMeka.id];
    if (clickedRobos?.length > 0) {
      clickedRobos.forEach((robo) => crew.push(robo.id));
    }
    console.log("CREATED", crew);
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
        <Title>{renderTitle()}</Title>
        <Subtitle>{renderSubTitle()}</Subtitle>
        {step !== 3 && (
          <ApesBox length={getLength()}>{handleRenderElements()}</ApesBox>
        )}
        {step === 3 && (
          <CrewStep clickedMeka={clickedMeka} clickedRobos={clickedRobos} />
        )}
        {step === 2 && (
          <SelectedText>
            Selected: {clickedRobos?.length ? clickedRobos.length : 0}/{SPOTS}
          </SelectedText>
        )}
        <ButtonWrapper>
          {step === 3 ? (
            <Button onClick={handleClickCreate}>Create</Button>
          ) : (
            <Button onClick={handleClickNext} disabled={getIfItsDisabled()}>
              Next
            </Button>
          )}
          {step === 1 ? (
            <CancelBtn onClick={handleCloseModal}>Close</CancelBtn>
          ) : (
            <CancelBtn onClick={handleClickBack}>Back</CancelBtn>
          )}
        </ButtonWrapper>
        <Text>{renderText()}</Text>
        <HelperText>Step: {step}/3</HelperText>
      </div>
    </ModalWrapper>
  );
};

export default CrewModal;

CrewModal.propTypes = {
  open: PropTypes.bool.isRequired,
  roboList: PropTypes.array,
  mekaList: PropTypes.array,
  handleCloseModal: PropTypes.func.isRequired,
};
