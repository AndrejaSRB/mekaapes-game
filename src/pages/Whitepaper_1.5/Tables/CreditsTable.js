// ******** Styles ********
import { SmallTable } from "../Whitepaper_1.5.styles";

const CreditsTable = () => (
  <SmallTable>
    <div className="headline">
      <div className="cell">Burned Robo Ooga</div>
      <div className="cell">Unstaking Credits</div>
    </div>
    <div className="body">
      <div className="row">
        <div className="cell">Level 1</div>
        <div className="cell">5</div>
      </div>

      <div className="row">
        <div className="cell">Level 2</div>
        <div className="cell">6</div>
      </div>

      <div className="row">
        <div className="cell">Level 3</div>
        <div className="cell">7</div>
      </div>

      <div className="row">
        <div className="cell">Level 4</div>
        <div className="cell">8</div>
      </div>

      <div className="row">
        <div className="cell">Level 5</div>
        <div className="cell">9</div>
      </div>

      <div className="row">
        <div className="cell">Level 6</div>
        <div className="cell">10</div>
      </div>
    </div>
  </SmallTable>
);

export default CreditsTable;
