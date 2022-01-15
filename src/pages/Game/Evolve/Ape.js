import { useEffect, useState } from "react";
import PropTypes from "prop-types";
// ******** Images ********
import PlaceholderImage from "../../../assets/no-image.png";
// ******** Hooks ********
import useEvolveMetadata from "../../../hooks/useEvolveMetadata";
// ******** Styles ********
import { Ape, ApeImage } from "./Evolve.styles";

const BabyApe = ({ ape, handleClickApe, getIfSelected }) => {
  const [image, setImage] = useState(null);
  const { data, isLoading } = useEvolveMetadata(ape);

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
          selected={!ape.placeholder && getIfSelected(ape.id)}
          active
          src={image}
          alt={ape.id}
        />
      );
    } else {
      return (
        <ApeImage
          selected={!ape.placeholder && getIfSelected(ape.id)}
          active
          src={PlaceholderImage}
          alt={ape.id}
        />
      );
    }
  };

  return (
    <Ape onClick={handleClickApe(ape, ape.placeholder)}>
      {ape.placeholder ? (
        <ApeImage
          selected={!ape.placeholder && getIfSelected(ape.id)}
          active
          src={ape.img}
          alt={ape.id}
        />
      ) : (
        renderApeImage()
      )}
    </Ape>
  );
};

export default BabyApe;

BabyApe.propTypes = {
  ape: PropTypes.object.isRequired,
  handleClickApe: PropTypes.func.isRequired,
  getIfSelected: PropTypes.func.isRequired,
};
