import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ethers, BigNumber } from "ethers";
// ******** Components ********
import { message } from "antd";
import ActionsLoading from "../Modals/ActionLoading/ActionLoading";
// ******** JSON ********
import stageOneRewardJSON from "../../config/stage1rewardsSignatures.json";
// ******** Function ********
import {
  beautifyPrice,
  getReducedEstimatedGas,
} from "../../pages/Game/Factory/helper";
// ******** Text ********
import {
  SOMETHING_WENT_WRONG,
  ACTION_LOADING_CLAIM_STAGE_ONE_REWARD,
} from "../../messages";
// ******** contract ********
import contract from "../../services/contract_2";
// ******** Styles ********
import { Wrapper, Box, ButtonWrapper } from "./ClaimReward.styles";

const ClaimReward = ({
  address,
  getHasStageOneReward,
  hasClaimStageOneReward,
  setHasClaimStageOneReward,
  setIsResultsModalOpen,
  setTokens,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [hasReward, setHasReward] = useState(true);
  const [reward, setReward] = useState(BigNumber.from(0));
  const [place, setPlace] = useState(0);
  const [signature, setSignature] = useState(null);
  const [isOnTheList, setIsOnTheList] = useState(false);

  // Results
  const [actionLoading, setActionLoading] = useState(false);
  const [actionLoadingText, setActionLoadingText] = useState("");

  useEffect(() => {
    if (address) {
      let userFromTheList = stageOneRewardJSON.find(
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
    if (address && hasClaimStageOneReward) {
      if (stageOneRewardJSON?.length > 0) {
        let userFromTheList = stageOneRewardJSON.find(
          (user) => user.address.toLowerCase() === address.toLowerCase()
        );
        if (userFromTheList) {
          setHasReward(true);
          const { place, rewardSign } = userFromTheList;
          setPlace(place);
          setReward(ethers.utils.formatUnits(rewardSign.reward));
          let rewardSignature = {
            ...rewardSign,
            reward: BigNumber.from(rewardSign.reward),
          };
          setSignature(rewardSignature);
        } else {
          setHasReward(false);
          setReward(BigNumber.from(0));
          setSignature(null);
        }
      }
    } else {
      setHasReward(false);
      setReward(BigNumber.from(0));
      setSignature(null);
    }
  }, [address, hasClaimStageOneReward]);

  const getEstimatedGas = async (rewardSign) => {
    let gasEstimation =
      await contract.mekaApesContract.estimateGas.claimLeaderbordReward(
        rewardSign
      );
    let totalGasEstimation = getReducedEstimatedGas(gasEstimation);
    return totalGasEstimation;
  };

  const handleClickClaim = async () => {
    setIsDisabled(true);
    if (signature && hasReward) {
      try {
        // get Gas Estimation from the contract
        let totalGasEstimation = getEstimatedGas(signature);
        let tsx = await contract.claimLeaderbordReward(
          signature,
          totalGasEstimation
        );
        setActionLoading(true);
        setActionLoadingText(ACTION_LOADING_CLAIM_STAGE_ONE_REWARD);
        tsx
          .wait()
          .then(() => {
            getHasStageOneReward();
            setActionLoading(false);
            setActionLoadingText("");
            setTokens([
              {
                type: "stage-one-claim",
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
    <Wrapper>
      <Box>
        <h4>Claim Reward</h4>
        {hasReward && (
          <p>
            Congratulations you were <span>#{place}</span> in stage 1 and you
            get
            <span> {reward && beautifyPrice(reward)} $OG</span> claim reward.
          </p>
        )}
        {!hasReward && !isOnTheList  && (
          <p>
            We are sorry, but you didn't manage to place yourself in one of the
            first 420 positions.
          </p>
        )}
        {!hasReward && isOnTheList  && (
          <p>
            You have already claimed your reward.
          </p>
        )}
        {hasReward && (
          <ButtonWrapper onClick={handleClickClaim}>
            <button disabled={isDisabled}>Claim</button>
          </ButtonWrapper>
        )}
      </Box>

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

export default ClaimReward;

ClaimReward.propTypes = {
  address: PropTypes.string,
  getHasStageOneReward: PropTypes.func.isRequired,
  hasStageOneReward: PropTypes.bool,
  setIsResultsModalOpen: PropTypes.func.isRequired,
  setTokens: PropTypes.func.isRequired,
};
