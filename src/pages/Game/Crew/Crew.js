import { useState, useEffect, useContext } from "react";
import * as Sentry from "@sentry/react";
import { useLazyQuery, useApolloClient } from "@apollo/client";
import { BigNumber, ethers } from "ethers";
import PropTypes from "prop-types";
// ******** Components ********
import { message } from "antd";
import Ape from "./Ape";
import CrewModal from "../../../components/Modals/CrewModal/CrewModal";
import Loading from "../../../components/Modals/Loading/Loading";
import ActionsLoading from "../../../components/Modals/ActionLoading/ActionLoading";
import ResultModal from "../../../components/Modals/ResultModal/ResultModal";
// ******** Queires ********
import useCrewClaimAvaliableReward from "../../../hooks/useCrewClaimAvaliableReward";
// ******** Functions ********
import { getReducedEstimatedGas, beautifyNumber } from "../Factory/helper";
import { generateCrewInformation } from "./helper";
// ******** Services ********
import contract from "../../../services/contract";
// ******** Stores ********
import { UserContext } from "../../../store/user-context";
// ******** Text ********
import { SELECT_CREW, SOMETHING_WENT_WRONG } from "../../../messages";
// ******** Queires ********
import {
  GET_STAKED_MEKA,
  GET_ROBO_OOGAS_STAKED_UPGRADE_TOKENS,
  GET_CREWS,
} from "../../../queries";
// ******** Events ********
import {
  REMOVE_CREW,
  CLAIM_CREW_REWARD,
  getAllEvents,
} from "../../../eventsListeners";
// ******** Icons ********
import { PlusOutlined } from "@ant-design/icons";
// ******** Styles ********
import {
  Wrapper,
  MainBox,
  TitleBox,
  Boxes,
  Box,
  Icon,
  Actions,
  Button,
  HelperText,
  RewardAmount,
  BoxText,
  CustomCheckbox,
  PlaceholderBox,
  Headline,
  AddCrewButton,
  EditButton,
  BoxWrapper,
  ButtonPlaceholder,
} from "./Crew.styles";

