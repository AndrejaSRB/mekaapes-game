import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import * as Sentry from "@sentry/react";
import { useApolloClient } from "@apollo/client";
// ******** Components ********
import { Steps, message } from "antd";
import Ape from "./Ape";
import CrewStep from "./CrewStep";
// ******** Stores ********
import { UserContext } from "../../../store/user-context";
// ******** Functions ********
import { getReducedEstimatedGas } from "../../../pages/Game/Factory/helper";
import { getAddedRobos, getDeletedRobos, getListIds } from "./helper";
// ******** TEXT ********
import {
  SOMETHING_WENT_WRONG,
  ACTION_LOADING_CREW_CREATION,
  ACTION_LOADING_UPGRADE_CREATION,
} from "../../../messages";
// ******** Events ********
import {
  MAKE_CREW,
  getEvent,
  ADD_TO_CREW,
  REMOVE_FROM_CREW,
} from "../../../eventsListeners";
// ******** Service ********
import contract from "../../../services/contract";
// ******** Images ********
import PlaceholderApe from "../../../assets/placeholder_ape.png";
// ******** Styles ********
import {
  ModalWrapper,
  Title,
  Subtitle,
  ApesBox,
  Text,
  Button,
  CancelBtn,
  ButtonWrapper,
  NotFoundItem,
  HelperText,
  SelectedText,
  CustomStep,
  StepsWrapper,
} from "./CrewModal.styles";

const NoItemFound = () => (
  <NotFoundItem>
    <img src={PlaceholderApe} alt="placeholder" />
    <p>No items found!</p>
  </NotFoundItem>
);

