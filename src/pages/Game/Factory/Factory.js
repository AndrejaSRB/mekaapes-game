import { useState, useEffect, useContext, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLazyQuery, useApolloClient } from "@apollo/client";
import { BigNumber, ethers } from "ethers";
import * as Sentry from "@sentry/react";
// ******** Components ********
import { message } from "antd";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Loading from "../../../components/Modals/Loading/Loading";
import SuccessModal from "../../../components/Modals/SuccessModal/SuccessModal";
import ResultsModal from "../../../components/Modals/ResultModal/ResultModal";
import StakedApe from "./StakedApe";
import UnstakeRoboApe from "./UnstakeRoboApe";
import UnstakeMekaApe from "./UnstakeMekaApe";
import ActionLoading from "../../../components/Modals/ActionLoading/ActionLoading";
import Crew from "../Crew/Crew";
import BurnRoboModal from "../../../components/Modals/BurnRoboModal/BurnRoboModal";
// ******** Messages ********
import {
  SELECT_SOME_UNSTAKED_APE,
  SELECT_SOME_STAKED_APE,
  SOMETHING_WENT_WRONG,
  SOMETHING_WENT_WRONG_UNSTAKE,
  ACTION_LOADING_CLAIM,
  DONT_ENOUGH_CREDITS,
  getActionLoadingStakeMessage,
  getActionLoadingUnstakeMessage,
} from "../../../messages";
// ******** HOC ********
import withConnect from "../../../hoc/withConnect";
// ******** Hooks ********
import useWindowDimenstions from "../../../hooks/Global/useWindowDimensions";
import useListClaimAvaliableReward from "../../../hooks/Factory/useListClaimAvaliableReward";
import useBurnCredits from "../../../hooks/Factory/useBurnCredits";
// ******** Functions ********
import {
  getListLength,
  getIfSelected,
  handleClickApe,
  handleClickStakedApe,
  arrangeStakedMobileList,
  beautifyNumber,
  getReducedEstimatedGas,
  getBurnCreditsClassName,
} from "./helper";
// ******** Queires ********
import {
  GET_STAKED_APE,
  GET_UNSTAKE_MEKA_APES,
  GET_UNSTAKE_ROBO_OOGAS,
  GET_ALL_MY_ROBO_OOGAS,
} from "../../../queries";
// ******** Services ********
import contract from "../../../services/contract";
// ******** Store ********
import { UserContext } from "../../../store/user-context";
import { BalanceContext } from "../../../store/balance-context";
// ******** Images ********
import HeroImage from "../../../assets/factory_animation.gif";
import PlaceholderApe from "../../../assets/placeholder_ape.png";
// ******** Events ********
import {
  CLAIM_REWARD,
  getAllEvents,
} from "../../../eventsListeners";
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
  SelectedCounter,
  Tabs,
  Tab,
  BurnSection,
  BurnButton,
} from "./Factory.styles";

const NoItemFound = () => (
  <NotFoundItem>
    <p>No items found!</p>
  </NotFoundItem>
);

