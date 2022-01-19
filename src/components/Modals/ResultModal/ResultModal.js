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
  const getFixedValue = (amount) => amount && (+amount).toFixed(2);

  const getMessage = (token) => {
    if (token?.type === "claim") {
      return `You received ${getFixedValue(token.amount)} $OG from ${
        token.name
      }`;
    } else if (token?.type === "crafting") {
      return `${token.name} #${token.id}  ${
        token.stolen === null ? "" : "but your token has been stolen"
      }`;
    } else if (token?.type === "evolve") {
      return `Meka Ape #${token.id}`;
    } else if (token?.type === "merge") {
      return `Mega Meka #${token.id}`;
    } else if (token?.type === "unstake") {
      let text = `${token.name} left the factory`;
      if (token.stolen) {
        if (token.stolenAmount === token.amount) {
          text = `${token.name} left the factory, but all its $OG was stolen!`;
        } else {
          text = `${
            token.name
          } left the factory and you received ${getFixedValue(
            token.amount
          )} $OG.`;
        }
      } else {
        text = `${token.name} left the factory and you received ${getFixedValue(
          token.amount
        )} $OG.`;
      }
      return text;
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
        <Text>Here's the list of tokens:</Text>
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
