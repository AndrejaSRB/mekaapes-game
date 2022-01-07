import PropTypes from "prop-types";
// ******** Styles ********
import {
  ModalWrapper,
  Title,
  ButtonWrapper,
  List,
} from "./ResultModal.styles";

const ResultModal = ({ open, handleClose }) => {
  return (
    <ModalWrapper
      visible={open}
      centered
      width={744}
      maskClosable={false}
      onCancel={handleClose}>
      <div className="content">
        <Title>And here’s what heppend...</Title>
        <List>
          <li>Robo Ooga #43 left the factory and you received 744.43 $OG.</li>
          <li>Robo Ooga #53 left the factory and you received 1,455.32 $OG.</li>
          <li>
            Robo Ooga #12771 left the factory, but all its $OG was stolen!
          </li>
        </List>
        <ButtonWrapper>
          <button onClick={handleClose}>Close</button>
        </ButtonWrapper>
      </div>
    </ModalWrapper>
  );
};

export default ResultModal;

ResultModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
