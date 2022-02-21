// ******** Styles ********
import { Table, Headline, Body, Cell } from "./Table.styles";

const UpgradeTable = () => (
  <Table>
    <Headline>
      <div className="empty">Level</div>
      <div className="middle">Position</div>
      <div className="middle">$OG per day</div>
      <div className="middle">$DMT price</div>
      <div className="full"> $OG price</div>
    </Headline>
    <Body>
      <Cell>
        <div className="smaller">1</div>
        <div className="medium">Scrap Scout</div>
        <div className="medium">100</div>
        <div className="medium"></div>
        <div className="bigger"></div>
      </Cell>
      <Cell>
        <div className="smaller">2</div>
        <div className="medium">Garbage Compactor</div>
        <div className="medium">200</div>
        <div className="medium">100 $DMT</div>
        <div className="bigger">400 $OG + Burn 1 Robo Ooga</div>
      </Cell>
      <Cell>
        <div className="smaller">3</div>
        <div className="medium">Factory Worker</div>
        <div className="medium">400</div>
        <div className="medium">125 $DMT</div>
        <div className="bigger">800 $OG + Burn 1 Robo Ooga</div>
      </Cell>
      <Cell>
        <div className="smaller">4</div>
        <div className="medium">Executive Bot</div>
        <div className="medium">700</div>
        <div className="medium">150 $DMT</div>
        <div className="bigger">1,400 $OG + Burn 1 Robo Ooga</div>
      </Cell>
      <Cell>
        <div className="smaller">5</div>
        <div className="medium">Degen</div>
        <div className="medium">1,200</div>
        <div className="medium">200 $DMT</div>
        <div className="bigger">2,400 $OG + Burn 1 Robo Ooga</div>
      </Cell>
      <Cell>
        <div className="smaller">6</div>
        <div className="medium">Super Elite</div>
        <div className="medium">2,000</div>
        <div className="medium">250 $DMT</div>
        <div className="bigger">4,000 $OG + Burn 1 Robo Ooga</div>
      </Cell>
    </Body>
  </Table>
);

export default UpgradeTable;
