import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// ******** Images ********
import ImagePlaceholder from "../../../assets/placeholder-image.jpeg";
// ******** Hooks ********
import useApeMetadata from "../../../hooks/useApeMetadata";
// ******** Styles ********
import { Nft } from "./Factory.styles";

const UnstakeRoboApe = ({
  robo,
  selectAllUnstakedRobo,
  setSelectAllUnstakedRobo,
  selectedUnstakedRobo,
  setSelectedUnstakedRobo,
  handleClickApe,
  getIfSelected,
}) => {
  const { data, isLoading } = useApeMetadata(robo);
  const [image, setImage] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (data && robo) {
        let level = robo?.level;
        setImage(`${data.image}?level=${level}`);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [data, robo]);

  const renderApeImage = () => {
    if (image && !isLoading) {
      return <img src={image} alt={robo.id} />;
    } else {
      return <img src={ImagePlaceholder} alt={robo.id} />;
    }
  };

  return (
    <Nft
      selected={getIfSelected(
        selectAllUnstakedRobo,
        selectedUnstakedRobo,
        robo.id
      )}
      onClick={handleClickApe(
        robo,
        setSelectAllUnstakedRobo,
        selectAllUnstakedRobo,
        setSelectedUnstakedRobo,
        selectedUnstakedRobo
      )}>
      {renderApeImage()}
    </Nft>
  );
};

export default UnstakeRoboApe;

UnstakeRoboApe.propTypes = {
  robo: PropTypes.object.isRequired,
  selectAllUnstakedRobo: PropTypes.bool,
  setSelectAllUnstakedRobo: PropTypes.func.isRequired,
  selectedUnstakedRobo: PropTypes.array,
  setSelectedUnstakedRobo: PropTypes.func.isRequired,
  handleClickApe: PropTypes.func.isRequired,
  getIfSelected: PropTypes.func.isRequired,
};