const CrewModal = ({
  open,
  handleCloseModal,
  roboList,
  mekaList,
  setActionLoading,
  setActionLoadingText,
  setTokens,
  setIsResultsModalOpen,
  actionType,
  clickedEditCrew,
}) => {
  const client = useApolloClient();
  const { userMetaMaskToken } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [clickedMeka, setClickedMeka] = useState(null);
  const [clickedRobos, setClickedRobos] = useState([]);
  const [spots, setSpots] = useState(3);
  const [mekaListLength, setMekaListLength] = useState(0);
  const [roboListLength, setRoboListLength] = useState(0);
  const [step, setStep] = useState(1);
  const [isDisable, setIsDisable] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (clickedEditCrew) {
      setClickedMeka(clickedEditCrew.mekaApe);
      if (clickedEditCrew?.roboOogas?.length > 0) {
        setClickedRobos([...clickedEditCrew?.roboOogas]);
        setRoboListLength(clickedEditCrew?.roboOogas?.length);
      }
      setIsEditMode(true);
      setStep(2);
    } else {
      setIsEditMode(false);
    }
  }, [clickedEditCrew]);

  // Get spots for MekaApe Level
  useEffect(() => {
    if (step === 2 && clickedMeka) {
      const getSpots = async () => {
        let crewSpots = await contract.getMaxCrewForMekaLevel(
          clickedMeka.level
        );
        setSpots(crewSpots);
      };
      getSpots();
    }
  }, [step, clickedMeka]);

  useEffect(() => {
    if (step === 1) {
      let avaliableMekaList = mekaList.filter(
        (meka) => meka.crewId === null || meka.crewId === undefined
      );
      setData(avaliableMekaList);
      setMekaListLength(avaliableMekaList.length);
    } else if (step === 2) {
      if (actionType === "edit") {
        let avaliableRoboList = roboList.filter(
          (robo) => robo.crewId === null || robo.crewId === undefined
        );
        if (clickedEditCrew?.roboOogas?.length > 0) {
          let allRobos = [...clickedEditCrew?.roboOogas, ...avaliableRoboList];
          setData(allRobos);
          setRoboListLength(allRobos.length);
        } else {
          setData(roboList);
          setRoboListLength(roboList.length);
        }
      } else {
        let avaliableRoboList = roboList.filter(
          (robo) => robo.crewId === null || robo.crewId === undefined
        );
        setData(avaliableRoboList);
        setRoboListLength(avaliableRoboList.length);
      }
    }
  }, [step, mekaList, roboList, actionType, clickedEditCrew]);

  const handleClickMeka = (ape) => {
    if (clickedMeka) {
      if (clickedMeka.id === ape.id) {
        setClickedMeka(null);
      } else {
        setClickedMeka(ape);
      }
    } else {
      setClickedMeka(ape);
    }
  };

  // Kick robo from the selected list
  const handleKickRobo = (ape) => {
    let allRobos = [...clickedRobos];
    let index = null;
    allRobos.forEach((robo, i) => {
      if (robo.id === ape.id) {
        index = i;
      }
    });
    if (index !== null) {
      allRobos.splice(index, 1);
      setClickedRobos(allRobos);
    } else {
      setClickedRobos([...allRobos, ape]);
    }
  };

  const handleClickRobo = (ape) => {
    if (clickedRobos?.length !== spots) {
      let elementPos = clickedRobos
        .map((robo) => {
          return robo.id;
        })
        .indexOf(ape.id);

      if (elementPos === -1) {
        setClickedRobos([...clickedRobos, ape]);
      } else {
        handleKickRobo(ape);
      }
    } else {
      let elementPos = clickedRobos
        .map((robo) => {
          return robo.id;
        })
        .indexOf(ape.id);
      if (elementPos !== -1) {
        handleKickRobo(ape);
      }
    }
  };

  // handle Click Ape
  const handleClickApe = (ape, image, type) => () => {
    let clickedApe = { ...ape };
    clickedApe.image = image;
    clickedApe.img = image;
    if (type === 1) {
      handleClickMeka(clickedApe);
    } else if (type === 2) {
      handleClickRobo(clickedApe);
    }
  };

  // Check if Robo is Active
  const getIfRoboIsActive = (id) => {
    if (clickedRobos?.length > 0) {
      return clickedRobos.find((item) => item.id === id);
    } else {
      return false;
    }
  };

  const getIfActive = (id, type) => {
    if (type === 1) {
      if (clickedMeka) {
        if (clickedMeka.id === id) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else if (type === 2) {
      let isActive = getIfRoboIsActive(id);
      return isActive;
    }
  };

  const getLength = () => {
    if (step === 1) {
      return mekaListLength;
    } else if (step === 2) {
      return roboListLength;
    }
  };

  const getIfItsDisabled = () => {
    if (isDisable) {
      return true;
    } else if (step === 1) {
      if (!clickedMeka) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const handleRenderElements = () => {
    if (data && data.length > 0) {
      return data.map((ape) => (
        <Ape
          key={ape.id}
          handleClickApe={handleClickApe}
          getIfActive={getIfActive}
          type={step}
          ape={ape}
        />
      ));
    } else {
      return <NoItemFound />;
    }
  };

  const renderTitle = () => {
    if (step === 1) {
      return "Meka Ape";
    } else if (step === 2) {
      return "Robo Oogas";
    } else if (step === 3) {
      return "The Crew";
    }
  };

  const renderSubTitle = () => {
    if (step === 1) {
      return "Select the Meka Ape you want to be a lead of the crew.";
    } else if (step === 2) {
      return "Select the Robo Oogas which would like to be the crew.";
    } else if (step === 3) {
      return "Here's the crew overview.";
    }
  };

  const renderText = () => {
    if (step === 1) {
      return `Click "Next" to see the Robo Oogas list.`;
    } else if (step === 2) {
      return `Click "Next" to see the crew overview.`;
    } else if (step === 3) {
      return `By clicking "Create" you will create your crew.`;
    }
  };

  const handleClickBack = () => {
    if (step !== 1) {
      setStep(step - 1);
    }
  };

  const handleClickNext = () => {
    if (step !== 3) {
      setStep(step + 1);
    }
  };

  const getFreshTokens = async () => {
    await client.cache.reset().then(async () => {
      await client.refetchQueries({
        include: ["GetCrews","GetStakedApe","GetStakedRoboOogasUpgrade"],
      });
    });
  };


  const getChangeEvent = async (receipt, removedTokenIds, addedTokenIds) => {
    let { mekaApesContract } = contract;
    let addToEvent = null;
    if (addedTokenIds?.length > 0) {
      addToEvent = getEvent(receipt, mekaApesContract, ADD_TO_CREW);
    }
    let removeToEvent = null;
    if (removedTokenIds?.length > 0) {
      removeToEvent = getEvent(receipt, mekaApesContract, REMOVE_FROM_CREW);
    }
    let allTokens = [];
    if (addToEvent) {
      let id = addToEvent.args.crewId.toNumber();
      allTokens.push({
        type: "crew-change",
        id: id,
      });
    } else if (removeToEvent) {
      let id = removeToEvent.args.crewId.toNumber();
      allTokens.push({
        type: "crew-change",
        id: id,
      });
    }
    setTokens(allTokens);
    await getFreshTokens();
    setActionLoadingText("");
    setActionLoading(false);
    setIsResultsModalOpen(true);
  };

  const getCreateEvent = async (receipt) => {
    let { mekaApesContract } = contract;
    let createEvent = getEvent(receipt, mekaApesContract, MAKE_CREW);
    let allTokens = [];
    if (createEvent) {
      if (
        createEvent.args.account.toLowerCase() ===
        userMetaMaskToken.toLowerCase()
      ) {
        let id = createEvent.args.crewId.toNumber();
        allTokens.push({
          type: "crew-create",
          id: id,
        });
      }
    }
    setTokens(allTokens);
    await getFreshTokens();
    setActionLoadingText("");
    setActionLoading(false);
    setIsResultsModalOpen(true);
  };

  const getCreateEstimatedGas = async (tokenIds) => {
    let gasEstimation = await contract.mekaApesContract.estimateGas.createCrew(
      tokenIds
    );
    let totalGasEstimation = getReducedEstimatedGas(gasEstimation);
    return totalGasEstimation;
  };

  const getUpgradeEstimatedGas = async (
    crewIds,
    addedTokensIds,
    removedTokenIds
  ) => {
    let gasEstimation = await contract.mekaApesContract.estimateGas.changeCrew(
      crewIds,
      addedTokensIds,
      removedTokenIds
    );
    let totalGasEstimation = getReducedEstimatedGas(gasEstimation);
    return totalGasEstimation;
  };

  const handleClickCreate = async () => {
    setIsDisable(true);
    if (clickedMeka?.id) {
      let crewTokenIds = [clickedMeka.id];
      if (clickedRobos?.length > 0) {
        clickedRobos.forEach((robo) => crewTokenIds.push(robo.id));
      }
      setActionLoadingText(ACTION_LOADING_CREW_CREATION);
      try {
        // get Gas Estimation from the contract
        let totalGasEstimation = getCreateEstimatedGas(crewTokenIds);
        let tsx = await contract.createCrew(crewTokenIds, totalGasEstimation);
        setActionLoading(true);
        setActionLoadingText("Create Crew");
        tsx
          .wait()
          .then(async (receipt) => {
            getCreateEvent(receipt);
          })
          .catch((error) => {
            console.log(error);
            Sentry.captureException(new Error(error), {
              tags: {
                section: "Crew Create tsx.wait",
              },
            });
            message.error(SOMETHING_WENT_WRONG);
            setActionLoading(false);
          });
      } catch (error) {
        console.log(error);
        Sentry.captureException(new Error(error), {
          tags: {
            section: "Crew Create 1st tsx",
          },
        });
        message.error(SOMETHING_WENT_WRONG);
      }
    }
    setIsDisable(false);
    handleCloseModal();
  };

  const handleClickUpdate = async () => {
    setIsDisable(true);

    let originalRobos = [];
    if (clickedEditCrew.roboOogas?.length > 0) {
      originalRobos = [...clickedEditCrew.roboOogas];
    }

    let newRobos = [];
    if (clickedRobos?.length > 0) {
      newRobos = [...clickedRobos];
    }

    let added = getAddedRobos(newRobos, originalRobos);
    let removed = getDeletedRobos(clickedRobos, originalRobos);

    let removedTokenIds = getListIds(removed);
    let addedTokenIds = getListIds(added);

    let crewId = clickedEditCrew.id;

    setActionLoadingText(ACTION_LOADING_UPGRADE_CREATION);
    try {
      let totalGasEstimation = getUpgradeEstimatedGas(
        crewId,
        addedTokenIds,
        removedTokenIds
      );
      let tsx = await contract.changeCrew(
        crewId,
        addedTokenIds,
        removedTokenIds,
        totalGasEstimation
      );
      setActionLoading(true);
      setActionLoadingText("Change Crew");
      tsx
        .wait()
        .then(async (receipt) => {
          getChangeEvent(receipt, removedTokenIds, addedTokenIds);
        })
        .catch((error) => {
          console.log(error);
          Sentry.captureException(new Error(error), {
            tags: {
              section: "Crew Change tsx.wait",
            },
          });
          message.error(SOMETHING_WENT_WRONG);
          setActionLoading(false);
        });
    } catch (error) {
      console.log(error);
      Sentry.captureException(new Error(error), {
        tags: {
          section: "Crew Create 1st tsx",
        },
      });
      message.error(SOMETHING_WENT_WRONG);
    }
  };

  return (
    <ModalWrapper
      visible={open}
      onCancel={handleCloseModal}
      centered
      width={744}
      maskClosable={false}>
      <div className="content">
        <Title>{renderTitle()}</Title>
        <Subtitle>{renderSubTitle()}</Subtitle>
        {step !== 3 && (
          <ApesBox length={getLength()}>{handleRenderElements()}</ApesBox>
        )}
        {step === 3 && (
          <CrewStep clickedMeka={clickedMeka} clickedRobos={clickedRobos} />
        )}
        {step === 2 && (
          <SelectedText>
            Selected: {clickedRobos?.length ? clickedRobos.length : 0}/{spots}
          </SelectedText>
        )}
        <ButtonWrapper>
          {step === 3 ? (
            isEditMode ? (
              <Button onClick={handleClickUpdate}>Update</Button>
            ) : (
              <Button onClick={handleClickCreate}>Create</Button>
            )
          ) : (
            <Button onClick={handleClickNext} disabled={getIfItsDisabled()}>
              Next
            </Button>
          )}
          {step === 1 ? (
            <CancelBtn onClick={handleCloseModal}>Close</CancelBtn>
          ) : isEditMode && step === 2 ? (
            <div />
          ) : (
            <CancelBtn onClick={handleClickBack}>Back</CancelBtn>
          )}
        </ButtonWrapper>
        <Text>{renderText()}</Text>
        <StepsWrapper>
          <Steps current={step - 1} progressDot>
            <CustomStep title="Pick MekaApe" description="" />
            <CustomStep title="Pick Robo Oogas" description="" />
            <CustomStep title="Overview" description="" />
          </Steps>
        </StepsWrapper>
        <HelperText>Step: {step}/3</HelperText>
      </div>
    </ModalWrapper>
  );
};

export default CrewModal;

CrewModal.propTypes = {
  open: PropTypes.bool.isRequired,
  roboList: PropTypes.array,
  mekaList: PropTypes.array,
  handleCloseModal: PropTypes.func.isRequired,
  setActionLoadingText: PropTypes.func.isRequired,
  setActionLoading: PropTypes.func.isRequired,
};
