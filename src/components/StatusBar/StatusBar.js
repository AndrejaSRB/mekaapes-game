import PropTypes from "prop-types";
// ******** Styles ********
import { Wrapper, Box, Color } from "./StatusBar.styles";

const StatusBar = ({totalNumber}) => {

  const percentage = () => {
    return (100 * totalNumber) / 50000;
  };

  return (
    <Wrapper>
      <Color width={percentage()} />
      <Box place="first">0</Box>
      <Box>
        10 <span className="mobile">k</span>{" "}
        <span className="desktop">,000</span>
      </Box>
      <Box>
        25<span className="mobile">k</span>{" "}
        <span className="desktop">,000</span>
      </Box>
      <Box>
        40<span className="mobile">k</span>{" "}
        <span className="desktop">,000</span>
      </Box>
      <Box place="last">
        50<span className="mobile">k</span>{" "}
        <span className="desktop">,000</span>
      </Box>
    </Wrapper>
  );
};

export default StatusBar;

StatusBar.propTypes = {
    totalNumber: PropTypes.number.isRequired,
  };
