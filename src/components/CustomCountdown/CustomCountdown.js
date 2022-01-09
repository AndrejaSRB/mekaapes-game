import PropTypes from "prop-types";
// ******** Components ********
import Countdown from "react-countdown";
// ******** Styles ********
import {
  Wrapper,
  Counter,
  Title,
  Timer,
  TokenCounter,
  Box,
  EndTitle,
} from "./CustomCountdown.styles";

const END_PRE_SALE_DATE = "2022-01-22T22:00:00.000Z"; // 22.1.2022 23:00:00

const CustomCountdown = ({ getCurrentAmount, setIsPreSaleCompleted }) => {
  const renderNumber = (number) => {
    if (number < 10) {
      return `0${number}`;
    } else {
      return number;
    }
  };

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    setIsPreSaleCompleted(completed);
    if (completed) {
      // Render a completed state
      return (
        <Box>
          <div className="wrapper">
            <Title>Whitelist Sale:</Title>
            <EndTitle>Ended</EndTitle>
          </div>
          <div className="wrapper right">
            <Title>Total Minted:</Title>
            <TokenCounter>{getCurrentAmount()}/10,000</TokenCounter>
          </div>
        </Box>
      );
    } else {
      // Render a countdown
      return (
        <Box>
          <div className="wrapper">
            <Title>Whitelist Sale ends in:</Title>
            <Counter>
              <Timer>
                {days > 0 && renderNumber(days)}
                {days > 0 && <span>d</span>}
                {renderNumber(hours)}
                <span>h</span>
                {renderNumber(minutes)}
                <span>min</span>
                {renderNumber(seconds)}
                <span>sec</span>
              </Timer>
            </Counter>
          </div>
          <div className="wrapper right">
            <Title>Total Minted:</Title>
            <TokenCounter>{getCurrentAmount()}/10,000</TokenCounter>
          </div>
        </Box>
      );
    }
  };
  return (
    <Wrapper>
      <Countdown date={new Date(END_PRE_SALE_DATE)} renderer={renderer} />
    </Wrapper>
  );
};

export default CustomCountdown;

CustomCountdown.propTypes = {
  getCurrentAmount: PropTypes.func.isRequired,
  setIsPreSaleCompleted: PropTypes.func.isRequired,
};
