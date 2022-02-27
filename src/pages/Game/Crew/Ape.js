import { useEffect, useState } from "react";
import PropTypes from "prop-types";
// ******** Images ********
import PlaceholderImage from "../../../assets/placeholder-image.jpeg";
// ******** Hooks ********
import useApeMetadata from "../../../hooks/Global/useApeMetadata";
// ******** Styles ********
import { Meka } from "./Crew.styles";

const CrewApe = ({ ape }) => {
  const [image, setImage] = useState(null);
  const { data, isLoading } = useApeMetadata(ape);

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
        <Meka>
          <img src={image} alt={ape.id} />
        </Meka>
      );
    } else {
      return (
        <Meka>
          <img src={PlaceholderImage} alt={ape.id} />
        </Meka>
      );
    }
  };

  return <>{renderApeImage()}</>;
};

export default CrewApe;

CrewApe.propTypes = {
  ape: PropTypes.object.isRequired,
};
