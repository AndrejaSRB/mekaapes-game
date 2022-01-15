import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// ******** Components ********
import Ape from "./Ape";
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
  NotFoundItem,
} from "./LevelRoboOogas.styles";

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
      let apes = list.filter((ape) => ape.level < 4);
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

  const handleClickApe = (ape, image) => () => {
    let roboOoga = { ...ape };
    roboOoga.image = image;
    roboOoga.img = image;
    setClickedApe(roboOoga);
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
        <Ape
          key={ape.id}
          handleClickApe={handleClickApe}
          getIfActive={getIfActive}
          ape={ape}
        />
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
        <Subtitle>Select the Robo Ooga you want to upgrade.</Subtitle>
        <RoboApesBox length={listLength}>{handleRenderElements()}</RoboApesBox>
        <ButtonWrapper>
          <Button disabled={getIfBtnIsDisabled()} onClick={handleClickButton}>
            Select
          </Button>
          <CancelBtn onClick={handleCloseModal}>Cancel</CancelBtn>
        </ButtonWrapper>
        <Text>
          Click "Select" to see what features your Robo Ooga will gain when
          upgrading to the next level.
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
