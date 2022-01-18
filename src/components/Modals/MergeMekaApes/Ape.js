import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// ******** Images ********
import PlaceholderImage from "../../../assets/placeholder-image.jpeg";
// ******** Hooks ********
import useApeMetadata from "../../../hooks/useApeMetadata";
// ******** Styles ********
import { Ape, ApeImage } from "./MergeMekaApes.styles";

const MergeMekaApe = ({ ape, handleClickApe, getIfActive }) => {
  const { data, isLoading } = useApeMetadata(ape);
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
        <ApeImage
          active={getIfActive(ape.id)}
          currentLvl={ape.level}
          src={PlaceholderImage}
          alt={ape.id}
        />
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
