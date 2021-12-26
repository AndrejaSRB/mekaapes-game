import { useState, useEffect } from "react";
import PropTypes from "prop-types";
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

const MergeMekaApes = ({
  open,
  handleCloseModal,
  handleSavePickedApe,
  selectedApe,
  list,
  oppositeApe,
}) => {
  const [clickedApe, setClickedApe] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (selectedApe) {
      setClickedApe(selectedApe);
    }
  }, [selectedApe]);

  useEffect(() => {
    if (list && list.length > 0) {
      if (oppositeApe) {
        let apes = list.filter(
          (ape) =>
            ape.level === 0 &&
            ape.status === "staked" &&
            ape.id !== oppositeApe.id
        );
        setData(apes);
      } else {
        let apes = list.filter(
          (ape) => ape.level === 0 && ape.status === "staked"
        );
        setData(apes);
      }
    }
  }, [list, oppositeApe]);

  const handleClickButton = () => {
    if (clickedApe) {
      handleSavePickedApe(clickedApe);
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
        <Title>MekaApes</Title>
        <Subtitle>Choose your MekaApes to merge it with another one.</Subtitle>
        <MekaApesBox>{handleRenderElements()}</MekaApesBox>
        <ButtonWrapper>
          <Button disabled={!Boolean(clickedApe)} onClick={handleClickButton}>
            Choose
          </Button>
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
  oppositeApe: PropTypes.object,
};
