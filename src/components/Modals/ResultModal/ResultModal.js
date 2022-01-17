import PropTypes from "prop-types";
// ******** Styles ********
import {
  ModalWrapper,
  Title,
  ButtonWrapper,
  List,
  Text,
} from "./ResultModal.styles";

const ResultModal = ({ open, handleClose, tokens, title }) => {
  const getMessage = (token) => {
    if (token?.type === "claim") {
      return `You received ${token.amount} $OG from ${token.name}`;
    } else if (token?.type === "crafting") {
      return `${token.name} #${token.id}  ${
        token.stolen === null ? "" : "but your token has been stolen"
      }`;
    } else if (token?.type === "evolve") {
      return `Meka Ape #${token.id}`;
    } else if (token?.type === "merge") {
      return `Mega Meka #${token.id}`;
    } else {
      return "";
    }
  };

  const renderTokens = () => {
    if (tokens?.length > 0) {
      return tokens.map((token) => <li key={token.id}>{getMessage(token)}</li>);
    }
  };

  return (
    <ModalWrapper
      visible={open}
      centered
      width={744}
      maskClosable={false}
      onCancel={handleClose}>
      <div className="content">
        <Title>{title}</Title>
        <Text>Here's the list of new tokens:</Text>
        <List>{renderTokens()}</List>
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
  title: PropTypes.string.isRequired,
  tokens: PropTypes.array.isRequired,
};

/* <li>Robo Ooga #43 left the factory and you received 744.43 $OG.</li> */

// Robo Ooga #12771 left the factory, but all its $OG was stolen!
