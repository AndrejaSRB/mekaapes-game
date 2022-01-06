import PropTypes from "prop-types";
// ******** Image ********
import LoadingImage from "../../../assets/Upgrade_table.png";
// ******** Styles ********
import { ModalWrapper, Picture } from "./UpgradeInfo.styles";

const UpgradeInfo = ({ open, handleClose }) => {
  return (
    <ModalWrapper visible={open} centered width={744} maskClosable={false} onCancel={handleClose}>
      <div className="content">
        <Picture>
          <img src={LoadingImage} alt="Loading" />
        </Picture>
      </div>
    </ModalWrapper>
  );
};

export default UpgradeInfo;

UpgradeInfo.propTypes = {
  open: PropTypes.bool.isRequired,
};
