import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// ******** Image ********
import LoadingImage from "../../../assets/loading-animation.gif";
// ******** Styles ********
import {
  ModalWrapper,
  LoadingPicture,
  Dot,
  HelperText,
  SmallText,
} from "./ActionLoading.styles";

const Loading = ({ open, text, tsxNumber, tsxTotalNumber }) => {
  const [tsxNum, setTsxNum] = useState(1);
  const [tsxTotal, setTsxTotal] = useState(1);

  useEffect(() => {
    if (tsxNumber) {
      setTsxNum(tsxNumber);
    } else {
      setTsxNum(1);
    }
  }, [tsxNumber]);

  useEffect(() => {
    if (tsxTotalNumber) {
      setTsxTotal(tsxTotalNumber);
    } else {
      setTsxTotal(2);
    }
  }, [tsxTotalNumber]);

  return (
    <ModalWrapper visible={open} centered width={744} maskClosable={false}>
      <div className="content">
        <LoadingPicture>
          <img src={LoadingImage} alt="Loading" />
        </LoadingPicture>
        <SmallText>
          {text} Please wait <Dot>.</Dot>
          <Dot>.</Dot>
          <Dot>.</Dot>
        </SmallText>
        {tsxTotal > 1 && (
          <HelperText>{`Current transaction ${tsxNum}/${tsxTotal}`}</HelperText>
        )}
      </div>
    </ModalWrapper>
  );
};

export default Loading;

Loading.propTypes = {
  open: PropTypes.bool.isRequired,
};
