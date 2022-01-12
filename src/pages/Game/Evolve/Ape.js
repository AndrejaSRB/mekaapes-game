import { useEffect, useState } from "react";
import PropTypes from "prop-types";
// ******** Images ********
import LoadingImage from "../../../assets/loading-animation.gif";
// ******** Hooks ********
import useEvolveMetadata from "../../../hooks/useEvolveMetadata";
// ******** Styles ********
import { Ape, ApeImage } from "./Evolve.styles";

const BabyApe = ({ ape, handleClickApe, getIfSelected }) => {
  const [image, setImage] = useState(null);
  const { data } = useEvolveMetadata(ape);

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
    if (image) {
      return image;
    } else {
      return LoadingImage;
    }
  };

  return (
    <Ape onClick={handleClickApe(ape, ape.placeholder)}>
      <ApeImage
        selected={!ape.placeholder && getIfSelected(ape.id)}
        active
        src={ape.placeholder ? ape.img : renderApeImage()}
        alt={ape.id}
      />
    </Ape>
  );
};

export default BabyApe;

BabyApe.propTypes = {
  ape: PropTypes.object.isRequired,
  handleClickApe: PropTypes.func.isRequired,
  getIfSelected: PropTypes.func.isRequired,
};
