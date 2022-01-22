import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// ******** Images ********
import PlaceholderImage from "../../../assets/placeholder-image.jpeg";
// ******** Hooks ********
import useApeMetadata from "../../../hooks/useApeMetadata";
// ******** Styles ********
import { Ape, ApeImage } from "./LevelRoboOogas.styles";

const LevelRoboOogaApe = ({ ape, handleClickApe, getIfActive }) => {
  const { data, isLoading } = useApeMetadata(ape);
  const [image, setImage] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (data && ape) {
        let level = ape?.level;
        setImage(`${data.image}?level=${level}`);
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
        // <ApeImage
        //   active={getIfActive(ape.id)}
        //   currentLvl={ape.level}
        //   src={`https://mekaapes.s3.amazonaws.com/images/${ape.id}.png?1222259157.415`}
        //   alt={ape.id}
        // />
      )}
    </Ape>
  );
};

export default LevelRoboOogaApe;

LevelRoboOogaApe.propTypes = {
  ape: PropTypes.object.isRequired,
  handleClickApe: PropTypes.func.isRequired,
  getIfActive: PropTypes.func.isRequired,
};
