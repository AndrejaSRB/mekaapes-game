// ******** Styles ********
import { Table, Headline, Body, Cell } from "./Table.styles";

const MergeTable = () => (
  <Table>
    <Headline>
      <div className="empty">Level</div>
      <div className="full">$OG tax proportion</div>
      <div className="full">Background</div>
    </Headline>
    <Body>
      <Cell>
        <div className="smaller">MekaApe</div>
        <div className="bigger">1x</div>
        <div className="bigger">Color Gradient</div>
      </Cell>
      <Cell>
        <div className="smaller">Mega Meka M1</div>
        <div className="bigger">2x</div>
        <div className="bigger">Planetary</div>
      </Cell>
      <Cell>
        <div className="smaller">Mega Meka M2</div>
        <div className="bigger">2.8x</div>
        <div className="bigger">Space</div>
      </Cell>
      <Cell>
        <div className="smaller">Mega Meka M3</div>
        <div className="bigger">3.8x</div>
        <div className="bigger">4th Dimension</div>
      </Cell>

    </Body>
  </Table>
);

export default MergeTable;
