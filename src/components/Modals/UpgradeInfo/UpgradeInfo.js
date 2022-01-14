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
              <span>Produce 1,000 $OG per day</span>
            </div>
            <div className="cell">
              <span className="self-align">+ Feature</span><span>/</span>
            </div>
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
              <span><small>+ 25%</small> more $OG (1,250 $OG per day)</span>
            </div>
            <div className="cell">
              <span className="self-align">+ Feature</span><span>Decrease the risk of $OG getting stolen to 25% when unstaking</span>
            </div>
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
              <span><small>+ 50%</small> more $OG (1,500 $OG per day)</span>
            </div>
            <div className="cell">
              <span className="self-align">+ Feature</span><span>Decrease the unstaking time by 25%</span>
            </div>
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
              <span><small>+ 100%</small> more $OG (2,000 $OG per day)</span>
            </div>
            <div className="cell">
              <span className="self-align">+ Feature</span><span>/</span>
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
