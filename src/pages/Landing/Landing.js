import { useNavigate } from "react-router-dom";
// ******** Styled ********
import { Title, Wrapper } from "./Landing.styles";

const Landing = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/game");
  };

  const handleMinting = () => {
    navigate("/minting");
  };

  return (
    <div>
      <Title>Welcome !</Title>
      <Wrapper>
        <button onClick={handleMinting}>Minting</button>
        <button onClick={handleStartGame}>Start a Game</button>
      </Wrapper>
    </div>
  );
};

export default Landing;