const Crew = ({ getStakedApe, getUnstakedRoboOogas, getUnstakeMekaApes }) => {
  const client = useApolloClient();
  const { userMetaMaskToken } = useContext(UserContext);
  const [clickedCrews, setClickedCrews] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [actionLoadingText, setActionLoadingText] = useState("");
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [totalClaimReward, setTotalClaimReward] = useState(0);
  const [actionType, setActionType] = useState("");
  const [clickedEditCrew, setClickedEditCrew] = useState(null);
  // Lists
  const [mekaList, setMekaList] = useState(null);
  const [roboList, setRoboList] = useState(null);
  const [crewList, setCrewList] = useState(null);
  // Meka Apes
  const [getMekas, { loading: mekaLoading, data: mekaApesData }] = useLazyQuery(
    GET_STAKED_MEKA,
    {
      fetchPolicy: "no-cache",
    }
  );
  // Robo Oogas
  const [getRobos, { loading: roboLoading, data: roboOogasData }] =
    useLazyQuery(GET_ROBO_OOGAS_STAKED_UPGRADE_TOKENS, {
      fetchPolicy: "no-cache",
    });

  // Crews
  const [getCrews, { loading: crewLoading, data: crewData }] = useLazyQuery(
    GET_CREWS,
    {
      fetchPolicy: "no-cache",
    }
  );
  // Crew Amount List
  const {
    data: claimAvaliableRewardCrewList,
    refetch: getCrewAvaliableRewards,
  } = useCrewClaimAvaliableReward(crewList);

  // Events
  const [tokens, setTokens] = useState(false);

  useEffect(() => {
    if (mekaLoading || roboLoading || crewLoading) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  }, [mekaLoading, roboLoading, crewLoading]);

  useEffect(() => {
    if (userMetaMaskToken) {
      getMekas({
        variables: {
          owner: userMetaMaskToken,
        },
      });
      getRobos({
        variables: {
          owner: userMetaMaskToken,
        },
      });
      getCrews({
        variables: {
          owner: userMetaMaskToken,
        },
      });
    }
  }, [userMetaMaskToken, getMekas, getRobos, getCrews]);

  useEffect(() => {
    if (
      crewData !== undefined &&
      crewData !== null &&
      mekaList?.length > 0 &&
      roboList?.length > 0
    ) {
      if (crewData.oogaCrews?.length > 0) {
        let allCrews = generateCrewInformation(
          crewData.oogaCrews,
          mekaList,
          roboList
        );
        setCrewList(allCrews);
      } else {
        setCrewList(null);
      }
    }
  }, [crewData, mekaList, roboList]);

  useEffect(() => {
    if (mekaApesData !== undefined && mekaApesData !== null) {
      if (mekaApesData.spaceOogas?.length > 0) {
        setMekaList(mekaApesData.spaceOogas);
      } else {
        setMekaList(null);
      }
    }
  }, [mekaApesData]);

  useEffect(() => {
    if (roboOogasData !== undefined && roboOogasData !== null) {
      if (roboOogasData.spaceOogas?.length > 0) {
        setRoboList(roboOogasData.spaceOogas);
      } else {
        setRoboList(null);
      }
    }
  }, [roboOogasData]);

  useEffect(() => {
    if (clickedCrews?.length > 0 && claimAvaliableRewardCrewList?.length > 0) {
      let total = 0;
      clickedCrews.forEach((crew) => {
        let item = claimAvaliableRewardCrewList.find(
          (crewWithReward) => crewWithReward.id === crew.id
        );
        if (item) {
          if (+item.reward > 0) {
            total = +item.reward + +total;
          }
        }
      });
      setTotalClaimReward(total);
    } else {
      setTotalClaimReward(0);
    }
  }, [clickedCrews, claimAvaliableRewardCrewList]);

  const handleOpenCreateModal = (type, crew) => () => {
    setActionType(type);
    if (type === "edit") {
      setClickedEditCrew(crew);
    }
    setIsCreateModalOpen(true);
  };

  const handleChangeSelectAll = (e) => {
    if (crewList && crewList.length > 0) {
      if (!e.target.checked) {
        setClickedCrews([]);
      } else {
        setClickedCrews([...crewList]);
      }
    }
    setSelectAll(e.target.checked);
  };

  const handleClickCrew = (item) => () => {
    if (clickedCrews?.length > 0) {
      let allCrews = [...clickedCrews];
      let index = null;
      clickedCrews.forEach((crew, i) => {
        if (crew.id === item.id) {
          index = i;
        }
      });
      if (index !== null) {
        allCrews.splice(index, 1);
        setClickedCrews(allCrews);
      } else {
        setClickedCrews([...clickedCrews, item]);
      }
    } else {
      setClickedCrews([...clickedCrews, item]);
    }
  };

  const getIfItsSelected = (id) => {
    if (clickedCrews?.length > 0) {
      return clickedCrews.find((crew) => crew.id === id);
    } else {
      return false;
    }
  };

  const handleRenderCrews = () => {
    if (claimAvaliableRewardCrewList?.length > 0) {
      return claimAvaliableRewardCrewList.map((crew, index) => {
        return (
          <BoxWrapper key={crew.id}>
            <Box
              onClick={handleClickCrew(crew)}
              active={getIfItsSelected(crew.id)}>
              <Ape
                key={`Meka #${crew?.mekaApe?.id} #${index}`}
                ape={crew?.mekaApe}
                type="meka"
              />
              <RewardAmount>
                <span>Crew reward:</span>
                {crew?.reward ? beautifyNumber(crew.reward) : 0}
              </RewardAmount>
            </Box>
            <EditButton>
              <button onClick={handleOpenCreateModal("edit", crew)}>
                Edit Crew
              </button>
            </EditButton>
          </BoxWrapper>
        );
      });
    }
  };

  const getRemoveCrewEstimatedGas = async (crewIds) => {
    let gasEstimation = await contract.mekaApesContract.estimateGas.removeCrew(
      crewIds
    );
    let totalGasEstimation = getReducedEstimatedGas(gasEstimation);
    return totalGasEstimation;
  };

  const getClaimCrewEstimatedGas = async (crewIds) => {
    let gasEstimation =
      await contract.mekaApesContract.estimateGas.claimCrewReward(crewIds);
    let totalGasEstimation = getReducedEstimatedGas(gasEstimation);
    return totalGasEstimation;
  };

  const getFreshData = async () => {
    await client.cache.reset().then(async () => {
      getMekas({
        variables: {
          owner: userMetaMaskToken,
        },
      });
      getRobos({
        variables: {
          owner: userMetaMaskToken,
        },
      });
      getCrews({
        variables: {
          owner: userMetaMaskToken,
        },
      });
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
      getCrewAvaliableRewards();
    });
  };

  const handleCloseCreateModal = async () => {
    setActionType("");
    await getFreshData();
    setClickedEditCrew(null);
    setIsCreateModalOpen(false);
  };

  const handleCloseResultsModal = async () => {
    await getFreshData();
    handleCloseCreateModal();
    setIsResultsModalOpen(false);
  };

  const getClaimEvent = async (receipt) => {
    let { mekaApesContract } = contract;
    let claimEvents = getAllEvents(
      receipt,
      mekaApesContract,
      CLAIM_CREW_REWARD
    );
    let allTokens = [];
    if (claimEvents?.length > 0) {
      let totalClaimAmount = BigNumber.from(0);
      claimEvents.forEach((event) => {
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
    await getFreshData();
    setActionLoadingText("");
    setActionLoading(false);
    setIsResultsModalOpen(true);
  };

  const getRemoveEvent = async (receipt) => {
    let { mekaApesContract } = contract;
    let removeEvent = getAllEvents(receipt, mekaApesContract, REMOVE_CREW);
    let allTokens = [];
    if (removeEvent?.length > 0) {
      removeEvent.forEach((event) => {
        let id = event.args.crewId.toNumber();
        allTokens.push({
          type: "crew-remove",
          id: id,
        });
      });
    }
    setTokens(allTokens);
    await getFreshData();
    setActionLoadingText("");
    setActionLoading(false);
    setIsResultsModalOpen(true);
  };

  const handleRemoveCrew = async () => {
    if (clickedCrews?.length > 0) {
      setIsDisabled(true);
      const crewIds = clickedCrews.map((crew) => crew.id);
      try {
        // get Gas Estimation from the contract
        let totalGasEstimation = getRemoveCrewEstimatedGas(crewIds);
        let tsx = await contract.removeCrew(crewIds, totalGasEstimation);
        setActionLoading(true);
        setActionLoadingText("Removing Crew");

        tsx
          .wait()
          .then((receipt) => {
            getRemoveEvent(receipt);
          })
          .catch((error) => {
            console.log(error);
            Sentry.captureException(new Error(error), {
              tags: {
                section: "Remove Crew tsx.wait",
              },
            });
            message.error(SOMETHING_WENT_WRONG);
            setActionLoading(false);
          });
      } catch (error) {
        console.log(error);
        Sentry.captureException(new Error(error), {
          tags: {
            section: "Remove Crew 1st tsx",
          },
        });
        message.error(SOMETHING_WENT_WRONG);
      }
      setClickedCrews([]);
      setIsDisabled(false);
    } else {
      message.error(SELECT_CREW);
    }
  };

  const handleClickClaim = async () => {
    if (clickedCrews?.length > 0) {
      setIsDisabled(true);
      const crewIds = clickedCrews.map((crew) => crew.id);
      try {
        // get Gas Estimation from the contract
        let totalGasEstimation = getClaimCrewEstimatedGas(crewIds);
        let tsx = await contract.claimCrewReward(crewIds, totalGasEstimation);
        setActionLoading(true);
        setActionLoadingText("Claim Crew");

        tsx
          .wait()
          .then((receipt) => {
            getClaimEvent(receipt);
          })
          .catch((error) => {
            console.log(error);
            Sentry.captureException(new Error(error), {
              tags: {
                section: "Claim Crew tsx.wait",
              },
            });
            message.error(SOMETHING_WENT_WRONG);
            setActionLoading(false);
          });
      } catch (error) {
        console.log(error);
        Sentry.captureException(new Error(error), {
          tags: {
            section: "Claim Crew 1st tsx",
          },
        });
        message.error(SOMETHING_WENT_WRONG);
      }
      setClickedCrews([]);
      setIsDisabled(false);
    } else {
      message.error(SELECT_CREW);
    }
  };

  return (
    <Wrapper>
      <MainBox>
        <TitleBox>
          <h4>Meka Crews</h4>
          <h6>
            Create Meka Crews by selecting a MekaApe that’s currently staked in
            the Factory. You can then add Robo Oogas to the crew to earn Crew
            $OG. The higher the Meka level, the more Robo Oogas fit into a crew.
          </h6>
        </TitleBox>
        <Headline>
          <CustomCheckbox onChange={handleChangeSelectAll} checked={selectAll}>
            Select All:
          </CustomCheckbox>
          <AddCrewButton onClick={handleOpenCreateModal("create")}>
            Create Crew
          </AddCrewButton>
        </Headline>
        <Boxes>
          {handleRenderCrews()}
          <BoxWrapper>
            <PlaceholderBox onClick={handleOpenCreateModal("create")}>
              <Icon>
                <PlusOutlined />
              </Icon>
              <BoxText>Create Crew</BoxText>
            </PlaceholderBox>
            <ButtonPlaceholder />
          </BoxWrapper>
        </Boxes>
        <Actions>
          <Button
            disabled={clickedCrews?.length === 0 || isDisabled}
            onClick={handleRemoveCrew}>
            Delete Crew
          </Button>
          <Button
            disabled={clickedCrews?.length === 0}
            claim
            onClick={handleClickClaim}>
            Claim {totalClaimReward ? beautifyNumber(totalClaimReward) : 0} $OG
          </Button>
        </Actions>
        <HelperText>
          Deleting a Crew will send the NFTs back to the Factory and all Crew
          $OG will be claimed. There’s no tax when claiming $OG from Meka Crews.
        </HelperText>
      </MainBox>
      {isCreateModalOpen && (
        <CrewModal
          open={isCreateModalOpen}
          handleCloseModal={handleCloseCreateModal}
          roboList={roboList}
          mekaList={mekaList}
          setActionLoading={setActionLoading}
          setActionLoadingText={setActionLoadingText}
          setTokens={setTokens}
          setIsResultsModalOpen={setIsResultsModalOpen}
          actionType={actionType}
          clickedEditCrew={clickedEditCrew}
        />
      )}
      {loader && <Loading open={loader} />}
      {isResultsModalOpen && (
        <ResultModal
          open={isResultsModalOpen}
          handleClose={handleCloseResultsModal}
          tokens={tokens}
        />
      )}
      {actionLoading && (
        <ActionsLoading
          open={actionLoading}
          text={actionLoadingText}
          tsxNumber={1}
          tsxTotalNumber={1}
        />
      )}
    </Wrapper>
  );
};

export default Crew;

Crew.propTypes = {
  getStakedApe: PropTypes.func.isRequired,
  getUnstakedRoboOogas: PropTypes.func.isRequired,
  getUnstakeMekaApes: PropTypes.func.isRequired,
};