const Factory = () => {
  const client = useApolloClient();
  const { userMetaMaskToken } = useContext(UserContext);
  const { dmtBalance, oogearBalance, getOogearBalance } =
    useContext(BalanceContext);
  const { width } = useWindowDimenstions();
  // Tabs
  const [activeTab, setActiveTab] = useState("factory");
  const [selectAllStaked, setSelectAllStaked] = useState(false);
  const [selectAllUnstakedMeka, setSelectAllUnstakedMeka] = useState(false);
  const [selectAllUnstakedRobo, setSelectAllUnstakedRobo] = useState(false);

  const [selectedUnstakedRobo, setSelectedUnstakedRobo] = useState([]);
  const [selectedUnstakedMeka, setSelectedUnstakedMeka] = useState([]);
  const [selectedStaked, setSelectedStaked] = useState([]);

  const [stakedData, setStakedData] = useState([]);
  const [minStakedElementNo, setMinStakedElementNo] = useState(6);

  const [totalClaim, setTotalClaim] = useState(0);
  const [totalSelectedClaim, setTotalSelectedClaim] = useState(0);
  const [loading, setLoading] = useState(false);
  // Actions Loading
  const [actionLoading, setActionLoading] = useState(false);
  const [actionLoadingText, setActionLoadingText] = useState("");
  const [tsxNumber, setTsxNumber] = useState(0);
  const [tsxTotalNumber, setTsxTotalNumber] = useState(0);

  // Success Modal data
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [tokens, setTokens] = useState(null);

  // data
  const [unstakedRoboList, setUnstakedRoboList] = useState(null);
  const [unstakedMekaList, setUnstakedMekaList] = useState(null);
  const [stakedList, setStakedList] = useState(null);
  const [stakedApesListWithoutCrew, setStakedApesListWithoutCrew] =
    useState(null);

  const [getStakedApe, { loading: stakeLoading, data: stakedApesData }] =
    useLazyQuery(GET_STAKED_APE);
  const [
    getUnstakedRoboOogas,
    { loading: unstakedRoboLoading, data: unstakedRoboData },
  ] = useLazyQuery(GET_UNSTAKE_ROBO_OOGAS);

  const [
    getUnstakeMekaApes,
    { loading: unstakedMekaApeLoading, data: unstakedMekaApeData },
  ] = useLazyQuery(GET_UNSTAKE_MEKA_APES);

  // Get Total CLaim Reward
  const { data: claimAvaliableRewardList, refetch: getAvaliableRewards } =
    useListClaimAvaliableReward(stakedList, stakedApesListWithoutCrew);

  //Get Burn Credits
  const [
    getAllMyRoboOogas,
    { loading: allMyRoboOogasLoading, data: allMyRoboOogasData },
  ] = useLazyQuery(GET_ALL_MY_ROBO_OOGAS);
  const [isRoboBurnModalOpen, setIsRoboBurnModalOpen] = useState(false);
  const { data: burnCreditsData, refetch: getBurnCredits } =
    useBurnCredits(userMetaMaskToken);
  const [burnCredits, setBurnCredits] = useState(0);
  const [burnRoboList, setBurnRoboList] = useState(null);
  const [selectedBurnCreditsRobo, setSelectedBurnCreditsRobo] = useState(0);
  // Transaction Events
  const unstakeTokensAmount = useRef(null);

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
      getAllMyRoboOogas({
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
    getAllMyRoboOogas,
    getUnstakeMekaApes,
  ]);

  useEffect(() => {
    if (stakedApesData && stakedApesData.spaceOogas) {
      let list = [];
      stakedApesData.spaceOogas.forEach((ape) => {
        if (ape?.crewId === null || ape?.crewId === undefined) {
          list.push(ape);
        }
        setStakedApesListWithoutCrew(list);
        setStakedList(list);
      });
    } else {
      setStakedList(null);
    }
  }, [stakedApesData]);

  // Set Robo Ooga list avaliable for burning
  useEffect(() => {
    let allRobos = [];
    if (allMyRoboOogasData?.unstaked?.length > 0) {
      allRobos = [...allRobos, ...allMyRoboOogasData?.unstaked];
    }
    if (allMyRoboOogasData?.staked?.length > 0) {
      let roboWithoutCrew = [];
      allMyRoboOogasData?.staked.forEach((robo) => {
        if (robo.crewId === null || robo.crewId === undefined) {
          roboWithoutCrew.push(robo);
        }
      });
      allRobos = [...allRobos, ...roboWithoutCrew];
    }
    setBurnRoboList(allRobos);
  }, [allMyRoboOogasData]);

  // Set placeholder in the staked list
  useEffect(() => {
    if (stakedApesListWithoutCrew) {
      let length = stakedApesListWithoutCrew.length;
      let array = [...stakedApesListWithoutCrew];
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
        array = [...stakedApesListWithoutCrew, ...placeholderArray];
      }
      setStakedList(array);
    } else {
      setStakedList(null);
    }
  }, [minStakedElementNo, stakedApesListWithoutCrew]);

  // Sum Total Claim Reward
  useEffect(() => {
    if (claimAvaliableRewardList?.length > 0) {
      setStakedData(claimAvaliableRewardList ? claimAvaliableRewardList : []);
      let total = 0;
      claimAvaliableRewardList.forEach((ape) => {
        if (+ape.reward > 0) {
          total = +total + +ape.reward;
        }
      });
      setTotalClaim(total);
    } else {
      setStakedData([]);
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

  useEffect(() => {
    if (
      burnCreditsData &&
      burnCreditsData !== null &&
      burnCreditsData !== undefined
    ) {
      setBurnCredits(burnCreditsData);
    } else {
      setBurnCredits(0);
    }
  }, [burnCreditsData]);

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
    if (
      stakeLoading ||
      unstakedRoboLoading ||
      unstakedMekaApeLoading ||
      allMyRoboOogasLoading
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [
    stakeLoading,
    unstakedRoboLoading,
    unstakedMekaApeLoading,
    allMyRoboOogasLoading,
  ]);

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
    if (stakedData && stakedData?.length > 0) {
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

  const handleOpenBurnModal = () => {
    setIsRoboBurnModalOpen(true);
  };

  const handleCloseBurnModal = async () => {
    getStakedApe();
    getBurnCredits();
    await getFreshData();
    setIsRoboBurnModalOpen(false);
  };

  const handleClickTab = (tab) => () => {
    setActiveTab(tab);
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
    if (stakedData && stakedData?.length > 0) {
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
    } else {
      return <NoItemFound />;
    }
  };

  const renderMobileStakedApes = () => {
    if (stakedData && stakedData?.length > 0) {
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
    } else {
      return (
        <NftBox lenght={6}>
          <NoItemFound />
        </NftBox>
      );
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

  const getFreshData = async () => {
    await client.cache.reset().then(() => {
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
      getAvaliableRewards();
    });
  };

  const handleCloseSuccessModal = async () => {
    setIsSuccessModalOpen(false);
    setText("");
    setTokens(null);
    await getFreshData();
  };

  const handleCloseResultsModal = async () => {
    getBurnCredits();
    setIsResultsModalOpen(false);
    setText("");
    setTokens(null);
    await handleCloseBurnModal();
    unstakeTokensAmount.current = null;

    getOogearBalance();
    await getFreshData();
  };

  const clearActionLoading = () => {
    setActionLoading(false);
    setTsxTotalNumber(0);
    setTsxNumber(0);
    setActionLoadingText("");
  };

  const openActionLoading = (totalNumber, message) => {
    setActionLoading(true);
    setTsxTotalNumber(totalNumber);
    setTsxNumber(1);
    setActionLoadingText(message);
  };

  const getSelectedStakedNumber = () => {
    if (selectedStaked?.length > 0) {
      let realTokens = selectedStaked.filter((selected) => selected.owner);
      return realTokens.length;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    if (selectedStaked?.length > 0) {
      let realTokens = selectedStaked.filter((selected) => selected.owner);
      let robo = realTokens.filter(
        (token) => token.oogaType === "0" || token.oogaType === 0
      );
      setSelectedBurnCreditsRobo(robo.length);
    } else {
      setSelectedBurnCreditsRobo(0);
    }
  }, [selectedStaked]);

  const getSelectedStakedRoboNumber = () => {
    if (selectedStaked?.length > 0) {
      let realTokens = selectedStaked.filter((selected) => selected.owner);
      let robo = realTokens.filter(
        (token) => token.oogaType === "0" || token.oogaType === 0
      );
      return robo.length;
    } else {
      return 0;
    }
  };

  const getEstimatedGas = async (list, type, gasFee) => {
    let gasEstimation;
    if (type === "stake") {
      gasEstimation = await contract.mekaApesContract.estimateGas.stake(list);
    } else if (type === "claim") {
      gasEstimation = await contract.mekaApesContract.estimateGas.claimReward(
        list
      );
    } else if (type === "unstake") {
      gasEstimation = await contract.mekaApesContract.estimateGas.unstake(
        list
      );
    }
    let totalGasEstimation = getReducedEstimatedGas(gasEstimation);
    return totalGasEstimation;
  };


  const getClaimEvent = (receipt) => {
    let { mekaApesContract } = contract;
    let claimRewardEvent = getAllEvents(
      receipt,
      mekaApesContract,
      CLAIM_REWARD
    );
    let allTokens = [];

    if (claimRewardEvent?.length > 0) {
      let totalClaimAmount = BigNumber.from(0);
      claimRewardEvent.forEach((event) => {
        totalClaimAmount = totalClaimAmount.add(event.args.amount);
      });
      if (BigNumber.isBigNumber(totalClaimAmount)) {
        let totalAmount = ethers.utils.formatUnits(totalClaimAmount);
        allTokens.push({
          type: "claim",
          amount: totalAmount,
          id: "claim",
        });
      }
    }
    setTokens(allTokens);
    getStakedApe({
      variables: {
        owner: userMetaMaskToken,
      },
    });
    clearActionLoading();
    setIsResultsModalOpen(true);
  };

  const getUnstakeEvent = (receipt) => {
    let { mekaApesContract } = contract;
    let claimRewardEvent = getAllEvents(
      receipt,
      mekaApesContract,
      CLAIM_REWARD
    );
    let allTokens = [];

    if (claimRewardEvent?.length > 0) {
      let totalClaimAmount = BigNumber.from(0);
      claimRewardEvent.forEach((event) => {
        totalClaimAmount = totalClaimAmount.add(event.args.amount);
      });
      if (BigNumber.isBigNumber(totalClaimAmount)) {
        let totalAmount = ethers.utils.formatUnits(totalClaimAmount);
        allTokens.push({
          type: "simple-unstake",
          amount: totalAmount,
          id: "simple-unstake",
        });
      }
    }
    setTokens(allTokens);
    getBurnCredits();
    getStakedApe({
      variables: {
        owner: userMetaMaskToken,
      },
    });
    clearActionLoading();
    setIsResultsModalOpen(true);
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
        let totalGasEstimation = await getEstimatedGas(tokenIds, "stake");
        let tsx = await contract.stake(tokenIds, totalGasEstimation);
        openActionLoading(1, getActionLoadingStakeMessage(tokenIds));
        tsx
          .wait()
          .then(async () => {
            await getFreshData();
            setText(
              `It may take a few minutes until your NFTs are displayed as "staked".`
            );
            clearActionLoading();
            setIsSuccessModalOpen(true);
          })
          .catch((error) => {
            console.log(error);
            Sentry.captureException(new Error(error), {
              tags: {
                section: "Factory Stake tsx.wait",
              },
            });
            message.error(SOMETHING_WENT_WRONG);
            clearActionLoading();
          });
      } catch (error) {
        console.log(error);
        Sentry.captureException(new Error(error), {
          tags: {
            section: "Factory Stake 1st tsx",
          },
        });
        message.error(SOMETHING_WENT_WRONG);
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
        if (token.owner) {
          tokenIds.push(token.id);
        }
      });
      if (tokenIds?.length > 0) {
        try {
          let totalGasEstimation = await getEstimatedGas(tokenIds, "claim");
          let tsx = await contract.claimReward(tokenIds, totalGasEstimation);
          openActionLoading(1, ACTION_LOADING_CLAIM);
          tsx
            .wait()
            .then((receipt) => {
              getClaimEvent(receipt);
              getOogearBalance();
            })
            .catch((error) => {
              console.log(error);
              Sentry.captureException(new Error(error), {
                tags: {
                  section: "Factory Claim tsx.wait",
                },
              });
              message.error(SOMETHING_WENT_WRONG);
              clearActionLoading();
            });
        } catch (error) {
          console.log(error);
          Sentry.captureException(new Error(error), {
            tags: {
              section: "Factory Claim 1st tsx",
            },
          });
          message.error(SOMETHING_WENT_WRONG);
        }
        setTotalClaim(0);
        setSelectedStaked([]);
      }
    } else {
      message.error(SELECT_SOME_STAKED_APE);
    }
  };

  const handleClickUnstake = async () => {
    if (selectedBurnCreditsRobo < burnCredits) {
      let tokenIds = [];
      if (selectedStaked?.length > 0) {
        selectedStaked.forEach((token) => {
          if (token.owner) {
            tokenIds.push(token.id);
          }
        });

        if (tokenIds?.length > 0) {
          try {
            let totalGasEstimation = await getEstimatedGas(
              tokenIds,
              "unstake"
            );
            let tsx = await contract.unstake(
              tokenIds,
              totalGasEstimation
            );
            openActionLoading(1, getActionLoadingUnstakeMessage(tokenIds));
            tsx
              .wait()
              .then((receipt) => {
                setTsxNumber(1);
                getUnstakeEvent(receipt);
                getOogearBalance();
              })
              .catch((error) => {
                console.log(error);
                Sentry.captureException(new Error(error), {
                  tags: {
                    section: "Factory Unstake tsx.wait",
                  },
                });
                message.error(SOMETHING_WENT_WRONG);
                clearActionLoading(false);
              });
          } catch (error) {
            console.log(error);
            Sentry.captureException(new Error(error), {
              tags: {
                section: "Factory Unstake 1st tsx",
              },
            });
            message.error(SOMETHING_WENT_WRONG_UNSTAKE, 6);
          }
          setTotalClaim(0);
          setSelectedStaked([]);
        }
      } else {
        message.error(SELECT_SOME_STAKED_APE);
      }
    } else {
      message.error(DONT_ENOUGH_CREDITS);
    }
  };

  return (
    <Wrapper>
      <Header page="game" />
      <Content>
        <Title>Enter the Factory</Title>
        <Tabs>
          <Tab
            active={activeTab === "factory"}
            onClick={handleClickTab("factory")}>
            The Factory
          </Tab>
          <Tab active={activeTab === "crew"} onClick={handleClickTab("crew")}>
            Meka Crews
          </Tab>
        </Tabs>
        {activeTab === "factory" && (
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
                <span>$OG Balance:</span>{" "}
                {oogearBalance && beautifyNumber(oogearBalance)}
              </p>
              <p>
                <span>$DMT Balance:</span>{" "}
                {dmtBalance && beautifyNumber(dmtBalance)}
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
                {unstakedRoboList?.length > 0 && (
                  <SelectedCounter>
                    <span>Selected Robo Oogas:</span>
                    <span className="numbers">
                      {selectedUnstakedRobo ? selectedUnstakedRobo?.length : 0}/
                      {unstakedRoboList?.length}
                    </span>
                  </SelectedCounter>
                )}
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
                {unstakedMekaList?.length > 0 && (
                  <SelectedCounter>
                    <span>Selected MekaApes:</span>
                    <span className="numbers">
                      {selectedUnstakedMeka ? selectedUnstakedMeka?.length : 0}/
                      {unstakedMekaList?.length}
                    </span>
                  </SelectedCounter>
                )}
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
                  <span>$OG Balance:</span>{" "}
                  {oogearBalance && beautifyNumber(oogearBalance)}
                </p>
                <p>
                  <span>$DMT Balance:</span>{" "}
                  {dmtBalance && beautifyNumber(dmtBalance)}
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
                <ApeListDesktop length={stakedData ? stakedData.length : 0}>
                  {renderDesktopStakedApes()}
                </ApeListDesktop>
                {stakedApesListWithoutCrew?.length > 0 && (
                  <SelectedCounter staked>
                    <span>Selected NFTs:</span>
                    <span className="numbers">
                      {selectedStaked ? getSelectedStakedNumber() : 0}/
                      {stakedApesListWithoutCrew?.length}
                    </span>
                  </SelectedCounter>
                )}
                <BurnSection>
                  <BurnButton onClick={handleOpenBurnModal}>
                    Get Credits
                  </BurnButton>
                  <div className="text">
                    <span>Unstaking Credits:</span>
                    <span
                      className={getBurnCreditsClassName(
                        burnCredits,
                        selectedBurnCreditsRobo
                      )}>
                      {selectedStaked ? getSelectedStakedRoboNumber() : 0}/
                      {burnCredits}
                    </span>
                  </div>
                </BurnSection>
                <ButtonClaim
                  disabled={getIfItsClaimDisabled()}
                  onClick={handleClickClaim}>
                  Claim{" "}
                  {totalSelectedClaim && beautifyNumber(totalSelectedClaim)} $OG
                </ButtonClaim>
                <ClaimAndUnstakeButton
                  disabled={getIfItsClaimDisabled()}
                  onClick={handleClickUnstake}>
                  Claim $OG and Unstake
                </ClaimAndUnstakeButton>
                <StakedText>
                  <p>
                    Unclaimed:{" "}
                    <span>{totalClaim && beautifyNumber(totalClaim)} $OG</span>
                  </p>
                  <p />
                </StakedText>
              </Staked>
            </Boxes>
          </MainBox>
        )}
        {activeTab === "crew" && (
          <Crew
            getStakedApe={getStakedApe}
            getUnstakedRoboOogas={getUnstakedRoboOogas}
            getUnstakeMekaApes={getUnstakeMekaApes}
          />
        )}
      </Content>
      <Footer page="game" />
      {loading && <Loading open={loading} />}
      {isSuccessModalOpen && text && (
        <SuccessModal
          open={isSuccessModalOpen}
          handleClose={handleCloseSuccessModal}
          title="Your NFTs are staked in the Factory"
          text={text}
        />
      )}
      {isResultsModalOpen && (
        <ResultsModal
          open={isResultsModalOpen}
          handleClose={handleCloseResultsModal}
          tokens={tokens}
        />
      )}
      {actionLoading && (
        <ActionLoading
          open={actionLoading}
          text={actionLoadingText}
          tsxNumber={tsxNumber}
          tsxTotalNumber={tsxTotalNumber}
        />
      )}
      {isRoboBurnModalOpen && (
        <BurnRoboModal
          open={isRoboBurnModalOpen}
          roboList={burnRoboList}
          type="burn"
          handleCloseModal={handleCloseBurnModal}
          setIsResultsModalOpen={setIsResultsModalOpen}
          setTokens={setTokens}
        />
      )}
    </Wrapper>
  );
};

export default withConnect(Factory, "/game/factory");
