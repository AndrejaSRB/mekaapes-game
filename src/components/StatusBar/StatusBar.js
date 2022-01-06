import PropTypes from "prop-types";
// ******** Styles ********
import { Wrapper, Box, Color } from "./StatusBar.styles";

const StatusBar = ({ totalNumber }) => {
  console.log("totalNumber", totalNumber);
  const percentage = () => {
    return (100 * totalNumber) / 55000;
  };

  return (
    <Wrapper>
      <Color width={percentage()} />
      {/* <Box place="first" width="20">0</Box>
      <Box width="20">
        10 <span className="mobile">k</span>{" "}
        <span className="desktop">,000</span>
      </Box>
      <Box width="20">
        25<span className="mobile">k</span>{" "}
        <span className="desktop">,000</span>
      </Box>
      <Box width="20">
        40<span className="mobile">k</span>{" "}
        <span className="desktop">,000</span>
      </Box>
      <Box place="last" width="20">
        55<span className="mobile">k</span>{" "}
        <span className="desktop">,000</span>
      </Box> */}
      <Box width="18.18" place="first">
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
      </Box>
    </Wrapper>
  );
};

export default StatusBar;

StatusBar.propTypes = {
  totalNumber: PropTypes.number.isRequired,
};
