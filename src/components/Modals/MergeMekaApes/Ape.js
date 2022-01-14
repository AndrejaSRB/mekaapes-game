import { useState } from "react";
import PropTypes from "prop-types";
// ******** Components ********
import { Skeleton } from "antd";
// ******** Styles ********
import { Ape, ApeImage, PlaceholderImage } from "./MergeMekaApes.styles";

const MergeMekaApe = ({ ape, handleClickApe, getIfActive }) => {
  const [image] = useState(null);

  const renderApeImage = () => {
    if (image) {
      return (
        <ApeImage
          active={getIfActive(ape.id)}
          currentLvl={ape.level}
          src={image}
          alt={ape.id}
        />
      );
    } else {
      return (
        <PlaceholderImage active={getIfActive(ape.id)} currentLvl={ape.level}>
          <Skeleton.Image />
        </PlaceholderImage>
      );
    }
  };

  return (
    <Ape key={ape.id} onClick={handleClickApe(ape, image)}>
      {ape.placeholder ? (
        <ApeImage
          active={getIfActive(ape.id)}
          currentLvl={ape.level}
          src={ape.img}
          alt={ape.id}
        />
      ) : (
        renderApeImage()
      )}
    </Ape>
  );
};

export default MergeMekaApe;

MergeMekaApe.propTypes = {
  ape: PropTypes.object.isRequired,
  handleClickApe: PropTypes.func.isRequired,
  getIfActive: PropTypes.func.isRequired,
};
