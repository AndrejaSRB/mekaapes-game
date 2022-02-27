import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// ******** Images ********
import PlaceholderImage from "../../../assets/placeholder-image.jpeg";
// ******** Hooks ********
import useApeMetadata from "../../../hooks/Global/useApeMetadata";

const CrewStepApe = ({ ape, handleClickApe, getIfActive, type }) => {
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
      return <img src={image} alt={ape.id} />;
    } else {
      return <img src={PlaceholderImage} alt={ape.id} />;
    }
  };

  return <>{renderApeImage()}</>;
};

export default CrewStepApe;

CrewStepApe.propTypes = {
  ape: PropTypes.object.isRequired,
};
