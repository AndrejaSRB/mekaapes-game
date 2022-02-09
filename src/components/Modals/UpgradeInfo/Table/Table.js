// ******** Styles ********
import { Table, Headline, Body, Cell } from "./Table.styles";

const UpgradeTable = () => (
  <Table>
    <Headline>
      <div className="empty">Level</div>
      <div className="middle">Position</div>
      <div className="full">Productivity</div>
      <div className="full">+ Feature</div>
    </Headline>
    <Body>
      <Cell>
        <div className="smaller">1</div>
        <div className="medium">Scrap Scout</div>
        <div className="bigger">Produce 200 $OG per day</div>
        <div className="bigger"></div>
      </Cell>
      <Cell>
        <div className="smaller">2</div>
        <div className="medium">Garbage <span>Compactor</span></div>
        <div className="bigger">
          <span>+ 25% </span>more $OG <br/>(250 $OG per day)
        </div>
        <div className="bigger">
          Decrease the risk of $OG getting stolen to 25% when unstaking
        </div>
      </Cell>
      <Cell>
        <div className="smaller">3</div>
        <div className="medium">Factory Worker</div>
        <div className="bigger">
          <span>+ 50%</span> more $OG <br/>(300 $OG per day)
        </div>
        <div className="bigger">Decrease the unstaking time by 25%</div>
      </Cell>
      <Cell>
        <div className="smaller">4</div>
        <div className="medium">Executive Bot</div>
        <div className="bigger">
          <span>+ 100%</span> more $OG <br/>(400 $OG per day)
        </div>
        <div className="bigger"></div>
      </Cell>
    </Body>
  </Table>
);

export default UpgradeTable;
