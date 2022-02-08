// ******** Styles ********
import { Wrapper, Box, ButtonWrapper } from "./ClaimReward.styles";

const ClaimReward = () => {
  return (
    <Wrapper>
      <Box>
        <h4>Claim Reward</h4>
        <p>
          Congratulations you were <span>#231</span> in stage 1 and you get
          <span> 5,000,000 $OG</span> claim reward.
        </p>
        {/* <p>
          We are sorry, but you didn't manage to place yourself in one of the
          first 420 positions.
        </p> */}
        <ButtonWrapper>
          <button>Claim</button>
        </ButtonWrapper>
      </Box>
    </Wrapper>
  );
};

export default ClaimReward;
