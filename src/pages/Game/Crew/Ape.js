// ******** Styles ********
import { Meka, Robo } from "./Crew.styles";

const Ape = ({ ape, type }) => {
  if (type === "meka") {
    return (
      <Meka>
        <img src={ape.img} alt="Meka" />
      </Meka>
    );
  }else {
    return (
        <Robo>
          <img src={ape.img} alt="Robo" />
        </Robo>
      );
  }
};

export default Ape;
