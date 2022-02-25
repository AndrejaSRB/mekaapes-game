import { useState, useEffect, useContext } from "react";
import { useApolloClient } from "@apollo/client";
import PropTypes from "prop-types";
import * as Sentry from "@sentry/react";
// ******** Components ********
import { message } from "antd";
import Ape from "./Ape";
import ActionsLoading from "../ActionLoading/ActionLoading";
// ******** Images ********
import PlaceholderApe from "../../../assets/placeholder_ape.png";
// ******** Functions ********
import { getReducedEstimatedGas } from "../../../pages/Game/Factory/helper";
// ******** Store ********
import { BalanceContext } from "../../../store/balance-context";
import { UserContext } from "../../../store/user-context";
// ******** Services ********
import contract from "../../../services/contract";
// ******** Events ********
import { LEVELUP_ROBO, getAllEvents } from "../../../eventsListeners";
// ******** Text ********
import {
  SOMETHING_WENT_WRONG,
  getActionLoadingUpgrade,
  ACTION_BRUNING_ROBO,
} from "../../../messages";
// ******** Styles ********
import {
  ModalWrapper,
  Title,
  Subtitle,
  RoboApesBox,
  Text,
  Button,
  CancelBtn,
  ButtonWrapper,
  NotFoundItem,
  HelperText,
} from "./BurnRoboModal.styles";

const NoItemFound = () => (
  <NotFoundItem>
    <img src={PlaceholderApe} alt="placeholder" />
    <p>No items found!</p>
  </NotFoundItem>
);

