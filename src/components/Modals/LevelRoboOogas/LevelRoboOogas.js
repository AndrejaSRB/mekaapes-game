import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// ******** Images ********
import PlaceholderApe from "../../../assets/placeholder_ape.png";
// ******** Styles ********
import {
  ModalWrapper,
  Title,
  Subtitle,
  RoboApesBox,
  Text,
  Button,
  CancelBtn,
  ButtonWrapper,
  Ape,
  ApeImage,
  NotFoundItem,
} from "./LevelRoboOogas.styles";

// TODO: filter out all level 3 RoboOgas from the list and present other

const NoItemFound = () => (
  <NotFoundItem>
    <img src={PlaceholderApe} alt="placeholder" />
    <p>No items found!</p>
  </NotFoundItem>
);

const LevelRoboOogas = ({
  open,
  handleCloseModal,
  list,
  handleSaveApe,
  selectedApe,
}) => {
  const [clickedApe, setClickedApe] = useState(null);
  const [data, setData] = useState(null);
  const [listLength, setListLength] = useState(0);

  useEffect(() => {
    if (selectedApe) {
      setClickedApe(selectedApe);
    }
  }, [selectedApe]);

  useEffect(() => {
    if (list && list.length > 0) {
      let apes = list.filter((ape) => ape.level < 3);
      setData(apes);
      setListLength(apes.length);
    }
  }, [list]);

  const handleClickButton = () => {
    if (clickedApe) {
      handleSaveApe(clickedApe);
      handleCloseModal();
      setClickedApe(null);
      setData(null);
    }
  };

  const handleClickApe = (ape) => () => {
    setClickedApe(ape);
  };

  const getIfActive = (id) => {
    if (clickedApe) {
      if (clickedApe.id === id) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const handleRenderElements = () => {
    if (data && data.length > 0) {
      return data.map((ape) => (
        <Ape key={ape.id} onClick={handleClickApe(ape)}>
          <ApeImage
            active={getIfActive(ape.id)}
            currentLvl={ape.level}
            src={ape.img}
            alt={ape.name}
          />
        </Ape>
      ));
    } else {
      return <NoItemFound />;
    }
  };

  const getIfBtnIsDisabled = () => {
    if (listLength < 1) {
      return true;
    } else if (!Boolean(clickedApe)) {
      return true;
    } else {
      return false;
    }
  };

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
        <RoboApesBox length={listLength}>{handleRenderElements()}</RoboApesBox>
        <ButtonWrapper>
          <Button disabled={getIfBtnIsDisabled()} onClick={handleClickButton}>
            Choose
          </Button>
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
  handleSaveApe: PropTypes.func.isRequired,
  selectedApe: PropTypes.object,
  list: PropTypes.array,
};
