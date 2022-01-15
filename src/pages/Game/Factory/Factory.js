import { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
// ******** Components ********
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
// ******** HOC ********
import withConnect from "../../../hoc/withConnect";
// ******** Hooks ********
import useWindowDimenstions from "../../../hooks/useWindowDimensions";
// ******** Functions ********
import {
  getListLenght,
  getIfSelected,
  handleClickApe,
  handleClickStakedApe,
  arrangeStakedMobileList,
} from "./helper";
// ******** Store ********
import { BalanceContext } from "../../../store/balance-context";
// ******** Images ********
import HeroImage from "../../../assets/factory_animation.gif";
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
  ButtonClaim,
} from "./Factory.styles";
// ******** Fake Data ********
import {
  exampleRoboOogasUnstaked,
  exampleMekaOogasUnstaked,
  exampleStaked,
} from "./data";

const NoItemFound = () => (
  <NotFoundItem>
    <p>No items found!</p>
  </NotFoundItem>
);

// TODO
// Pull tokens
// Pull current amount
// Pull total amount
// Sum total $OG staked tokens to the unclaimed total bellow the unstake button
// Add clicked total sum to the Claim button

const Factory = () => {
  const { dmtBalance, oogearBalance } = useContext(BalanceContext);
  const { width } = useWindowDimenstions();
  const [selectAllStaked, setSelectAllStaked] = useState(false);
  const [selectAllUnstakedMeka, setSelectAllUnstakedMeka] = useState(false);
  const [selectAllUnstakedRobo, setSelectAllUnstakedRobo] = useState(false);

  const [selectedUnstakedRobo, setSelectedUnstakedRobo] = useState([]);
  const [selectedUnstakedMeka, setSelectedUnstakedMeka] = useState([]);
  const [selectedStaked, setSelectedStaked] = useState([]);

  const [stakedData, setStakedData] = useState(null);
  const [minStakedElementNo, setMinStakedElementNo] = useState(6);

  const [totalClaim, setTotalClaim] = useState(0);
  const [totalSelectedClaim, setTotalSelectedClaim] = useState(0);

  // Sum all token claim amount
  useEffect(() => {
    if (exampleStaked && exampleStaked.length > 0) {
      let total = 0;
      exampleStaked.forEach((nft) => {
        total = nft.number + total;
      });
      setTotalClaim(total.toFixed(2));
    } else {
      setTotalClaim(0);
    }
  }, []);

  // Sum selected token claim amount
  useEffect(() => {
    if (selectedStaked && selectedStaked.length > 0) {
      let total = 0;
      selectedStaked.forEach((nft) => {
        total = nft.number + total;
      });
      setTotalSelectedClaim(total.toFixed(2));
    } else {
      setTotalSelectedClaim(0);
    }
  }, [selectedStaked]);

  useEffect(() => {
    if (width < 388) {
      setMinStakedElementNo(6);
    } else if (width < 1200 && width > 900) {
      setMinStakedElementNo(10);
    } else {
      setMinStakedElementNo(6);
    }
  }, [width]);

  useEffect(() => {
    let length = exampleStaked.length;
    let array = [...exampleStaked];
    if (length < minStakedElementNo) {
      let placeholderArray = Array.from(
        { length: minStakedElementNo - length },
        () => ({
          img: PlaceholderApe,
          name: "ape",
          placeholder: true,
          id: uuidv4(),
        })
      );
      array = [...exampleStaked, ...placeholderArray];
    }
    setStakedData(array);
  }, [minStakedElementNo]);

  const hadnleChangeStakedCheckbox = (e) => {
    if (stakedData && stakedData.length > 0) {
      if (!e.target.checked) {
        setSelectedStaked([]);
      } else {
        setSelectedStaked([...stakedData]);
      }
    }
    setSelectAllStaked(e.target.checked);
  };

  const hadnleChangeUnstakedMekaCheckbox = (e) => {
    if (exampleMekaOogasUnstaked && exampleMekaOogasUnstaked.length > 0) {
      if (!e.target.checked) {
        setSelectedUnstakedMeka([]);
      } else {
        setSelectedUnstakedMeka([...exampleMekaOogasUnstaked]);
      }
      setSelectAllUnstakedMeka(e.target.checked);
    }
  };

  const hadnleChangeUnstakedRoboCheckbox = (e) => {
    if (exampleRoboOogasUnstaked && exampleRoboOogasUnstaked.length > 0) {
      if (!e.target.checked) {
        setSelectedUnstakedRobo([]);
      } else {
        setSelectedUnstakedRobo([...exampleRoboOogasUnstaked]);
      }
      setSelectAllUnstakedRobo(e.target.checked);
    }
  };

  const renderUnstakedRobo = () => {
    if (exampleRoboOogasUnstaked && exampleRoboOogasUnstaked.length > 0) {
      return exampleRoboOogasUnstaked.map((robo) => (
        <Nft
          selected={getIfSelected(
            selectAllUnstakedRobo,
            selectedUnstakedRobo,
            robo.id
          )}
          onClick={handleClickApe(
            robo,
            setSelectAllUnstakedRobo,
            selectAllUnstakedRobo,
            setSelectedUnstakedRobo,
            selectedUnstakedRobo
          )}
          key={robo.id}>
          <img src={robo.img} alt={robo.name} />
        </Nft>
      ));
    } else {
      return <NoItemFound />;
    }
  };

  const renderUnstakedMeka = () => {
    if (exampleMekaOogasUnstaked && exampleMekaOogasUnstaked.length > 0) {
      return exampleMekaOogasUnstaked.map((meka) => (
        <Nft
          selected={getIfSelected(
            selectAllUnstakedMeka,
            selectedUnstakedMeka,
            meka.id
          )}
          onClick={handleClickApe(
            meka,
            setSelectAllUnstakedMeka,
            selectAllUnstakedMeka,
            setSelectedUnstakedMeka,
            selectedUnstakedMeka
          )}
          key={meka.id}>
          <img src={meka.img} alt={meka.name} />
        </Nft>
      ));
    } else {
      return <NoItemFound />;
    }
  };

  const renderDesktopStakedApes = () => {
    if (stakedData && stakedData.length > 0) {
      return stakedData.map((ape) => (
        <ApeNft
          key={ape.id}
          selected={
            !ape.placeholder &&
            getIfSelected(selectAllStaked, selectedStaked, ape.id)
          }
          onClick={handleClickStakedApe(
            ape,
            ape.placeholder,
            selectAllStaked,
            setSelectAllStaked,
            selectedStaked,
            setSelectedStaked
          )}>
          <img src={ape.img} alt={ape.name} />
          {!ape.placeholder && (
            <div>
              <span>{ape.number}</span>
            </div>
          )}
        </ApeNft>
      ));
    }
  };

  const renderMobileStakedApes = () => {
    if (stakedData && stakedData.length > 0) {
      let reducedList = arrangeStakedMobileList(stakedData);
      if (reducedList && reducedList.length > 0) {
        return reducedList.map((apeList) => (
          <NftBox lenght={6} key={uuidv4()}>
            {apeList &&
              apeList.length > 0 &&
              apeList.map((ape) => (
                <ApeNft
                  key={ape.id}
                  selected={
                    !ape.placeholder &&
                    getIfSelected(selectAllStaked, selectedStaked, ape.id)
                  }
                  onClick={handleClickStakedApe(
                    ape,
                    ape.placeholder,
                    selectAllStaked,
                    setSelectAllStaked,
                    selectedStaked,
                    setSelectedStaked
                  )}>
                  <img src={ape.img} alt={ape.name} />
                  {!ape.placeholder && (
                    <div>
                      <span>{ape.number}</span>
                    </div>
                  )}
                </ApeNft>
              ))}
          </NftBox>
        ));
      }
    }
  };

  const getIfItsClaimDisabled = () => {
    if (selectedStaked && selectedStaked.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const getIfItsStakeDisabled = () => {
    if (
      (selectedUnstakedMeka && selectedUnstakedMeka.length > 0) ||
      (selectedUnstakedRobo && selectedUnstakedRobo.length > 0)
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Wrapper>
      <Header page="game" />
      <Content>
        <Title>Enter the Factory</Title>
        <MainBox>
          <TitleBox>
            <h4>The Factory</h4>
            <h6>Stake Robo Oogas and MekaApes to earn $OG</h6>
          </TitleBox>
          <MobileBoxHeader>
            <div>
              <img src={HeroImage} alt="Factory Robo" />
            </div>
            <p>
              <span>$OG Balance:</span> {oogearBalance}
            </p>
            <p>
              <span>$DMT Balance:</span> {dmtBalance}
            </p>
          </MobileBoxHeader>
          <Boxes>
            <Unstaked>
              <h5>Unstaked</h5>
              <Subtitle>
                <h6 className="robo">Robo Oogas:</h6>
                <CustomUnstakeCheckbox
                  onChange={hadnleChangeUnstakedRoboCheckbox}
                  checked={selectAllUnstakedRobo}>
                  Select All:
                </CustomUnstakeCheckbox>
              </Subtitle>
              <NftList lenght={getListLenght(exampleRoboOogasUnstaked)}>
                {renderUnstakedRobo()}
              </NftList>
              <Subtitle>
                <h6 className="meka">MekaApes:</h6>
                <CustomUnstakeCheckbox
                  onChange={hadnleChangeUnstakedMekaCheckbox}
                  checked={selectAllUnstakedMeka}>
                  Select All:
                </CustomUnstakeCheckbox>
              </Subtitle>
              <NftList meka lenght={getListLenght(exampleMekaOogasUnstaked)}>
                {renderUnstakedMeka()}
              </NftList>
              <Button type="stake" disabled={getIfItsStakeDisabled()}>
                Stake in Factory!
              </Button>
              <HelperText>Select the NFTs you want to stake</HelperText>
            </Unstaked>
            <MiddleBox>
              <img src={HeroImage} alt="hero ape" />
              <p>
                <span>$OG Balance:</span> {oogearBalance}
              </p>
              <p>
                <span>$DMT Balance:</span> {dmtBalance}
              </p>
            </MiddleBox>
            <Staked>
              <h5>Staked</h5>
              <div className="subtitle">
                <h6>In the Factory:</h6>
                <CustomCheckbox
                  onChange={hadnleChangeStakedCheckbox}
                  checked={selectAllStaked}>
                  Select All:
                </CustomCheckbox>
              </div>
              <ApeList>{renderMobileStakedApes()}</ApeList>
              <ApeListDesktop>{renderDesktopStakedApes()}</ApeListDesktop>
              <ButtonClaim disabled={getIfItsClaimDisabled()}>
                Claim {totalSelectedClaim} $OG
              </ButtonClaim>
              <ClaimAndUnstakeButton disabled={getIfItsClaimDisabled()}>
                Claim $OG and Unstake
              </ClaimAndUnstakeButton>
              <StakedText>
                <p>
                  Unclaimed: <span>{totalClaim} $OG</span>
                </p>
                <p>
                  A Robo Ooga can only be unstaked when it has accumulated min.
                  6,000 $OG
                </p>
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
