import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
// ******** Components ********
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
// ******** HOC ********
import withConnect from "../../../hoc/withConnect";
// ******** Hooks ********
import useWindowDimenstions from "../../../hooks/useWindowDimensions";
// ******** Icons ********
import { SettingFilled } from "@ant-design/icons";
// ******** Functions ********
import {
  getListLenght,
  getIfSelected,
  handleClickApe,
  handleClickStakedApe,
  arrangeStakedMobileList,
} from "./helper";
// ******** Images ********
import HeroImage from "../../../assets/landing-image.png";
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
  ApeInProgress,
} from "./Factory.styles";
// ******** Fake Data ********
import {
  exampleRoboOogasUnstaked,
  exampleMekaOogasUnstaked,
  exampleStaked,
} from "./data";

const NoItemFound = () => (
  <NotFoundItem>
    <img src={PlaceholderApe} alt="placeholder" />
    <p>No items found!</p>
  </NotFoundItem>
);

// eslint-disable-next-line no-unused-vars
const InProgressApe = () => (
  <ApeInProgress>
    <img src={PlaceholderApe} alt="Robo Ooga" />
    <div className="icon-one">
      <SettingFilled spin />
    </div>
    <div className="icon-two">
      <SettingFilled spin />
    </div>
  </ApeInProgress>
);

// TODO
// Disable buttons if the amount is bigger than the balance in that coin
// Sum total $OG staked tokens to the unclaimed total bellow the unstake button
// Add clicked total sum to the Claim button

const Factory = () => {
  const { width } = useWindowDimenstions();
  const [selectAllStaked, setSelectAllStaked] = useState(false);
  const [selectAllUnstakedMeka, setSelectAllUnstakedMeka] = useState(false);
  const [selectAllUnstakedRobo, setSelectAllUnstakedRobo] = useState(false);

  const [selectedUnstakedRobo, setSelectedUnstakedRobo] = useState([]);
  const [selectedUnstakedMeka, setSelectedUnstakedMeka] = useState([]);
  const [selectedStaked, setSelectedStaked] = useState([]);

  const [stakedData, setStakedData] = useState(null);
  const [minStakedElementNo, setMinStakedElementNo] = useState(6);

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
              <span>312.08</span>
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
                      <span>312.08</span>
                    </div>
                  )}
                </ApeNft>
              ))}
          </NftBox>
        ));
      }
    }
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
              <span>$OG Balance:</span> 1,000,000,000
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
                  checked={selectAllUnstakedRobo}>
                  Select All:
                </CustomUnstakeCheckbox>
              </Subtitle>
              <NftList lenght={getListLenght(exampleRoboOogasUnstaked)}>
                {renderUnstakedRobo()}
              </NftList>
              <Subtitle>
                <h6 className="meka">MekaApe:</h6>
                <CustomUnstakeCheckbox
                  onChange={hadnleChangeUnstakedMekaCheckbox}
                  checked={selectAllUnstakedMeka}>
                  Select All:
                </CustomUnstakeCheckbox>
              </Subtitle>
              <NftList meka lenght={getListLenght(exampleMekaOogasUnstaked)}>
                {renderUnstakedMeka()}
              </NftList>
              <Button type="stake">Stake and Guard!</Button>
              <HelperText>Select your NFTs to Claim</HelperText>
            </Unstaked>
            <MiddleBox>
              <img src={HeroImage} alt="hero ape" />
              <p>
                <span>$OG Balance:</span> 1,000,000,000
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
                  checked={selectAllStaked}>
                  Select All:
                </CustomCheckbox>
              </div>
              <ApeList>{renderMobileStakedApes()}</ApeList>
              <ApeListDesktop>{renderDesktopStakedApes()}</ApeListDesktop>
              <Button type="claim">Claim $OG</Button>
              <ClaimAndUnstakeButton disabled>
                Claim $OG <span>and Unstake</span>
              </ClaimAndUnstakeButton>
              <StakedText>
                <p>
                  Unclaimed: <span>1000 $OG</span>
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
