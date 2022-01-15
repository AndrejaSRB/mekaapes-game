import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// ******** Images ********
import ImagePlaceholder from "../../../assets/no-image.png";
// ******** Hooks ********
import useApeMetadata from "../../../hooks/useApeMetadata";
// ******** Styles ********
import { Nft } from "./Factory.styles";

const UnstakeMekApe = ({
  meka,
  selectAllUnstakedMeka,
  setSelectAllUnstakedMeka,
  selectedUnstakedMeka,
  setSelectedUnstakedMeka,
  handleClickApe,
  getIfSelected,
}) => {
  const { data, isLoading } = useApeMetadata(meka);
  const [image, setImage] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (data) {
        setImage(data.image);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [data]);

  const renderApeImage = () => {
    if (image && !isLoading) {
      return <img src={image} alt={meka.id} />;
    } else {
      return <img src={ImagePlaceholder} alt={meka.id} />;
    }
  };

  return (
    <Nft
      selected={getIfSelected(
        selectAllUnstakedMeka,
        selectedUnstakedMeka,
        meka.id
      )}
      onClick={handleClickApe(
        meka,
        setSelectAllUnstakedMeka,
        selectAllUnstakedMeka,
        setSelectedUnstakedMeka,
        selectedUnstakedMeka
      )}>
      {renderApeImage()}
    </Nft>
  );
};

export default UnstakeMekApe;

UnstakeMekApe.propTypes = {
  meka: PropTypes.object.isRequired,
  selectAllUnstakedMeka: PropTypes.bool,
  setSelectAllUnstakedMeka: PropTypes.func.isRequired,
  selectedUnstakedMeka: PropTypes.array,
  setSelectedUnstakedMeka: PropTypes.func.isRequired,
  handleClickApe: PropTypes.func.isRequired,
  getIfSelected: PropTypes.func.isRequired,
};
