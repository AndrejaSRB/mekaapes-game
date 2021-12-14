import { useNavigate } from "react-router-dom";

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
      <h1>Welcome !</h1>
      <button onClick={handleMinting}>Minting</button>
      <button onClick={handleStartGame}>Start a Game</button>
    </div>
  );
};

export default Landing;
