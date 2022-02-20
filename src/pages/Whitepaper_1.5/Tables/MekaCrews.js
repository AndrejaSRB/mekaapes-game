// ******** Styles ********
import { SmallTable } from "../Whitepaper_1.5.styles";

const MekaCrews = () => (
  <SmallTable>
    <div className="headline">
      <div className="cell">Mega Level</div>
      <div className="cell">Crew numbers & Multiplier</div>
    </div>
    <div className="body">
      <div className="row">
        <div className="cell">Basic</div>
        <div className="cell">2 Robo Oogas – No Multiplier</div>
      </div>

      <div className="row">
        <div className="cell">M1</div>
        <div className="cell">4 Robo Oogas + 1.2x Multiplier</div>
      </div>

      <div className="row">
        <div className="cell">M2</div>
        <div className="cell">5 Robo Oogas + 1.4x Multiplier</div>
      </div>

      <div className="row">
        <div className="cell">M3</div>
        <div className="cell">6 Robo Oogas + 2x Multiplier</div>
      </div>
    </div>
  </SmallTable>
);

export default MekaCrews;
