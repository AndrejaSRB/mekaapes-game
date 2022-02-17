import PropTypes from "prop-types";
// ******** Icons ********
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
// ******** Styles ********
import { Counter, CounterWrapper, CounterLabel } from "./Upgrade.styles";

const LevelCounter = ({ levelCounter, setLevelCounter, level, keepApe }) => {
  const handleClick = (type) => () => {
    if (keepApe) {
      if (type === "minus" && levelCounter > 1) {
        setLevelCounter(levelCounter - 1);
      } else if (type === "plus") {
        const maxLevels = 6 - +level;
        if (levelCounter < maxLevels) {
          setLevelCounter(levelCounter + 1);
        }
      }
    }
  };

  return (
    <CounterWrapper>
      <CounterLabel>How many levels:</CounterLabel>
      <Counter>
        <div
          className={levelCounter === 1 ? "minus disabled" : "minus"}
          onClick={handleClick("minus")}>
          <MinusOutlined />
        </div>
        <div className="number noselect">{levelCounter}</div>
        <div
          className={levelCounter > 6 - +level ? "plus disabled" : "plus"}
          onClick={handleClick("plus")}>
          <PlusOutlined />
        </div>
      </Counter>
    </CounterWrapper>
  );
};

export default LevelCounter;

LevelCounter.propTypes = {
  levelCounter: PropTypes.number.isRequired,
  setLevelCounter: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
  keepApe: PropTypes.object,
};
