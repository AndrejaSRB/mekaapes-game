// ******** Styles ********
import { Table, Headline, Body, Cell } from "./Table.styles";

const FactoryTable = () => (
  <Table>
    <Headline>
      <div className="empty"></div>
      <div className="full">Robo Oogas</div>
      <div className="full">MekaApes</div>
    </Headline>
    <Body>
      <Cell>
        <div className="smaller">Staking</div>
        <div className="bigger">
          Every Robo Ooga produces 1,000 $OG a day when staked in the factory
        </div>
        <div className="bigger">
          23% of all $OG produced is distributed between all MekaApes. Merged
          MekaApes receive a bigger share of $OG depending on their Mega Level.
          They also get gifted newly crafted Robo Oogas and MekaApes as a
          tribute.
        </div>
      </Cell>
      <Cell>
        <div className="smaller">Claiming</div>
        <div className="bigger">
          When you claim $OG you pay a 23% tax to MekaApes that protect the
          factory
        </div>
        <div className="bigger">No tax.</div>
      </Cell>
      <Cell>
        <div className="smaller">Unstaking</div>
        <div className="bigger">
          Robo Oogas can only leave the factory when they have at least 6,000
          $OG claimable. Leaving the factory is dangerous and it can happen that
          the Robo Oogas are attacked by evil Space Droids. There’s a 50% risk
          that their accumulated $OG gets stolen. All $OG that gets stolen is
          then retrieved by MekaApes which they keep for their service.
        </div>
        <div className="bigger">No risk.</div>
      </Cell>
    </Body>
  </Table>
);

export default FactoryTable;
