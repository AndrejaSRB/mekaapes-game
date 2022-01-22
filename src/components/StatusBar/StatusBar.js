import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// ******** Styles ********
import { Wrapper, Color, TotalBox } from "./StatusBar.styles";

const StatusBar = ({ totalNumber }) => {
  const [status, setStatus] = useState(0);

  useEffect(() => {
    if (totalNumber) {
      setStatus(totalNumber);
    } else {
      setStatus(0);
    }
  }, [totalNumber]);

  const percentage = () => {
    return (100 * status) / 55000;
  };

  return (
    <Wrapper>
      <Color width={percentage()} />
      {/* <Box width="18.18" place="first">
        10 <span className="mobile">k</span>{" "}
        <span className="desktop">,000</span>
      </Box>
      <Box width="27.27">
        25<span className="mobile">k</span>{" "}
        <span className="desktop">,000</span>
      </Box>
      <Box width="27.27">
        40<span className="mobile">k</span>{" "}
        <span className="desktop">,000</span>
      </Box>
      <Box place="last" width="27.27">
        55<span className="mobile">k</span>{" "}
        <span className="desktop">,000</span>
      </Box> */}
      <TotalBox>
          {status} / 55,000
      </TotalBox>
    </Wrapper>
  );
};

export default StatusBar;

StatusBar.propTypes = {
  totalNumber: PropTypes.number,
};
