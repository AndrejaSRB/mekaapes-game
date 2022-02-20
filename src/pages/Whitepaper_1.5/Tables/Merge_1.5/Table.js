// ******** Styles ********
import { Table, Headline, Body, Cell } from "./Table.styles";

const UpgradeTable = () => (
  <Table>
    <Headline>
      <div className="empty">Level</div>
      <div className="middle">$OG tax proportion</div>
      <div className="middle">Gifted Mints proportion</div>
      <div className="middle">Crew numbers</div>
      <div className="full">Crew Multiplier</div>
    </Headline>
    <Body>
      <Cell>
        <div className="smaller">MekaApe</div>
        <div className="medium">1x</div>
        <div className="medium">No gifted Mints</div>
        <div className="medium">2 Robo Oogas</div>
        <div className="bigger">No Multiplier</div>
      </Cell>

      <Cell>
        <div className="smaller">Mega <br/> Meka M1</div>
        <div className="medium">2x</div>
        <div className="medium">1x</div>
        <div className="medium">4 Robo Oogas</div>
        <div className="bigger">1.2x</div>
      </Cell>

      <Cell>
        <div className="smaller">Mega <br/> Meka M2</div>
        <div className="medium">2.8x</div>
        <div className="medium">1.4x</div>
        <div className="medium">5 Robo Oogas</div>
        <div className="bigger">1.4x</div>
      </Cell>

      <Cell>
        <div className="smaller">Mega <br/> Meka M3</div>
        <div className="medium">3.6x</div>
        <div className="medium">1.8x</div>
        <div className="medium">6 Robo Oogas</div>
        <div className="bigger">2x</div>
      </Cell>

    </Body>
  </Table>
);

export default UpgradeTable;
