import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// ******** Images ********
import PlaceholderImage from "../../../assets/placeholder-image.jpeg";
// ******** Hooks ********
import useApeMetadata from "../../../hooks/Global/useApeMetadata";
// ******** Styles ********
import { Ape, ApeImage } from "./CrewModal.styles";

const CrewApe = ({ ape, handleClickApe, getIfActive, type }) => {
  const { data, isLoading } = useApeMetadata(ape);
  const [image, setImage] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (data && ape) {
        let level = ape?.level;
        let type = ape?.oogaType;
        setImage(`${data.image}?level=${level}&type=${type}`);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [data, ape]);

  const renderApeImage = () => {
    if (image && !isLoading) {
      return (
        <ApeImage
          active={getIfActive(ape.id, type)}
          currentLvl={ape.level}
          src={image}
          alt={ape.id}
        />
      );
    } else {
      return (
        <ApeImage
          active={getIfActive(ape.id, type)}
          currentLvl={ape.level}
          src={PlaceholderImage}
          alt={ape.id}
        />
      );
    }
  };

  return (
    <Ape key={ape.id} onClick={handleClickApe(ape, image, type)}>
      {ape.placeholder ? (
        <ApeImage
          active={getIfActive(ape.id, type)}
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

export default CrewApe;

CrewApe.propTypes = {
  ape: PropTypes.object.isRequired,
  handleClickApe: PropTypes.func.isRequired,
  getIfActive: PropTypes.func.isRequired,
};
