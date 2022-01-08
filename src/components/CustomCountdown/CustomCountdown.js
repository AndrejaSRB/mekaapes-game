// ******** Components ********
import Countdown from "react-countdown";
// ******** Styles ********
import { Wrapper, Box, Counter, Title, Text } from "./CustomCountdown.styles";

const END_PRE_SALE_DATE = "2022-01-22T22:00:00.000Z"; // 22.1.2022 23:00:00

const CustomCountdown = () => {
  // Random component
  const Completionist = () => <Text>Pre sale is done!</Text>;

  const renderNumber = (number) => {
    if (number < 10) {
      return `0${number}`;
    } else {
      return number;
    }
  };

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <Counter>
          {days > 0 && (
            <Box>
              <span>{renderNumber(days)}</span>
              <p>Days</p>
            </Box>
          )}
          <Box>
            <span>{renderNumber(hours)}</span>
            <p>Hours</p>
          </Box>
          <Box>
            <span>{renderNumber(minutes)}</span>
            <p>Minutes</p>
          </Box>
          <Box>
            <span>{renderNumber(seconds)}</span>
            <p>Seconds</p>
          </Box>
        </Counter>
      );
    }
  };
  return (
    <Wrapper>
      <Title>Pre sale time remaining</Title>
      <Countdown date={new Date(END_PRE_SALE_DATE)} renderer={renderer} />
    </Wrapper>
  );
};

export default CustomCountdown;
