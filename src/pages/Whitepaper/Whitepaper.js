// ******** Components ********
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FactoryTable from "./Tables/Factory/Table";
import CraftingTable from "./Tables/Crafting/Table";
import UpgradeTable from "./Tables/Upgrade/Table";
// ******** Images ********
import TheFactory from "../../assets/factory_animation.gif";
import TheCrafting from "../../assets/crafting_animation.gif";
import WhitepaperArticleImage from "../../assets/whitepaper-image.png";
import LandingImage from "../../assets/main_landing_animation.gif";
import UpgradeRoboOoga from "../../assets/whitepaper-robo-ooga.png";
import OGToken from "../../assets/og_token.png";
import EvolveBaby from "../../assets/level_up.gif";
import Logo from "../../assets/logo.svg";
// ******** Styles ********
import {
  Wrapper,
  Title,
  Content,
  MainBox,
  TitleBox,
  WhitepaperContent,
  BoxLeft,
  Image,
  BoxText,
  BoxContent,
  BoxImage,
  Separator,
  SmallTable,
  Table,
  Headline,
  LogoWrapper
} from "./Whitepaper.styles";

const Whitepaper = () => (
  <Wrapper>
    <Header page="whitepaper" />
    <Content>
      <Title>MekaApes Whitepaper</Title>
      <MainBox>
        <TitleBox>
          <h4>MekaApes Game Phase 1</h4>
        </TitleBox>
        <WhitepaperContent>
          <p>
            With the upcoming MekaApes Game, OogaVerse introduces exciting new
            game mechanics such as evolution, fusion and a unique levelling-up
            system. These features, combined with the expansive{" "}
            <a
              href="https://opensea.io/collection/oogaverse"
              target="_blank"
              rel="noreferrer">
              OogaVerse collection
            </a>
            , will make MekaApes the most in depth strategy game available on
            the Ethereum blockchain. ​​These are the 3 stages of the MekaApes
            Game:
          </p>
          <h5>Genesis (Stage 1) Launch 22nd of January:</h5>
          <p>
            Craft and collect Robo Oogas and MekaApes and produce $OG (OOGEAR).
          </p>

          <h5>Ascension (Stage 2):</h5>
          <p>
            PvP game on blockchain. Fight other players to receive ingame assets
            like weapons and armor.
          </p>

          <h5>MekaApes War (Stage 3):</h5>
          <p>
            Outstanding ingame experience where you can use your weapons from
            stage 2 to fight your MekaApes in Sandbox.
          </p>
          <p>
            This article contains all information regarding the game mechanics
            of Stage 1. We will publish a further medium article relating to
            Ascension stage 2, once we are nearing the completion of Genesis
            stage 1.
          </p>
          <BoxImage>
            <img src={WhitepaperArticleImage} alt="Meka Apes" />
          </BoxImage>

          <h4>Genesis</h4>
          <p>
            MekaApes are a highly evolved species of Ape that have travelled
            through the cosmos for thousands of years. One day, while searching
            for new resources, they came across a planet that was covered in
            metallic waste. On this planet they discovered small robotic
            creatures , assembled from scrap metal, called the Robo Oogas.
          </p>
          <p>
            Robo Oogas are an industrious breed and have built factories where
            they convert scrap metal into valuable $OG, which is used to craft
            new Robo Oogas and develop the population. Each newly created robo
            starts out as a Scrap Scout, with the ability to level all the way
            up to become an executive bot.
          </p>
          <p>
            Robo Oogas are an extremely capable and independent species.
            However, they face a significant threat: since they are freely
            exposed to the dangers of the universe, they are targets for the
            Space Droid Federation, an evil organization that regularly steals
            the Robos Oogear. In order to protect themselves from the merciless
            Space Droid Federation, the Oogas made a pact with the MekaApes to
            protect the factories from the despicable Droids, in return for
            payment in valuable $OG.
          </p>
          <p>
            The Meka Apes are a powerful race that can protect the factories
            even better if they merge into Mega Mekas. Since merging consumes
            and burns a substantial amount of resources, Mega Mekas receive a
            larger share of the $OG produced in the factory. As a tribute for
            their services in protecting the Robos, the mighty merged Mekas are
            occasionally given newly created Robo Oogas.
          </p>
          <h4>Tl;dr</h4>
          <ul>
            <li>Robo Oogas that are staked in the factory produce $OG</li>
            <li>
              Level-up Robo Oogas using $DMT to make them more productive and
              gain other features ($DMT is only produced by the{" "}
              <a
                href="https://opensea.io/collection/oogaverse"
                target="_blank"
                rel="noreferrer">
                Genesis OogaVerse collection
              </a>
              )
            </li>
            <li>
              MekaApes that protect the factory get a share of all $OG that is
              produced
            </li>
            <li>
              Merge two MekaApes to get a Mega trait that makes your MekaApe
              able to be gifted random Robo Oogas or MekaApe mints
            </li>
            <li>Mint new Robo Oogas using $OG or $DMT</li>
            <li>
              When minting a Robo Ooga there is a 10% chance that you get a
              MekaApe instead of a Robo Ooga
            </li>
            <li>
              Use DMT when minting Robo Oogas to reduce the risk by 50% that the
              mint gets gifted to a random MekaApe. (5% instead of 10%)
            </li>
            <li>
              All Baby Oogas from the Genesis OogaVerse collection can claim a
              MekaApe
            </li>
          </ul>
          <Separator>
            <span>.</span> <span>.</span> <span>.</span>
          </Separator>
          <BoxLeft>
            <Image>
              <img src={LandingImage} alt="MekaApe Game" />
            </Image>
            <BoxText>
              <h4>MekaApes Game Launch (Initial Mint)</h4>
              <p>
                The game launches in January and the first 10,000 NFTs will be
                minted with ETH. There is a 10% chance that you will receive a
                MekaApe and a 90% chance that you get a Robo Ooga.
              </p>
              <SmallTable>
                <div className="cell">
                  <span>Mint Date:</span>
                  <p>January 22nd</p>
                </div>
                <div className="cell">
                  <span>Initial Supply:</span>
                  <p>10,000</p>
                </div>
                <div className="cell">
                  <span>Minting Price:</span>
                  <p>
                    Mint: 0.055 ETH <br />
                    Mint & Stake: 0.04 ETH
                  </p>
                </div>
                <div className="cell">
                  <span>Max Mint:</span>
                  <p>3</p>
                </div>
                <div className="cell">
                  <span className="align-self">Whitelist Sale:</span>
                  <p>
                    2,666 Whitelist Spots in total + Genesis Ooga holders are
                    whitelisted automatically when WL mint starts.{" "}
                  </p>
                </div>
              </SmallTable>
            </BoxText>
          </BoxLeft>

          <BoxContent>
            <Headline>
              <div className="content">
                <h4>The Factory</h4>
                <p>
                  Robo Oogas produce $OG when staked in the Factory. MekaApes
                  that guard the factory get a share of all $OG that’s produced.
                  Staked merged MekaApes also get gifted newly crafted Robo
                  Oogas and MekaApes as a tribute.
                </p>
              </div>
              <div className="image">
                <img src={TheFactory} alt="The Factory" />
              </div>
            </Headline>
            <Table>
              <FactoryTable />
            </Table>
          </BoxContent>

          <BoxContent>
            <Headline>
              <div className="image desktop">
                <img src={TheCrafting} alt="The Factory" />
              </div>
              <div className="content">
                <h4>Crafting</h4>
                <p>
                  The total Supply at the end of Stage 1 will be 55,000 NFTs.
                  After the initial 10,000 NFTs are minted you can mint new Robo
                  Oogas using $OG or $DMT. This feature is called crafting. When
                  crafting Robo Oogas there is a 10% chance that you receive a
                  MekaApe instead of a Robo Ooga. #OOGA!
                </p>
              </div>
              <div className="image mobile">
                <img src={TheCrafting} alt="The Factory" />
              </div>
            </Headline>
            <Table>
              <CraftingTable />
            </Table>
          </BoxContent>
          <BoxContent>
            <Headline>
              <div className="content full">
                <h4>Robo Ooga Upgrade</h4>
                <p>
                  When MekaApes discovered the Robo Oogas they brought a
                  valuable and rare resource called Dark Matter ($DMT). This
                  Dark Matter, taken from the Meka Apes home planet, can be used
                  to level-up Robo Oogas, making them more productive and able
                  to gain enhanced features that are beneficial for the Game.
                  There are 4 different Robo Ooga levels. Each newly created
                  robot starts out as a Scrap Scout, but can level its way up to
                  become an executive bot. Each level up costs 100 $DMT
                </p>
              </div>
            </Headline>
            <BoxImage>
              <img src={UpgradeRoboOoga} alt="Robo Ooga Upgrading" />
            </BoxImage>
            <Table>
              <UpgradeTable />
            </Table>
          </BoxContent>

          <BoxContent>
            <Headline>
              <div className="image desktop">
                <img src={OGToken} alt="Oogear" />
              </div>
              <div className="content">
                <h4>$OG (OOGEAR)</h4>
                <p>The maximal token supply is 1,000,000,000 $OG</p>
                <ul>
                  <li>
                    After <span>420,000,000 $OG</span> are produced in the
                    factory, the $OG production comes to an end
                  </li>
                  <li>
                    After that <span>80,000,000 $OG</span> will be rewarded to
                    the top 420 players in the leaderboard
                  </li>
                  <li>
                    <span>500,000,000 $OG</span> will be minted to the $OG
                    contract for Stage 2 of the game
                  </li>
                </ul>
              </div>
              <div className="image mobile">
                <img src={OGToken} alt="Oogear" />
              </div>
            </Headline>
          </BoxContent>
          <h4>Meka Merge</h4>
          <p>
            MekaApes receive 23% of all the $OG that is produced in the Factory.
            To increase their ability to guard the factory, MekaApes can merge
            to become Mega Mekas. Mega Mekas get a proportionally bigger share
            of the $OG produced in the factory. Additionally, Mega Mekas are
            gifted newly crafted Robo Oogas and MekaApes.
          </p>
          <p>
            There are 3 Mega Levels M1, M2 and M3, with M3 being the rarest.
            Merge two MekaApes to receive a random Mega Level. The higher the
            level the larger the share of $OG tax is earnt. A higher Level also
            receives proportionally more newly crafted Robo Oogas and MekaApes
            as a tribute.
          </p>

          <BoxContent>
            <Headline>
              <div className="content">
                <h4>Baby Ooga Transformation</h4>
                <p>
                  All Baby Oogas from the OogaVerse collection can transform
                  into a MekaApe. You can claim one MekaApe per Baby Ooga. You
                  also keep the Baby Ooga.
                </p>
              </div>
              <div className="image">
                <img src={EvolveBaby} alt="Baby Ooga Transformation" />
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

export default Whitepaper;
