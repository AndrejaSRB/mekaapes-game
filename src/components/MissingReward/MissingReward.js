import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { ethers, BigNumber } from "ethers";
// ******** Components ********
import { message } from "antd";
import ActionsLoading from "../Modals/ActionLoading/ActionLoading";
// ******** JSON ********
import missingRewardsJSON from "../../config/missing-rewards-signatures.json";
// ******** Function ********
import {
  beautifyPrice,
  getReducedEstimatedGas,
} from "../../pages/Game/Factory/helper";
// ******** contract ********
import contract from "../../services/contract_2";
// ******** Store ********
import { BalanceContext } from "../../store/balance-context";
// ******** Text ********
import {
  SOMETHING_WENT_WRONG,
  ACTION_LOADING_CLAIM_STAGE_ONE_REWARD,
} from "../../messages";
// ******** Styles ********
import {
  HelperTitle,
  HelperText,
  RewardsAction,
  Button,
} from "./MissingReward.styles";

const MissingReward = ({
  hasClaimedMissingReward,
  getMissingRewardStatus,
  address,
  setIsResultsModalOpen,
  setTokens,
}) => {
  const { getOogearBalance } = useContext(BalanceContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const [hasReward, setHasReward] = useState(true);
  const [reward, setReward] = useState(BigNumber.from(0));
  const [isOnTheList, setIsOnTheList] = useState(false);
  const [signature, setSignature] = useState(null);

  // Results
  const [actionLoading, setActionLoading] = useState(false);
  const [actionLoadingText, setActionLoadingText] = useState("");

  useEffect(() => {
    if (address) {
      let userFromTheList = missingRewardsJSON.find(
        (user) => user.address.toLowerCase() === address.toLowerCase()
      );
      if (userFromTheList) {
        setIsOnTheList(true);
      } else {
        setIsOnTheList(false);
      }
    }
  }, [address]);

  useEffect(() => {
    if (address && hasClaimedMissingReward) {
      if (missingRewardsJSON?.length > 0) {
        let userFromTheList = missingRewardsJSON.find(
          (user) => user.address.toLowerCase() === address.toLowerCase()
        );
        if (userFromTheList) {
          setHasReward(true);
          const { rewardSign } = userFromTheList;
          setReward(ethers.utils.formatUnits(rewardSign.reward));
          let rewardSignature = {
            ...rewardSign,
            reward: BigNumber.from(rewardSign.reward),
          };
          setSignature(rewardSignature);
        } else {
          setHasReward(false);
          setSignature(null);
        }
      }
    } else {
      setHasReward(false);
      setReward(BigNumber.from(0));
      setSignature(null);
    }
  }, [address, hasClaimedMissingReward]);

  const getEstimatedGas = async (rewardSign) => {
    let gasEstimation =
      await contract.mekaApesContract.estimateGas.recoverLostOG(rewardSign);
    let totalGasEstimation = getReducedEstimatedGas(gasEstimation);
    return totalGasEstimation;
  };

  const handleClickClaim = async () => {
    setIsDisabled(true);
    if (signature && hasReward) {
      try {
        // get Gas Estimation from the contract
        let totalGasEstimation = getEstimatedGas(signature);
        let tsx = await contract.recoverLostOG(signature, totalGasEstimation);
        setActionLoading(true);
        setActionLoadingText(ACTION_LOADING_CLAIM_STAGE_ONE_REWARD);
        tsx
          .wait()
          .then(() => {
            getOogearBalance();
            getMissingRewardStatus();
            setActionLoading(false);
            setActionLoadingText("");
            setTokens([
              {
                type: "crew-missing-reward",
              },
            ]);
            setIsResultsModalOpen(true);
          })
          .catch((error) => {
            console.log(error);
            message.error(SOMETHING_WENT_WRONG);
            setActionLoading(false);
          });
      } catch (error) {
        console.log(error);
        message.error(SOMETHING_WENT_WRONG);
      }
    }

    setIsDisabled(false);
  };

  return (
    <>
      <HelperTitle>Missing Rewards</HelperTitle>
      <HelperText>
        {hasReward && (
          <p>
            You are eligible for a refund of $OG. The amount available to claim
            is <span> {reward && beautifyPrice(reward)} $OG</span> $OG.
          </p>
        )}
        {!hasReward && !isOnTheList && (
          <p>We are sorry, but you are not eligible for a refund of $OG.</p>
        )}
        {!hasReward && isOnTheList && (
          <p>You have already claimed your $OG refund.</p>
        )}
      </HelperText>
      {hasReward && (
        <RewardsAction>
          <Button disabled={isDisabled} onClick={handleClickClaim}>
            Collect {reward && beautifyPrice(reward)} $OG Rewards
          </Button>
        </RewardsAction>
      )}
      {actionLoading && (
        <ActionsLoading
          open={actionLoading}
          text={actionLoadingText}
          tsxNumber={1}
          tsxTotalNumber={1}
        />
      )}
    </>
  );
};

export default MissingReward;

MissingReward.propTypes = {
  hasClaimedMissingReward: PropTypes.bool,
  getMissingRewardStatus: PropTypes.func.isRequired,
  address: PropTypes.string,
  setIsResultsModalOpen: PropTypes.func.isRequired,
  setTokens: PropTypes.func.isRequired,
};
