import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// ******** Functions ********
import { beautifyPrice } from "../../pages/Game/Factory/helper";
// ******** Styles ********
import {
  Wrapper,
  Color,
  TotalBox,
  NewColor,
  StatusBarWrapper,
  SmallBox,
} from "./StatusBar.styles";

const TOTAL_AMOUNT = 55000;

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
    let perc = (100 * status) / TOTAL_AMOUNT;
    return perc > 100 ? 100 : perc;
  };

  const newPercentage = () => {
    let currentNumber = 0;
    if (currentNumber) {
      currentNumber = totalNumber - TOTAL_AMOUNT;
    }
    let perc = (100 * currentNumber) / TOTAL_AMOUNT;
    return perc > 100 ? 100 : perc;
  };

  const getCurrentStatus = () => {
    let status = 0;
    if (totalNumber) {
      status = +totalNumber - TOTAL_AMOUNT;
    }
    return status > 0 ? beautifyPrice(status) : "";
  };

  const getExtraCurrentMintingStatus = () => {
    let status = 0;
    if (totalNumber) {
      status = +totalNumber - TOTAL_AMOUNT;
    }
    return status;
  };

  return (
    <StatusBarWrapper>
      <Wrapper>
        <Color width={percentage()} />
        {/* <NewColor width={newPercentage()}>
          <p>{getCurrentStatus()}</p>
        </NewColor> */}
        <SmallBox status={getExtraCurrentMintingStatus()}>
          <NewColor width={newPercentage()} />
          <p>{getCurrentStatus()}</p>
        </SmallBox>
        <TotalBox>
          {beautifyPrice(status > TOTAL_AMOUNT ? TOTAL_AMOUNT : status)}
        </TotalBox>
      </Wrapper>
    </StatusBarWrapper>
  );
};

export default StatusBar;

StatusBar.propTypes = {
  totalNumber: PropTypes.number,
};
