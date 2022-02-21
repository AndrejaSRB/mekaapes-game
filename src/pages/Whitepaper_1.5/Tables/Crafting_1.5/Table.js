// ******** Styles ********
import { Table, Headline, Body, Cell } from "./Table.styles";

const CraftingTable = () => (
  <Table>
    <Headline>
      <div className="empty">Token</div>
      <div className="full">$OG</div>
      <div className="full">$DMT</div>
    </Headline>
    <Body>
      <Cell>
        <div className="smaller">Can be earned</div>
        <div className="bigger">
          Earn $OG by staking Robo Oogas and MekaApes in the Factory and Meka
          Crews.
        </div>
        <div className="bigger">
          Yield $DMT passively by holding a Genesis Ooga. No staking needed.
        </div>
      </Cell>
      <Cell>
        <div className="smaller">Crafting Price</div>
        <div className="bigger">
          15,000 $OG
          <br />
          <br />
          (We may adjust crafting prices based on the Robo Ooga Supply.)
        </div>
        <div className="bigger">
          Price: 120 $DMT
          <br />
          <br />
          (For now, crafting with $DMT is limited to 20,000 mints)
        </div>
      </Cell>
      <Cell>
        <div className="smaller">Crafting Chance</div>
        <div className="bigger">
          95% Robo Ooga
          <br />
          5% MekaApe
        </div>
        <div>
          95% Robo Ooga
          <br />
          5% MekaApe
        </div>
      </Cell>
      <Cell>
        <div className="smaller">Crafting Risk</div>
        <div className="bigger">
          10% risk of a Mint being gifted to a random Mega Meka as a Tribute
        </div>
        <div className="bigger">
          5% risk of a Mint being gifted to a random Mega Meka as a Tribute
        </div>
      </Cell>
    </Body>
  </Table>
);

export default CraftingTable;
