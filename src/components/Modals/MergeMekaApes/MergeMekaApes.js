import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// ******** Images ********
import PlaceholderApe from "../../../assets/placeholder_ape.png";
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
  NotFoundItem,
} from "./MergeMekaApes.styles";

const NoItemFound = () => (
  <NotFoundItem>
    <img src={PlaceholderApe} alt="placeholder" />
    <p>No items found!</p>
  </NotFoundItem>
);

const MergeMekaApes = ({
  open,
  handleCloseModal,
  handleSavePickedApe,
  selectedApe,
  list,
  oppositeApe,
  type,
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
      if (oppositeApe) {
        let apes = list.filter(
          (ape) =>
            ape.level === 0 &&
            ape.status === "staked" &&
            ape.id !== oppositeApe.id
        );
        setListLength(apes.length);
        setData(apes);
      } else {
        let apes = list.filter(
          (ape) => ape.level === 0 && ape.status === "staked"
        );
        setListLength(apes.length);
        setData(apes);
      }
    } else {
      setListLength(0);
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
        <Title>MekaApes</Title>
        <Subtitle>
          Select the MekaApe you want to merge. Staked MekaApes can't be merged.
          You need to unstake the MekaApes you want to merge first.
        </Subtitle>
        <MekaApesBox length={listLength}>{handleRenderElements()}</MekaApesBox>
        <ButtonWrapper>
          <Button disabled={getIfBtnIsDisabled()} onClick={handleClickButton}>
            Choose
          </Button>
          <CancelBtn onClick={handleCloseModal}>Cancel</CancelBtn>
        </ButtonWrapper>
        <Text>
          {type === "keep"
            ? `You will keep the MekaApe you select. It will receive a random Mega
          Level.`
            : `The MekaApe you select will get burned.`}
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
