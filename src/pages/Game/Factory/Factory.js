import { useState } from "react";
// ******** Components ********
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
// ******** HOC ********
import withConnect from "../../../hoc/withConnect";
// ******** Images ********
import HeroImage from "../../../assets/landing-image.png";
import MekaApe from "../../../assets/meka-ape-landing.png";
import PlaceholderApe from "../../../assets/placeholder_ape.png";
// ******** Styles ********
import {
  Wrapper,
  Title,
  Content,
  MainBox,
  MobileBoxHeader,
  Unstaked,
  NftList,
  Nft,
  Button,
  NotFoundItem,
  HelperText,
  Staked,
  CustomCheckbox,
  ApeList,
  ApeNft,
  NftBox,
  ClaimAndUnstakeButton,
  MiddleBox,
  TitleBox,
  Boxes,
  StakedText,
  ApeListDesktop,
  CustomUnstakeCheckbox,
  Subtitle,
} from "./Factory.styles";

const NoItemFound = () => (
  <NotFoundItem>
    <img src={PlaceholderApe} alt="placeholder" />
    <p>No items found!</p>
  </NotFoundItem>
);

// TODO
// Add placeholders if the STAKED box is not full
// Add select all for Robo and Meka APe

const Factory = () => {
  const [checkedStaked, setCheckedStaked] = useState(false);
  const [checkedUnstakedMeka, setCheckedUnstakedMeka] = useState(false);
  const [checkedUnstakedRobo, setCheckedUnstakedRobo] = useState(false);

  const hadnleChangeStakedCheckbox = (e) => {
    setCheckedStaked(e.target.checked);
  };

  const hadnleChangeUnstakedMekaCheckbox = (e) => {
    setCheckedUnstakedMeka(e.target.checked);
  };

  const hadnleChangeUnstakedRoboCheckbox = (e) => {
    setCheckedUnstakedRobo(e.target.checked);
  };

  return (
    <Wrapper>
      <Header page="game" />
      <Content>
        <Title>Guard the factory</Title>
        <MainBox>
          <TitleBox>
            <h4>Guard the factory!</h4>
            <h6>(Stake) to earn $DMT</h6>
          </TitleBox>
          <MobileBoxHeader>
            <div>
              <img src={HeroImage} alt="Factory Robo" />
            </div>
            <p>
              <span>$OOGEAR Balance:</span> 1,000,000,000
            </p>
            <p>
              <span>$DMT Balance:</span> 1,000,000
            </p>
          </MobileBoxHeader>
          <Boxes>
            <Unstaked>
              <h5>Unstaked</h5>
              <Subtitle>
                <h6 className="robo">Robo Oogas:</h6>
                <CustomUnstakeCheckbox
                  onChange={hadnleChangeUnstakedRoboCheckbox}
                  checked={checkedUnstakedRobo}>
                  Select All:
                </CustomUnstakeCheckbox>
              </Subtitle>
              <NftList lenght={5}>
                <Nft selected>
                  <img src={HeroImage} alt="Robo Ooga" />
                </Nft>
                <Nft>
                  <img src={HeroImage} alt="Robo Ooga" />
                </Nft>
                <Nft>
                  <img src={HeroImage} alt="Robo Ooga" />
                </Nft>
                <Nft>
                  <img src={HeroImage} alt="Robo Ooga" />
                </Nft>
                <Nft>
                  <img src={HeroImage} alt="Robo Ooga" />
                </Nft>
              </NftList>
              <Subtitle>
                <h6 className="meka">MekaApe:</h6>
                <CustomUnstakeCheckbox
                  onChange={hadnleChangeUnstakedMekaCheckbox}
                  checked={checkedUnstakedMeka}>
                  Select All:
                </CustomUnstakeCheckbox>
              </Subtitle>
              <NftList lenght={0}>
                <NoItemFound />
              </NftList>
              <Button>Stake and Guard!</Button>
              <HelperText>Select your NFTs to Claim</HelperText>
            </Unstaked>
            <MiddleBox>
              <img src={HeroImage} alt="hero ape" />
              <p>
                <span>$OOGEAR Balance:</span> 1,000,000,000
              </p>
              <p>
                <span>$DMT Balance:</span> 1,000,000
              </p>
            </MiddleBox>
            <Staked>
              <h5>Staked</h5>
              <div className="subtitle">
                <h6>Guard the factory:</h6>
                <CustomCheckbox
                  onChange={hadnleChangeStakedCheckbox}
                  checked={checkedStaked}>
                  Select All:
                </CustomCheckbox>
              </div>
              <ApeList>
                <NftBox lenght={1}>
                  <ApeNft selected>
                    <img src={MekaApe} alt="Robo Ooga" />
                    <div>
                      <span>312.08</span>
                    </div>
                  </ApeNft>
                  <ApeNft>
                    <img src={MekaApe} alt="Robo Ooga" />
                    <div>
                      <span>312.08</span>
                    </div>
                  </ApeNft>
                  <ApeNft>
                    <img src={MekaApe} alt="Robo Ooga" />
                    <div>
                      <span>8210.12</span>
                    </div>
                  </ApeNft>
                  <ApeNft>
                    <img src={MekaApe} alt="Robo Ooga" />
                    <div>
                      <span>312.08</span>
                    </div>
                  </ApeNft>
                  <ApeNft>
                    <img src={MekaApe} alt="Robo Ooga" />
                    <div>
                      <span>312.08</span>
                    </div>
                  </ApeNft>
                  <ApeNft>
                    <img src={MekaApe} alt="Robo Ooga" />
                    <div>
                      <span>312.08</span>
                    </div>
                  </ApeNft>
                </NftBox>
                <NftBox>
                  <ApeNft>
                    <img src={MekaApe} alt="Robo Ooga" />
                    <div>
                      <span>312.08</span>
                    </div>
                  </ApeNft>
                  <ApeNft>
                    <img src={MekaApe} alt="Robo Ooga" />
                    <div>
                      <span>312.08</span>
                    </div>
                  </ApeNft>
                  <ApeNft>
                    <img src={MekaApe} alt="Robo Ooga" />
                    <div>
                      <span>312.08</span>
                    </div>
                  </ApeNft>
                  <ApeNft>
                    <img src={MekaApe} alt="Robo Ooga" />
                    <div>
                      <span>312.08</span>
                    </div>
                  </ApeNft>
                </NftBox>
              </ApeList>
              <ApeListDesktop>
                <ApeNft selected>
                  <img src={MekaApe} alt="Robo Ooga" />
                  <div>
                    <span>312.08</span>
                  </div>
                </ApeNft>
                <ApeNft>
                  <img src={MekaApe} alt="Robo Ooga" />
                  <div>
                    <span>312.08</span>
                  </div>
                </ApeNft>
                <ApeNft>
                  <img src={MekaApe} alt="Robo Ooga" />
                  <div>
                    <span>312.08</span>
                  </div>
                </ApeNft>
                <ApeNft>
                  <img src={MekaApe} alt="Robo Ooga" />
                  <div>
                    <span>312.08</span>
                  </div>
                </ApeNft>
                <ApeNft>
                  <img src={MekaApe} alt="Robo Ooga" />
                  <div>
                    <span>312.08</span>
                  </div>
                </ApeNft>
                <ApeNft>
                  <img src={MekaApe} alt="Robo Ooga" />
                  <div>
                    <span>312.08</span>
                  </div>
                </ApeNft>
                <ApeNft>
                  <img src={MekaApe} alt="Robo Ooga" />
                  <div>
                    <span>312.08</span>
                  </div>
                </ApeNft>
                <ApeNft>
                  <img src={PlaceholderApe} alt="Robo Ooga" />
                </ApeNft>
                <ApeNft>
                  <img src={PlaceholderApe} alt="Robo Ooga" />
                </ApeNft>
                <ApeNft>
                  <img src={PlaceholderApe} alt="Robo Ooga" />
                </ApeNft>
                <ApeNft>
                  <img src={PlaceholderApe} alt="Robo Ooga" />
                </ApeNft>
                <ApeNft>
                  <img src={PlaceholderApe} alt="Robo Ooga" />
                </ApeNft>
              </ApeListDesktop>
              <Button claim>Claim $OOGEAR</Button>
              <ClaimAndUnstakeButton disabled>
                Claim $OOGEAR <span>and Unstake</span>
              </ClaimAndUnstakeButton>
              <StakedText>
                <p>
                  Unclaimed: <span>1000 $OOGEAR</span>
                </p>
                <p>Select your DMT to claim rewards!</p>
              </StakedText>
            </Staked>
          </Boxes>
        </MainBox>
      </Content>
      <Footer page="game" />
    </Wrapper>
  );
};

export default withConnect(Factory, "/game/factory");
