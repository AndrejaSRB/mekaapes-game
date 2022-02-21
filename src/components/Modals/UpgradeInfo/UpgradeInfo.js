import PropTypes from "prop-types";
// ******** Components ********
import Table from "./Table/Table";
// ******** Styles ********
import { ModalWrapper, MobileTable, Box } from "./UpgradeInfo.styles";

const UpgradeInfo = ({ open, handleClose }) => {
  return (
    <ModalWrapper
      visible={open}
      centered
      width={1024}
      maskClosable
      onCancel={handleClose}>
      <div className="content">
        <Table />
        <MobileTable>
          <Box>
            <div className="cell">
              <span>Level</span><span>1</span>
            </div>
            <div className="cell">
              <span>Position</span><span>Scrap Scout</span>
            </div>
            <div className="cell">
              <span>Productivity</span>
              <span>Produce 200 $OG per day</span>
            </div>
            {/* <div className="cell">
              <span className="self-align">+ Feature</span><span>/</span>
            </div> */}
          </Box>

          <Box>
            <div className="cell">
              <span>Level</span><span>2</span>
            </div>
            <div className="cell">
              <span>Position</span><span>Garbage Compactor</span>
            </div>
            <div className="cell">
              <span>Productivity</span>
              <span>Produce 400 $OG per day</span>
            </div>
            {/* <div className="cell">
              <span className="self-align">+ Feature</span><span>Decrease the risk of $OG getting stolen to 25% when unstaking</span>
            </div> */}
          </Box>

          <Box>
            <div className="cell">
              <span>Level</span><span>3</span>
            </div>
            <div className="cell">
              <span>Position</span><span>Factory Worker</span>
            </div>
            <div className="cell">
              <span>Productivity</span>
              {/* <span><small>+ 50%</small> more $OG (300 $OG per day)</span> */}
              <span>Produce 700 $OG per day</span>
            </div>
            {/* <div className="cell">
              <span className="self-align">+ Feature</span><span>Decrease the unstaking time by 25%</span>
            </div> */}
          </Box>

          <Box>
            <div className="cell">
              <span>Level</span><span>4</span>
            </div>
            <div className="cell">
              <span>Position</span><span>Executive Bot</span>
            </div>
            <div className="cell">
              <span>Productivity</span>
              <span>Produce 1,200 $OG per day</span>
            </div>
            {/* <div className="cell">
              <span className="self-align">+ Feature</span><span>/</span>
            </div> */}
          </Box>
          <Box>
            <div className="cell">
              <span>Level</span><span>5</span>
            </div>
            <div className="cell">
              <span>Position</span><span>Degen</span>
            </div>
            <div className="cell">
              <span>Productivity</span>
              <span>Produce 2,500 $OG per day</span>
            </div>
          </Box>
          <Box>
            <div className="cell">
              <span>Level</span><span>6</span>
            </div>
            <div className="cell">
              <span>Position</span><span>Super Elite</span>
            </div>
            <div className="cell">
              <span>Productivity</span>
              <span>Produce 4,000 $OG per day</span>
            </div>
          </Box>
        </MobileTable>
      </div>
    </ModalWrapper>
  );
};

export default UpgradeInfo;

UpgradeInfo.propTypes = {
  open: PropTypes.bool.isRequired,
};
