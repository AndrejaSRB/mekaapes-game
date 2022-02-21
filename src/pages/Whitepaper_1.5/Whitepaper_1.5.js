// ******** Components ********
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CreditsTable from "./Tables/CreditsTable";
import MekaCrews from "./Tables/MekaCrews";
import CraftingTable from "./Tables/Crafting_1.5/Table";
import UpgradeTable from "./Tables/Upgrade_1.5/Table";
import MergeTable from "./Tables/Merge_1.5/Table";
// ******** Images ********
import WhitepaperArticleImage from "../../assets/whitepaper-image.png";
import TheFactory from "../../assets/factory_animation.gif";
import TheCrafting from "../../assets/crafting_animation.gif";
import MergeWhitepaper from "../../assets/merge_whitepaper.png";
import EvolveBaby from "../../assets/level_up.gif";
import OGToken from "../../assets/og_token.png";
import Logo from "../../assets/logo.svg";
// ******** Styles ********
import {
  Wrapper,
  Title,
  Content,
  MainBox,
  TitleBox,
  WhitepaperContent,
  BoxContent,
  BoxImage,
  Separator,
  Table,
  Headline,
  LogoWrapper,
  Space,
} from "./Whitepaper_1.5.styles";

const Whitepaper1_5 = () => {
  return (
    <Wrapper>
      <Header page="whitepaper" />
      <Content>
        <Title>MekaApes Whitepaper 1.5</Title>
        <MainBox>
          <TitleBox>
            <h4>Stage 1.5 Launch Feb 27th</h4>
          </TitleBox>
          <WhitepaperContent>
            <p>
              After a wildly successful stage 1, with 55,000 Robos and Mekas
              crafted within 19 days, OogaVerse are delighted to bring you the
              next chapter of the MekaApes Game. Whilst the team are busy
              finalising the PvP and PvE mechanics for Stage 2, we move into
              Stage 1.5 which will continue with the popular play to earn
              mechanics, but adding burning and levelling up of Robo Oogas with
              $OG.
            </p>
            <p>
              In order to deliver this we introduce the concept of Meka Crews,
              which changes the way $OG is produced. Stage 1.5 brings new
              utility for $OG, but this is just the beginning and Stage 2 will
              expand $OG use case and utility into a revolutionary pvp
              environment. Watch this space for more detail on Stage 2 dropping
              soon!
            </p>
            <p>
              <i>
                n.b The nature of play to earn mechanics are fast moving and all
                figures/numbers mentioned here may be subject to alteration
                prior to, or during Stage 1.5. This is to ensure maximum
                effectiveness of gameplay and the longevity of the Stage.
              </i>
            </p>
            <BoxImage>
              <img src={WhitepaperArticleImage} alt="Meka Apes" />
            </BoxImage>
            <h4>Stage 1.5 Change Log tl:dr</h4>
            <ul>
              <li>Meka Crews are the new primary way to produce $OG</li>
              <li>
                Mega Mekas can recruit more Robo Oogas to their Meka Crew, and
                benefit from a Crew Multiplier to all $OG produced in the Meka
                Crew
              </li>
              <li>
                Robo Oogas and MekaApes staked in the Factory still earn $OG
              </li>
              <li>
                Crafting will Continue. The chance to craft a MekaApe is reduced
                from 10% to 5%
              </li>
              <li>
                Mega Mekas staked in the Factory are still gifted new mints
              </li>
              <li>There is no $OG required to unstake Robos in the Factory</li>
              <li>To unstake Robo Oogas you need to use Unstaking Credits</li>
              <li>You gain Unstaking Credits by burning Robo Oogas</li>
              <li>
                There is a new Robo Ooga Upgrade system with two new Robo Levels
              </li>
              <li>
                The cost to Meka Merge is increasing from 2,000 $OG to 20,000
                $OG
              </li>
            </ul>
            <Separator>
              <span>.</span> <span>.</span> <span>.</span>
            </Separator>
            <BoxContent align="left">
              <Headline>
                <div className="content">
                  <h4>The Factory</h4>
                  <p>
                    With Stage 1.5 the concept of the factory changes. Robo
                    Oogas staked in the Factory continue to earn $OG, but
                    primarily as part of a Meka Crew.
                  </p>
                </div>
                <div className="image">
                  <img src={TheFactory} alt="The Factory" />
                </div>
              </Headline>
              <h5>Factory Staking</h5>
              <p>
                Every Robo Ooga in the Factory that is not in a Meka Crew,
                regardless of its Robo Level, starts by producing 20 $OG a day.
                For every day a Robo Ooga is staked in the factory, it becomes
                more productive and produces an additional 5 $OG each day, until
                it reaches a limit of 200 $OG per day. The Robos continue to
                produce 200 $OG a day until the $OG is claimed. After claiming
                $OG, the Robos productivity gets reset to 20 $OG a day.
              </p>

              <h5>Factory $OG Claiming</h5>
              <p>
                When you claim $OG from a Robo Ooga you pay a 23% tax to any
                MekaApes that are staked in the factory but not in a Meka Crew.
              </p>
              <p>
                23% of all $OG produced is distributed between all MekaApes
                staked in the Factory, who are not in a crew. Merged MekaApes
                receive a bigger share of $OG depending on their Mega Level.
                Mega Mekas staked in the factory, but not in a Meka Crew, also
                get gifted newly crafted Robo Oogas and MekaApes as a tribute.
              </p>

              <h5>Factory Unstaking</h5>
              <p>
                Unstaking Robo Oogas from the Factory doesn’t require a
                claimable $OG amount anymore. You can unstake Robo Oogas at any
                time, regardless of how much $OG they’ve accumulated. However,
                to unstake Robo Oogas in Stage 1.5 you will need{" "}
                <b>Unstaking Credits</b>.
              </p>
              <p>
                At the beginning of Stage 1.5 everyone starts with 5 Unstaking
                Credits. Additional Unstaking Credits are gained by burning Robo
                Oogas. Burning of Robo Ooga earns you credits as follows
              </p>
              <CreditsTable />
              <p>
                Unstaking Robo Oogas will require one staking credit per Robo
                Ooga. If you are unstaking multiple Robo Oogas you will need an
                unstaking credit for each one. If you do not have any unstaking
                credits you will need to burn a Robo to receive a credit and
                then use the credit to unstake. Unstaking MekaApes does not
                require any Unstaking Credits.
              </p>
            </BoxContent>

            <h4>Meka Crews</h4>
            <p>
              In your factory you’ll find a new Tab called <b>Meka Crews</b>.
              Meka Crews are the primary way to produce $OG in Stage 1.5. Each
              Meka Crew is led by a Meka and contains a number of Robos
              according to the level of Meka. Mega Mekas can have more Robo
              Oogas in a Crew and receive a Crew multiplier of the $OG
              production of the crew. The higher the Mega level, the more Robo
              Oogas can join a crew and the higher the $OG multiplier.
            </p>
            <MekaCrews />
            <p>
              Create a Meka Crew by selecting a staked MekaApe in the Factory.
              Depending on the Meka Level, you then select Robo Oogas to join
              the crew. You do not need to fill up all the Robo spots on the
              crew. For example, if you create a Meka Crew with an M2 Mega
              MekaApe, you can select up to 5 Robo Oogas, or any amount of Robos
              between 1-5. You are always able to add and remove Robo Oogas from
              a Meka Crew. To add a Robo Ooga to a Meka Crew it must be staked
              in the Factory. Removing a Robo Ooga from a Meka Crew will send
              the Robo back to the Factory, where they will be staked and
              crewless.
            </p>
            <p>
              The $OG is accumulated <b>per crew</b> and not per Robo Ooga. You
              can claim all crew $OG from a Meka Crew whenever you want, with no
              tax and no risk.
            </p>
            <p>
              Robos in a Meka Crew with a basic Meka will earn according to
              their level. Please see Robo Ooga Upgrade section
            </p>

            <Space />
            <BoxContent align="left">
              <Headline>
                <div className="image desktop">
                  <img src={TheCrafting} alt="The Factory" />
                </div>
                <div className="content">
                  <h4>Crafting</h4>
                  <p>
                    Crafting continues in Stage 1.5 and we will monitor both
                    crafting and burn rates. As we introduce further use cases
                    for $OG we may well slow or stop the crafting of new Robos
                    and Mekas altogether. We need the original supply of Robos
                    and Mekas for Stage 2 and we will carefully manage the
                    situation to ensure we have the original 55k to take into
                    Stage 2.
                  </p>
                </div>
                <div className="image mobile">
                  <img src={TheCrafting} alt="The Factory" />
                </div>
              </Headline>
              <p>
                With $OG and $DMT crafting, the new mints will be automatically
                staked in the Factory.
              </p>
              <Table>
                <CraftingTable />
              </Table>
            </BoxContent>

            <BoxContent>
              <Headline>
                <div className="content full">
                  <h4>Robo Ooga Upgrade</h4>
                  <p>
                    Robo Oogas that are part of a Meka Crew, produce more $OG
                    when they are upgraded. You can upgrade Robo Oogas by using
                    $OG and burning 1 Robo Ooga for each level up.
                    Alternatively, you can use $DMT to level up without the need
                    to burn a Robo for each level up. With Stage 1.5 we
                    introduce two new Robo Ooga levels.
                  </p>
                </div>
              </Headline>
              <Table>
                <UpgradeTable />
              </Table>
              <p>
                Levelling up can be done in one transaction. For example, you
                can upgrade a basic Robo to level 3 by burning 1200 $OG and 2
                Robos in one gas efficient transaction.
              </p>
            </BoxContent>

            <BoxContent>
              <Headline>
                <div className="content full">
                  <h4>Meka Merge</h4>
                  <p>
                    MekaApes receive 23% of all the $OG that is produced in the
                    Factory. To increase their ability to guard the factory,
                    MekaApes can merge to become Mega Mekas. Mega Mekas get a
                    proportionally bigger share of the $OG produced in the
                    factory. Additionally, Mega Mekas that are staked in the
                    factory, but not in a Meka Crew, are gifted newly crafted
                    Robo Oogas and MekaApes.
                  </p>
                  <p>
                    There are 3 Mega Levels M1, M2 and M3, with M3 being the
                    rarest. Merge two MekaApes to receive a random Mega Level.
                    The higher the level the larger the share of $OG tax is
                    earnt. A higher Level also receives proportionally more
                    newly crafted Robo Oogas and MekaApes as a tribute. Merging
                    costs 20,000 $OG.
                  </p>
                  <p>
                    As mentioned above a Mega MekaApe can have more Robo Oogas
                    in a Crew and has a higher Crew multiplier the higher the
                    Meka level.
                  </p>
                </div>
              </Headline>
              <Table>
                <MergeTable />
              </Table>
              <BoxImage>
                <img src={MergeWhitepaper} alt="Meka Merge" />
              </BoxImage>
            </BoxContent>

            <BoxContent>
              <Headline>
                <div className="content">
                  <h4>Baby Ooga Transformation</h4>
                  <p>
                    All Baby Oogas, from the OogaVerse collection, can transform
                    into a MekaApes. You claim one MekaApe per Baby Ooga, and
                    you keep the Baby Ooga. As incubators and revealed babies
                    can claim a Meka Ape, please check the claim section on the
                    Oogaverse website to see if a baby/incubator has already
                    claimed a Meka{" "}
                    <a
                      href="https://app.oogaverse.com/claim"
                      target="_blank"
                      rel="noreferrer">
                      https://app.oogaverse.com/claim
                    </a>{" "}
                  </p>
                </div>
                <div className="image">
                  <img src={EvolveBaby} alt="Baby Ooga Transformation" />
                </div>
              </Headline>
            </BoxContent>

            <BoxContent align="left">
              <Headline>
                <div className="image desktop">
                  <img src={OGToken} alt="The Factory" />
                </div>
                <div className="content">
                  <h4>$OG</h4>
                  <p>
                    For $OG there’s no max supply at the moment since $OG
                    earning through the Factory and Meka Crews will continue
                    until the launch of Stage 2. Our next step, after the launch
                    of Stage 1.5, is to continue to implement new $OG use cases
                    to add further utility to the token.
                  </p>
                </div>
                <div className="image mobile">
                  <img src={OGToken} alt="The Factory" />
                </div>
              </Headline>
            </BoxContent>
            <LogoWrapper>
              <img src={Logo} alt="Meka Apes Logo" />
            </LogoWrapper>
          </WhitepaperContent>
        </MainBox>
      </Content>
      <Footer page="whitepaper" />
    </Wrapper>
  );
};

export default Whitepaper1_5;