const BurnRoboModal = ({
  open,
  handleCloseModal,
  roboList,
  type,
  tokenUpgrade,
  levels,
  setIsResultsModalOpen,
  setTokens,
}) => {
  const client = useApolloClient();
  const { getOogearBalance } = useContext(BalanceContext);
  const { userMetaMaskToken } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [clickedRobos, setClickedRobos] = useState([]);
  const [listLength, setListLength] = useState(0);
  const [spots, setSpots] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  //   const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  // Events
  //   const [tokens, setTokens] = useState(null);
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    if (type === "upgrade") {
      setSpots(levels);
    } else {
      if (roboList?.length > 0) {
        setSpots(roboList?.length);
      } else {
        setSpots(900);
      }
    }
  }, [levels, type, roboList]);

  useEffect(() => {
    if (type === "upgrade") {
      if (roboList && roboList.length > 0 && tokenUpgrade) {
        let apes = roboList.filter((ape) => ape.level < 6);
        let uniqueApes = apes.filter((ape) => ape.id !== tokenUpgrade.id);
        setData(uniqueApes);
        setListLength(uniqueApes.length);
      }
    } else {
      if (roboList && roboList.length > 0) {
        let apes = roboList.filter((ape) => ape.level < 6);
        setData(apes);
        setListLength(apes.length);
      }
    }
  }, [roboList, type, tokenUpgrade]);

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
  const handleClickApe = (ape, image) => () => {
    let clickedApe = { ...ape };
    clickedApe.image = image;
    clickedApe.img = image;
    handleClickRobo(clickedApe);
  };

  // Check if Robo is Active
  const getIfRoboIsActive = (id) => {
    if (clickedRobos?.length > 0) {
      return clickedRobos.find((item) => item.id === id);
    } else {
      return false;
    }
  };

  const getIfActive = (id) => {
    let isActive = getIfRoboIsActive(id);
    return isActive;
  };

  const handleRenderElements = () => {
    if (data && data.length > 0) {
      return data.map((ape) => (
        <Ape
          key={ape.id}
          handleClickApe={handleClickApe}
          getIfActive={getIfActive}
          ape={ape}
        />
      ));
    } else {
      return <NoItemFound />;
    }
  };

  const getIfBtnIsUpgradeDisabled = () => {
    if (isDisabled) {
      return true;
    } else if (listLength < 1) {
      return true;
    } else if (+clickedRobos?.length !== +spots) {
      return true;
    } else {
      return false;
    }
  };

  const getIfBtnIsBurnDisabled = () => {
    if (isDisabled) {
      return true;
    } else if (listLength < 1) {
      return true;
    } else if (clickedRobos?.length < 1) {
      return true;
    } else {
      return false;
    }
  };

  const getFreshUpgradeData = async () => {
    await client.cache.reset().then(async () => {
      await client.refetchQueries({
        include: ["GetUnstakedRoboOogasUpgrade", "GetStakedRoboOogasUpgrade"],
      });
    });
  };

  const getUpgradeEvent = (receipt) => {
    let { mekaApesContract } = contract;
    let upgradeEvent = getAllEvents(receipt, mekaApesContract, LEVELUP_ROBO);
    let allTokens = [];
    if (upgradeEvent?.length > 0) {
      let event = upgradeEvent[upgradeEvent.length - 1];
      if (
        event.args.account.toLowerCase() === userMetaMaskToken.toLowerCase()
      ) {
        let id = event.args.oogaId.toNumber();
        let level = event.args.newLevel.toNumber();
        allTokens.push({
          type: "upgrade",
          id: id,
          level: level,
        });
      }
    }
    setTokens(allTokens);
    getFreshUpgradeData();
    setActionLoading(false);
    setIsResultsModalOpen(true);
  };

  const getEstimatedBurnGas = async (roboIds) => {
    let gasEstimation =
      await contract.mekaApesContract.estimateGas.burnOogaForUnstakeCredits(
        roboIds
      );
    let totalGasEstimation = getReducedEstimatedGas(gasEstimation);
    return totalGasEstimation;
  };

  const getEstimatedUpgradeGas = async (id, levels, roboIds) => {
    let gasEstimation =
      await contract.mekaApesContract.estimateGas.levelUpRoboOogaWithOG(
        id,
        levels,
        roboIds
      );
    let totalGasEstimation = getReducedEstimatedGas(gasEstimation);
    return totalGasEstimation;
  };

  const handleUpgrade = async () => {
    if (tokenUpgrade && levels >= 1 && clickedRobos?.length > 0) {
      const roboIds = clickedRobos.map((robo) => robo.id);
      if (+roboIds.length === +levels) {
        setIsDisabled(true);
        setLoadingText(getActionLoadingUpgrade(tokenUpgrade.id));
        try {
          // get Gas Estimation from the contract
          let totalGasEstimation = getEstimatedUpgradeGas(
            tokenUpgrade.id,
            levels,
            roboIds
          );
          let tsx = await contract.levelUpRoboOogaWithOG(
            tokenUpgrade.id,
            levels,
            roboIds,
            totalGasEstimation
          );
          setActionLoading(true);
          tsx
            .wait()
            .then(async (receipt) => {
              getUpgradeEvent(receipt);
              getOogearBalance();
            })
            .catch((error) => {
              console.log(error);
              Sentry.captureException(new Error(error), {
                tags: {
                  section: "Robo Upgrade with $OG tsx.wait",
                },
              });
              message.error(SOMETHING_WENT_WRONG);
              setActionLoading(false);
            });
        } catch (error) {
          console.log(error);
          Sentry.captureException(new Error(error), {
            tags: {
              section: "Robo Upgrade with $OG 1st tsx",
            },
          });
          message.error(SOMETHING_WENT_WRONG);
        }
        setIsDisabled(false);
      }
    }

    setClickedRobos([]);
    setListLength(0);
  };

  const handleBurn = async () => {
    if (clickedRobos?.length > 0) {
      const roboIds = clickedRobos.map((robo) => robo.id);
      setIsDisabled(true);
      setLoadingText(ACTION_BRUNING_ROBO);
      try {
        let totalGasEstimation = getEstimatedBurnGas(roboIds);
        let tsx = await contract.burnOogaForUnstakeCredits(
          roboIds,
          totalGasEstimation
        );
        setActionLoading(true);
        tsx
          .wait()
          .then(async (receipt) => {
            setTokens([
              {
                type: "burn",
              },
            ]);
            getFreshUpgradeData();
            setActionLoading(false);
            setIsResultsModalOpen(true);
            // getUpgradeEvent(receipt);
          })
          .catch((error) => {
            console.log(error);
            Sentry.captureException(new Error(error), {
              tags: {
                section: "Burning Robo tsx.wait",
              },
            });
            message.error(SOMETHING_WENT_WRONG);
            setActionLoading(false);
          });
      } catch (error) {
        console.log(error);
        Sentry.captureException(new Error(error), {
          tags: {
            section: "Burning Robo 1st tsx",
          },
        });
        message.error(SOMETHING_WENT_WRONG);
      }
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
        <Title>Robo Oogas</Title>
        {type === "upgrade" ? (
          <Subtitle>
            Select the Robo Oogas to be burnt with each level up.
          </Subtitle>
        ) : (
          <Subtitle>
            Select the Robo Ooga you want to burn for unstake credits. <br />
            Each level brings a larger number of credits.
          </Subtitle>
        )}
        <RoboApesBox length={listLength}>{handleRenderElements()}</RoboApesBox>
        {type === "upgrade" ? (
          <HelperText>
            Please select {spots} Robo Oogas. Selected{" "}
            {clickedRobos?.length ? clickedRobos?.length : 0}/{spots}
          </HelperText>
        ) : (
          <HelperText>
            You have selected {clickedRobos?.length ? clickedRobos?.length : 0}.
          </HelperText>
        )}
        <ButtonWrapper>
          <Button
            disabled={
              type === "upgrade"
                ? getIfBtnIsUpgradeDisabled()
                : getIfBtnIsBurnDisabled()
            }
            onClick={type === "upgrade" ? handleUpgrade : handleBurn}>
            {type === "upgrade" ? "Upgrade" : "Burn"}
          </Button>
          <CancelBtn onClick={handleCloseModal}>Cancel</CancelBtn>
        </ButtonWrapper>
        {type === "upgrade" ? (
          <Text>
            By clicking “Upgrade” the new levels will be applied, and the
            selected Robo Ooga will be burnt.
          </Text>
        ) : (
          <Text>
            By clicking "Burn" you will burn selected Robo Oogas, and you will
            get new amount of unstake credits.
          </Text>
        )}
      </div>
      {actionLoading && (
        <ActionsLoading
          open={actionLoading}
          text={loadingText}
          tsxNumber={1}
          tsxTotalNumber={1}
        />
      )}
    </ModalWrapper>
  );
};

export default BurnRoboModal;

BurnRoboModal.propTypes = {
  open: PropTypes.bool.isRequired,
  roboList: PropTypes.array,
  handleCloseModal: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  tokenUpgrade: PropTypes.object,
  levels: PropTypes.number,
};
