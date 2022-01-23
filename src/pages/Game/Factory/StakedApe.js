import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// ******** Images ********
import ImagePlaceholder from "../../../assets/placeholder-image.jpeg";
// ******** Hooks ********
import useApeMetadata from "../../../hooks/useApeMetadata";
// ******** Functions ********
import { beautifyNumber } from "../Factory/helper";
// ******** Styles ********
import { ApeNft } from "./Factory.styles";

const StakedApe = ({
  ape,
  selectAllStaked,
  setSelectAllStaked,
  selectedStaked,
  setSelectedStaked,
  handleClickStakedApe,
  getIfSelected,
}) => {
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
      return <img src={ImagePlaceholder} alt={ape.id} />;
    }
  };

  return (
    <ApeNft
      selected={
        !ape.placeholder &&
        getIfSelected(selectAllStaked, selectedStaked, ape.id)
      }
      onClick={handleClickStakedApe(
        ape,
        ape.placeholder,
        selectAllStaked,
        setSelectAllStaked,
        selectedStaked,
        setSelectedStaked
      )}>
      {ape.placeholder ? (
        <img src={ape.img} alt={ape.name} />
      ) : (
        <>
          {renderApeImage()}
          {!ape.placeholder && (
            <div>
              <span>{ape.reward ? beautifyNumber(ape.reward) : 0}</span>
            </div>
          )}
        </>
      )}
    </ApeNft>
  );
};

export default StakedApe;

StakedApe.propTypes = {
  ape: PropTypes.object.isRequired,
  selectAllStaked: PropTypes.bool,
  setSelectAllStaked: PropTypes.func.isRequired,
  selectedStaked: PropTypes.array,
  setSelectedStaked: PropTypes.func.isRequired,
  handleClickStakedApe: PropTypes.func.isRequired,
  getIfSelected: PropTypes.func.isRequired,
};
