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
// ******** Messages ********
import {
  SELECT_SOME_UNSTAKED_APE,
  SELECT_SOME_STAKED_APE,
  SOMETHING_WENT_WRONG,
  SOMETHING_WENT_WRONG_UNSTAKE,
  ACTION_LOADING_CLAIM,
  getActionLoadingStakeMessage,
  getActionLoadingUnstakeMessage,
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
  getApeName,
  getStakedRoboAmount,
  beautifyNumber,
  getReducedEstimatedGas,
} from "./helper";
// ******** Queires ********
import {
  GET_STAKED_APE,
  GET_UNSTAKE_MEKA_APES,
  GET_UNSTAKE_ROBO_OOGAS,
} from "../../../queries";
// ******** Services ********
import contract from "../../../services/contract";
import gas from "../../../services/gas";
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
  ATTACK_REWARD,
  makeRandomSubscription,
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
    if (stakeLoading || unstakedRoboLoading || unstakedMekaApeLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [stakeLoading, unstakedRoboLoading, unstakedMekaApeLoading]);

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
    setIsResultsModalOpen(false);
    setText("");
    setTokens(null);
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
        list,
        {
          value: gasFee,
        }
      );
    }
    let totalGasEstimation = getReducedEstimatedGas(gasEstimation);
    return totalGasEstimation;
  };

  const getGasFee = async (list) => {
    let amount = getStakedRoboAmount(list);
    let gasFee = await gas.getUnstakeRandomGas(amount);

    // increasing gasFee for 14%
    let increasedGas = null;
    if (BigNumber.isBigNumber(gasFee)) {
      increasedGas = gasFee.mul(114).div(100);
    }
    return increasedGas ? increasedGas : gasFee;
  };

  const onRandomsReceived = async (requestId, entropy, event) => {
    let txReceipt = await event.getTransactionReceipt();
    let { mekaApesContract } = contract;
    let unstakeTokens = [];
    if (unstakeTokensAmount.current?.length > 0) {
      unstakeTokens = [...unstakeTokensAmount.current];
    }
    let claimEvent = getAllEvents(txReceipt, mekaApesContract, CLAIM_REWARD);
    let attackedEvent = getAllEvents(
      txReceipt,
      mekaApesContract,
      ATTACK_REWARD
    );
    if (claimEvent?.length > 0) {
      claimEvent.forEach((event) => {
        let ape = stakedData.find(
          (item) => +item.id === +event.args.tokenId.toNumber()
        );
        if (ape) {
          let name = getApeName(ape);
          unstakeTokens.push({
            type: "unstake",
            name: `${name} #${event.args.tokenId.toNumber()}`,
            id: event.args.tokenId.toNumber(),
            amount: ethers.utils.formatUnits(event.args.amount),
            stolen: false,
            stolenAmount: 0,
          });
        }
      });
    }
    if (attackedEvent?.length > 0) {
      let allTokens = [...unstakeTokens];
      attackedEvent.forEach((event) => {
        allTokens.forEach((token) => {
          if (+token.id === +event.args.tokenId) {
            token.stolen = true;
            token.stolenAmount = ethers.utils.formatUnits(event.args.amount);
          }
        });
      });
      unstakeTokens = [...allTokens];
    }
    setTokens(unstakeTokens);
    clearActionLoading();
    setIsResultsModalOpen(true);
  };

  const getClaimEventAndWaitSecondTx = (receipt) => {
    let { mekaApesContract } = contract;
    let firstClaimEvent = getAllEvents(receipt, mekaApesContract, CLAIM_REWARD);
    let mekaTokens = [];
    // Only meka tokens can be here
    // Robo Oogas are in the seconds tsx
    if (firstClaimEvent?.length > 0) {
      firstClaimEvent.forEach((event) => {
        let ape = stakedData.find(
          (item) => +item.id === +event.args.tokenId.toNumber()
        );
        if (ape) {
          let name = getApeName(ape);

          mekaTokens.push({
            type: "unstake",
            name: `${name} #${event.args.tokenId.toNumber()}`,
            id: event.args.tokenId.toNumber(),
            amount: ethers.utils.formatUnits(event.args.amount),
          });
        }
      });
    }
    unstakeTokensAmount.current = mekaTokens;
    makeRandomSubscription(receipt, contract, onRandomsReceived);
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
    let tokenIds = [];
    if (selectedStaked?.length > 0) {
      selectedStaked.forEach((token) => {
        if (token.owner) {
          tokenIds.push(token.id);
        }
      });

      if (tokenIds?.length > 0) {
        let gasFee = await getGasFee(selectedStaked);
        try {
          let totalGasEstimation = await getEstimatedGas(
            tokenIds,
            "unstake",
            gasFee
          );
          let tsx = await contract.unstake(
            tokenIds,
            gasFee,
            totalGasEstimation
          );
          openActionLoading(2, getActionLoadingUnstakeMessage(tokenIds));
          tsx
            .wait()
            .then((receipt) => {
              setTsxNumber(2);
              getClaimEventAndWaitSecondTx(receipt);
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
                  <BurnButton>Get Credits</BurnButton>
                  <div className="text">
                    <span>Unstaking Credits:</span>
                    <span className="numbers">0/0</span>
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
                  <p>
                    A Robo Ooga can only be unstaked when it has claimable min.
                    2,000 $OG
                  </p>
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
    </Wrapper>
  );
};

export default withConnect(Factory, "/game/factory");
