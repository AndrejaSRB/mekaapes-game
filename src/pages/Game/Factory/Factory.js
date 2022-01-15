import { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLazyQuery } from "@apollo/client";
// ******** Components ********
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Loading from "../../../components/Modals/Loading/Loading";
import StakedApe from "./StakedApe";
import UnstakeRoboApe from "./UnstakeRoboApe";
import UnstakeMekaApe from "./UnstakeMekaApe";
// ******** Messages ********
import {
  SELECT_SOME_UNSTAKED_APE,
  SELECT_SOME_STAKED_APE,
} from "../../../messages";
// ******** HOC ********
import withConnect from "../../../hoc/withConnect";
// ******** Hooks ********
import useWindowDimenstions from "../../../hooks/useWindowDimensions";
import useListClaimAvaliableReward from "../../../hooks/useListClaimAvaliableReward";
// ******** Functions ********
import {
  getListLength,
  getIfSelected,
  handleClickApe,
  handleClickStakedApe,
  arrangeStakedMobileList,
} from "./helper";
// ******** Queires ********
import {
  GET_STAKED_APE,
  GET_UNSTAKE_MEKA_APES,
  GET_UNSTAKE_ROBO_OOGAS,
} from "../../../queries";
// ******** Services ********
import contract from "../../../services/contract";
// ******** Store ********
import { UserContext } from "../../../store/user-context";
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
  Button,
  NotFoundItem,
  HelperText,
  Staked,
  CustomCheckbox,
  ApeList,
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
import { message } from "antd";

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
  const { userMetaMaskToken } = useContext(UserContext);
  const { dmtBalance, oogearBalance, getOogearBalance } =
    useContext(BalanceContext);
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

  const [loading, setLoading] = useState(false);

  // data
  const [unstakedRoboList, setUnstakedRoboList] = useState(null);
  const [unstakedMekaList, setUnstakedMekaList] = useState(null);
  const [stakedList, setStakedList] = useState(null);

  const [getStakedApe, { loading: stakeLoading, data: stakedApesData }] =
    useLazyQuery(GET_STAKED_APE);
  const [
    getUnstakedRoboOogas,
    { loading: unstakedRoboLoading, data: unstakedRoboData },
  ] = useLazyQuery(GET_UNSTAKE_ROBO_OOGAS);

  const [
    getUnstakeMekaApes,
    { loading: unstakedMekaAPeLoading, data: unstakedMekaApeData },
  ] = useLazyQuery(GET_UNSTAKE_MEKA_APES);

  // Get Total CLaim Reward
  const { data: claimAvaliableRewardList } = useListClaimAvaliableReward(
    stakedList,
    stakedApesData?.spaceOogas
  );

  // Get all data
  useEffect(() => {
    let isMounted = true;
    if (userMetaMaskToken && isMounted) {
      getStakedApe({
        variables: {
          owner: userMetaMaskToken,
        },
      });
      getUnstakedRoboOogas({
        variables: {
          owner: userMetaMaskToken,
        },
      });
      getUnstakeMekaApes({
        variables: {
          owner: userMetaMaskToken,
        },
      });
    }
    return () => {
      isMounted = false;
    };
  }, [
    userMetaMaskToken,
    getStakedApe,
    getUnstakedRoboOogas,
    getUnstakeMekaApes,
  ]);

  useEffect(() => {
    if (stakedApesData && stakedApesData.spaceOogas) {
      setStakedList(stakedApesData.spaceOogas);
    } else {
      setStakedList(null);
    }
  }, [stakedApesData]);

  // Set placeholder in the staked list
  useEffect(() => {
    if (stakedApesData && stakedApesData.spaceOogas) {
      let stakedOogas = stakedApesData.spaceOogas;
      let length = stakedOogas.length;
      let array = [...stakedOogas];
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
        array = [...stakedOogas, ...placeholderArray];
      }
      setStakedList(array);
    } else {
      setStakedList(null);
    }
  }, [minStakedElementNo, stakedApesData]);

  // Sum Total Claim Reward
  useEffect(() => {
    if (claimAvaliableRewardList?.length > 0) {
      setStakedData(claimAvaliableRewardList);
      let total = 0;
      claimAvaliableRewardList.forEach((ape) => {
        if (+ape.reward > 0) {
          total = +total + +ape.reward;
        }
      });
      setTotalClaim(total);
    } else {
      setStakedData(null);
      setTotalClaim(0);
    }
  }, [claimAvaliableRewardList]);

  useEffect(() => {
    if (unstakedRoboData && unstakedRoboData.spaceOogas) {
      setUnstakedRoboList(unstakedRoboData.spaceOogas);
    } else {
      setUnstakedRoboList(null);
    }
  }, [unstakedRoboData]);

  useEffect(() => {
    if (unstakedMekaApeData && unstakedMekaApeData.spaceOogas) {
      setUnstakedMekaList(unstakedMekaApeData.spaceOogas);
    } else {
      setUnstakedMekaList(null);
    }
  }, [unstakedMekaApeData]);

  // Sum selected token claim amount
  useEffect(() => {
    if (selectedStaked?.length > 0 && claimAvaliableRewardList?.length > 0) {
      let total = 0;
      selectedStaked.forEach((nft) => {
        let ape = claimAvaliableRewardList.find((token) => token.id === nft.id);
        if (ape) {
          if (+ape.reward > 0) {
            total = +ape.reward + +total;
          }
        }
      });
      setTotalSelectedClaim(total);
    } else {
      setTotalSelectedClaim(0);
    }
  }, [selectedStaked, claimAvaliableRewardList]);

  useEffect(() => {
    if (stakeLoading || unstakedRoboLoading || unstakedMekaAPeLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [stakeLoading, unstakedRoboLoading, unstakedMekaAPeLoading]);

  useEffect(() => {
    if (width < 388) {
      setMinStakedElementNo(6);
    } else if (width < 1200 && width > 900) {
      setMinStakedElementNo(10);
    } else {
      setMinStakedElementNo(6);
    }
  }, [width]);

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
    if (unstakedMekaList && unstakedMekaList.length > 0) {
      if (!e.target.checked) {
        setSelectedUnstakedMeka([]);
      } else {
        setSelectedUnstakedMeka([...unstakedMekaList]);
      }
      setSelectAllUnstakedMeka(e.target.checked);
    }
  };

  const hadnleChangeUnstakedRoboCheckbox = (e) => {
    if (unstakedRoboList && unstakedRoboList.length > 0) {
      if (!e.target.checked) {
        setSelectedUnstakedRobo([]);
      } else {
        setSelectedUnstakedRobo([...unstakedRoboList]);
      }
      setSelectAllUnstakedRobo(e.target.checked);
    }
  };

  const renderUnstakedRobo = () => {
    if (unstakedRoboList && unstakedRoboList.length > 0) {
      return unstakedRoboList.map((robo) => (
        <UnstakeRoboApe
          key={robo.id}
          robo={robo}
          selectAllUnstakedRobo={selectAllUnstakedRobo}
          setSelectAllUnstakedRobo={setSelectAllUnstakedRobo}
          selectedUnstakedRobo={selectedUnstakedRobo}
          setSelectedUnstakedRobo={setSelectedUnstakedRobo}
          handleClickApe={handleClickApe}
          getIfSelected={getIfSelected}
        />
      ));
    } else {
      return <NoItemFound />;
    }
  };

  const renderUnstakedMeka = () => {
    if (unstakedMekaList && unstakedMekaList.length > 0) {
      return unstakedMekaList.map((meka) => (
        <UnstakeMekaApe
          key={meka.id}
          meka={meka}
          selectAllUnstakedMeka={selectAllUnstakedMeka}
          setSelectAllUnstakedMeka={setSelectAllUnstakedMeka}
          selectedUnstakedMeka={selectedUnstakedMeka}
          setSelectedUnstakedMeka={setSelectedUnstakedMeka}
          handleClickApe={handleClickApe}
          getIfSelected={getIfSelected}
        />
      ));
    } else {
      return <NoItemFound />;
    }
  };

  const renderDesktopStakedApes = () => {
    if (stakedData && stakedData.length > 0) {
      return stakedData.map((ape) => (
        <StakedApe
          key={ape.id}
          ape={ape}
          selectAllStaked={selectAllStaked}
          setSelectAllStaked={setSelectAllStaked}
          selectedStaked={selectedStaked}
          setSelectedStaked={setSelectedStaked}
          handleClickStakedApe={handleClickStakedApe}
          getIfSelected={getIfSelected}
        />
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
                <StakedApe
                  key={ape.id}
                  ape={ape}
                  selectAllStaked={selectAllStaked}
                  setSelectAllStaked={setSelectAllStaked}
                  selectedStaked={selectedStaked}
                  setSelectedStaked={setSelectedStaked}
                  handleClickStakedApe={handleClickStakedApe}
                  getIfSelected={getIfSelected}
                />
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

  const getFreshData = () => {
    getStakedApe({
      variables: {
        owner: userMetaMaskToken,
      },
    });
    getUnstakedRoboOogas({
      variables: {
        owner: userMetaMaskToken,
      },
    });
    getUnstakeMekaApes({
      variables: {
        owner: userMetaMaskToken,
      },
    });
  };

  const handleClickStake = async () => {
    let tokenIds = [];
    if (selectedUnstakedRobo?.length > 0) {
      selectedUnstakedRobo.forEach((robo) => {
        tokenIds.push(robo.id);
      });
    }
    if (selectedUnstakedMeka?.length > 0) {
      selectedUnstakedMeka.forEach((meka) => {
        tokenIds.push(meka.id);
      });
    }
    if (tokenIds?.length > 0) {
      try {
        let tsx = await contract.stake(tokenIds);
        setLoading(true);
        tsx
          .wait()
          .then(() => {
            getFreshData();
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
      setSelectAllUnstakedMeka(false);
      setSelectAllUnstakedMeka(false);
      setSelectedUnstakedMeka(null);
      setSelectedUnstakedRobo(null);
    } else {
      message.error(SELECT_SOME_UNSTAKED_APE);
    }
  };

  const handleClickClaim = async () => {
    let tokenIds = [];
    if (selectedStaked?.length > 0) {
      selectedStaked.forEach((token) => {
        tokenIds.push(token.id);
      });
      if (tokenIds?.length > 0) {
        try {
          let tsx = await contract.claimReward(tokenIds);
          setLoading(true);
          tsx
            .wait()
            .then(() => {
              getStakedApe({
                variables: {
                  owner: userMetaMaskToken,
                },
              });
              getOogearBalance();
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
            });
          setTotalClaim(0);
          setSelectedStaked([]);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      message.error(SELECT_SOME_STAKED_APE);
    }
  };

  const handleClickUnstake = async () => {
    let tokenIds = [];
    if (selectedStaked?.length > 0) {
      selectedStaked.forEach((token) => {
        tokenIds.push(token.id);
      });
      if (tokenIds?.length > 0) {
        try {
          let tsx = await contract.unstake(tokenIds);
          setLoading(true);
          tsx
            .wait()
            .then(() => {
              getFreshData();
              getOogearBalance();
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
            });
          setTotalClaim(0);
          setSelectedStaked([]);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      message.error(SELECT_SOME_STAKED_APE);
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
              <NftList length={getListLength(unstakedRoboList)}>
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
              <NftList meka length={getListLength(unstakedMekaList)}>
                {renderUnstakedMeka()}
              </NftList>
              <Button
                type="stake"
                disabled={getIfItsStakeDisabled()}
                onClick={handleClickStake}>
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
              <ButtonClaim
                disabled={getIfItsClaimDisabled()}
                onClick={handleClickClaim}>
                Claim {totalSelectedClaim} $OG
              </ButtonClaim>
              <ClaimAndUnstakeButton
                disabled={getIfItsClaimDisabled()}
                onClick={handleClickUnstake}>
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
      {loading && <Loading open={loading} />}
    </Wrapper>
  );
};

export default withConnect(Factory, "/game/factory");
