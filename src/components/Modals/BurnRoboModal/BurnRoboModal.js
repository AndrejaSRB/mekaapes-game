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
  HelperText,
} from "./BurnRoboModal.styles";

const NoItemFound = () => (
  <NotFoundItem>
    <img src={PlaceholderApe} alt="placeholder" />
    <p>No items found!</p>
  </NotFoundItem>
);


const BurnRoboModal = ({
  open,
  handleCloseModal,
  roboList,
  type,
  tokenUpgrade,
  levels,
}) => {
  const [data, setData] = useState(null);
  const [clickedRobos, setClickedRobos] = useState([]);
  const [listLength, setListLength] = useState(0);
  const [spots, setSpots] = useState(0);

  useEffect(() => {
    if (type === "upgrade") {
      setSpots(levels);
    }
  }, [levels, type]);

  useEffect(() => {
    if (type === "upgrade") {
      if (roboList && roboList.length > 0 && tokenUpgrade) {
        let apes = roboList.filter((ape) => ape.level < 6);
        let uniqueApes = apes.filter((ape) => ape.id !== tokenUpgrade.id);
        setData(uniqueApes);
        setListLength(uniqueApes.length);
      }
    } else {
      if (roboList && roboList.length > 0) {
        let apes = roboList.filter((ape) => ape.level < 6);
        setData(apes);
        setListLength(apes.length);
      }
    }
  }, [roboList, type, tokenUpgrade]);

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
    if (clickedRobos?.length !== spots) {
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
  const handleClickApe = (ape, image) => () => {
    let clickedApe = { ...ape };
    clickedApe.image = image;
    clickedApe.img = image;
    handleClickRobo(clickedApe);
  };

  // Check if Robo is Active
  const getIfRoboIsActive = (id) => {
    if (clickedRobos?.length > 0) {
      return clickedRobos.find((item) => item.id === id);
    } else {
      return false;
    }
  };

  const getIfActive = (id) => {
    let isActive = getIfRoboIsActive(id);
    return isActive;
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

  const getIfBtnIsUpgradeDisabled = () => {
    if (listLength < 1) {
      return true;
    } else if (+clickedRobos?.length !== +spots) {
      return true;
    } else {
      return false;
    }
  };

  const getIfBtnIsBurnDisabled = () => {
    if (listLength < 1) {
      return true;
    } else if (clickedRobos?.length < 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleUpgrade = () => {
    if (tokenUpgrade && levels >= 1 && clickedRobos?.length > 0) {
      const roboIds = clickedRobos.map((robo) => robo.id);
      if (+roboIds.length === +levels) {
        console.log("Results robo upgrade", tokenUpgrade);
        console.log("Resultslevels", levels);
        console.log("Results Burns roboIds", roboIds);
      }
    }

    setClickedRobos([]);
    setListLength(0);
    handleCloseModal();
  };

  const handleBurn = () => {};

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
          Select the Robo Ooga you want to burn for each level.
        </Subtitle>
        <RoboApesBox length={listLength}>{handleRenderElements()}</RoboApesBox>
        {type === "upgrade" && (
          <HelperText>
            You have to select {spots}. Selected{" "}
            {clickedRobos?.length ? clickedRobos?.length : 0}/{spots}
          </HelperText>
        )}
        <ButtonWrapper>
          <Button
            disabled={
              type === "upgrade"
                ? getIfBtnIsUpgradeDisabled()
                : getIfBtnIsBurnDisabled()
            }
            onClick={type === "upgrade" ? handleUpgrade : handleBurn}>
            {type === "upgrade" ? "Upgrade" : "Burn"}
          </Button>
          <CancelBtn onClick={handleCloseModal}>Cancel</CancelBtn>
        </ButtonWrapper>
        <Text>
          By clicking "Upgrade" you will burn selected Robo Oogas, and your
          previously selected Robo Ooga will be upgraded.
        </Text>
      </div>
    </ModalWrapper>
  );
};

export default BurnRoboModal;

BurnRoboModal.propTypes = {
  open: PropTypes.bool.isRequired,
  roboList: PropTypes.array,
  handleCloseModal: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  tokenUpgrade: PropTypes.object,
  levels: PropTypes.number,
};
