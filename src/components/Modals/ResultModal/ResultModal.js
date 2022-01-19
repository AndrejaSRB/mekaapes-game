import { useEffect, useState } from "react";
import PropTypes from "prop-types";
// ******** Functions ********
import { beautifyNumber } from "../../../pages/Game/Factory/helper";
// ******** Styles ********
import {
  ModalWrapper,
  Title,
  ButtonWrapper,
  List,
  Text,
} from "./ResultModal.styles";

const ResultModal = ({ open, handleClose, tokens }) => {
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (tokens?.length > 0) {
      setMessageType(tokens[0]?.type);
    }
  }, [tokens]);

  const getFixedValue = (amount) => amount && beautifyNumber(amount);

  const getMessage = (token) => {
    if (token?.type === "crafting") {
      if (token.stolen === null) {
        return (
          <Text>{`You successfully minted ${token.name} #${token.id}!`}</Text>
        );
      } else {
        return (
          <Text>{`${token.name} #${token.id} was gifted to MekaApe #xxxx!`}</Text>
        );
      }
    } else if (token?.type === "evolve") {
      return `You successfully claimed MekaApe #${token.id}!`;
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
    }
  };

  const getUnstakeMessage = () => {
    if (tokens?.length > 1) {
      return (
        <>
          <List>{renderTokens()}</List>
        </>
      );
    } else {
      if (tokens?.length > 0) {
        return tokens.map((token) => (
          <Text key={token.id}>{getMessage(token)}</Text>
        ));
      }
    }
  };

  const getCraftingMessage = () => {
    if (tokens?.length > 1) {
      return (
        <>
          <Text>{`You successfully claimed:`}</Text>
          <List>{renderTokens()}</List>
        </>
      );
    } else {
      if (tokens?.length > 0) {
        return tokens.map((token) => {
          if (token.stolen === null) {
            return (
              <Text
                white
                key={
                  token.id
                }>{`You successfully minted ${token.name} #${token.id}!`}</Text>
            );
          } else {
            return (
              <Text
                white
                key={
                  token.id
                }>{`${token.name} #${token.id} was gifted to MekaApe #${token.stolenApeId}!`}</Text>
            );
          }
        });
      }
    }
  };

  const getClaimMessage = () => {
    if (tokens?.length > 0) {
      return tokens.map((token) => (
        <Text white key={token.id}>{`You successfully claimed ${beautifyNumber(
          token.amount
        )} $OG after all taxes.`}</Text>
      ));
    }
  };

  const getMergeMessage = () => {
    if (tokens?.length > 0) {
      return tokens.map((token) => (
        <Text
          white
          key={
            token.id
          }>{`MekaApe #${token.id} received Mega Level ${token.level}`}</Text>
      ));
    }
  };

  const getUpgradeMessage = () => {
    if (tokens?.length > 0) {
      return tokens.map((token) => (
        <Text
          white
          key={
            token.id
          }>{`Robo Ooga #${token.id} reached level ${token.level}`}</Text>
      ));
    }
  };

  const getEvolveMessage = () => {
    if (tokens?.length > 1) {
      return (
        <>
          <Text>{`You successfully claimed:`}</Text>
          <List>{renderTokens()}</List>
        </>
      );
    } else {
      if (tokens?.length > 0) {
        return tokens.map((token) => (
          <Text
            white
            key={
              token.id
            }>{`You successfully claimed MekaApe #${token.id}!`}</Text>
        ));
      }
    }
  };

  const renderTokens = () => {
    if (tokens?.length > 0) {
      return tokens.map((token) => <li key={token.id}>{getMessage(token)}</li>);
    }
  };

  const renderText = () => {
    switch (messageType) {
      case "evolve":
        return (
          <>
            <Title>Congratulations!</Title>
            {getEvolveMessage()}
          </>
        );
      case "merge":
        return (
          <>
            <Title>Congratulations!</Title>
            {getMergeMessage()}
          </>
        );
      case "claim":
        return (
          <>
            <Title>Payday!</Title>
            {getClaimMessage()}
          </>
        );
      case "crafting":
        return (
          <>
            <Title>Congratulations!</Title>
            {getCraftingMessage()}
          </>
        );
      case "unstake":
        return <>{getUnstakeMessage()}</>;
      case "upgrade":
        return (
          <>
            <Title>Congratulations!</Title>
            {getUpgradeMessage()}
          </>
        );
      default:
        break;
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
        {renderText()}
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
  tokens: PropTypes.array.isRequired,
};
