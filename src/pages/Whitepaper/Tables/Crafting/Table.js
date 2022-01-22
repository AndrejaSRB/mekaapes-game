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
        <div className="smaller">How To Earn?</div>
        <div className="bigger">
          Earn $OG by staking Robo Oogas and MekaApes in the Factory
        </div>
        <div className="bigger">
          Yield $DMT passively by holding a Genesis Ooga. No staking needed.
        </div>
      </Cell>
      <Cell>
        <div className="smaller">Crafting Price</div>
        <div className="bigger">
          In the beginning minting costs 4,000 $OG but it gets more expensive
          over time. For every 4000th mint the $OG mint price increases by 1,000
          $OG.
        </div>
        <div className="bigger">
          Price: 120 $DMT
          <br />
          <br />
          (Crafting with $DMT is limited to 10,000 Robo Oogas)
        </div>
      </Cell>
      <Cell>
        <div className="smaller">Crafting Chance</div>
        <div className="bigger">
          90% Robo Ooga
          <br />
          10% MekaApe
        </div>
        <div>
          90% Robo Ooga
          <br />
          10% MekaApe
        </div>
      </Cell>
      <Cell>
        <div className="smaller">Crafting Risk</div>
        <div className="bigger">
          10% risk Mint gets gifted to a random MekaApe as a Tribute
        </div>
        <div className="bigger">
          5% risk Mint gets gifted to a random MekaApe as a Tribute
        </div>
      </Cell>
      <Cell>
        <div className="smaller">Craft & Stake</div>
        <div className="bigger">
          “Craft & Stake” to get a 25% discount. (Only with $OG crafting)
        </div>
        <div className="bigger">
          With $DMT crafting you can only “Craft & Stake”. (all mints with $DMT
          will be staked automatically){" "}
        </div>
      </Cell>
    </Body>
  </Table>
);

export default CraftingTable;
