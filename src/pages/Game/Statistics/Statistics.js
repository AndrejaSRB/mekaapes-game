import { useEffect, useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { ethers } from "ethers";
// ******** Components ********
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Loading from "../../../components/Modals/Loading/Loading";
import OogaAttacked from "../OogaAttacked/OogaAttacked";
// ******** Store ********
import { UserContext } from "../../../store/user-context";
// ******** Hooks ********
import useDailyUsers from "../../../hooks/useDailyUsers";
import useTotalAmountMintedTokens from "../../../hooks/useTotalAmountMintedTokens";
// ******** HOC ********
import withConnect from "../../../hoc/withConnect";
// ******** Funcstions ********
import { beautifyNumber, beautifyPrice } from "../Factory/helper";
// ******** Queires ********
import { GET_LEADERBOARD } from "../../../queries";
// ******** Styles ********
import {
  Wrapper,
  Title,
  Content,
  Box,
  Holder,
  Stats,
  TotalText,
  LeaderboardsBox,
  Place,
  BoardWrapper,
  StatsBox,
} from "./Statistics.styles";

const Statistics = () => {
  const { userMetaMaskToken } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const { loading, data } = useQuery(GET_LEADERBOARD);
  const { data: dailyUsers, isLoading: dailyUsersIsLoading } = useDailyUsers();
  const { data: totalMintedTokens, isLoading: totalAmountLoading } =
    useTotalAmountMintedTokens(userMetaMaskToken);

  useEffect(() => {
    if (loading || dailyUsersIsLoading || totalAmountLoading) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  }, [loading, dailyUsersIsLoading, totalAmountLoading]);

  const reduceAddress = (address) => {
    if (address && typeof address === "string") {
      let string = address;
      let userAddress = address;
      let firstSix = userAddress.slice(0, 6);
      let lastFour = userAddress.slice(-4);
      string = `${firstSix}...${lastFour}`;
      return string;
    }
  };

  const renderLeaderboard = () => {
    if (data?.owners?.length > 0) {
      let { owners } = data;
      return owners.map((user, index) => {
        let position = "";
        if (index === 0) {
          position = "first";
        } else if (index === owners.length - 1) {
          position = "last";
        }
        let value = ethers.utils.formatUnits(user.ooGear);
        return (
          <Place position={position} key={user.id}>
            <span>{reduceAddress(user.id)}</span>
            <span className="number">{beautifyNumber(value)}</span>
          </Place>
        );
      });
    }
  };

  const getBeautifiedNumber = (value) =>
    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const getPercent = (a, b) => {
    const percent = (a / b) * 100;
    return percent.toFixed(2);
  };

  const renderGameStatus = () => {
    if (data?.gameStatus) {
      const { gameStatus } = data;
      return (
        <StatsBox>
          <Stats position="first">
            <span>MekaApes Minted:</span>
            <span className="number">
              {getBeautifiedNumber(gameStatus?.mekaApesMinted)}
            </span>
          </Stats>
          <Stats>
            <span>MekaApes Staked:</span>
            <span className="number">
              {getPercent(
                gameStatus?.mekaApesStaked,
                gameStatus?.mekaApesMinted
              )}
              %
            </span>
          </Stats>
          <Stats>
            <span>Robo Oogas Minted:</span>
            <span className="number">
              {getBeautifiedNumber(gameStatus?.roboOogasMinted)}
            </span>
          </Stats>
          <Stats>
            <span>Robo Oogas Staked:</span>
            <span className="number">
              {getPercent(
                gameStatus?.roboOogasStaked,
                gameStatus?.roboOogasMinted
              )}
              %
            </span>
          </Stats>
          {/* <Stats>
            <span>MekaApes Gifted:</span>
            <span className="number">
              {getBeautifiedNumber(gameStatus?.mekaApesGifted)}
            </span>
          </Stats> */}
          {/* <Stats position="last">
            <span>Robo Oogas Gifted:</span>
            <span className="number">
              {getBeautifiedNumber(gameStatus?.roboOogasGifted)}
            </span>
          </Stats> */}
          <Stats>
            <span>NFTs Gifted:</span>
            <span className="number">
              {getBeautifiedNumber(gameStatus?.roboOogasGifted)}
            </span>
          </Stats>
          <Stats position="last">
            <span>Total Minted NFTs:</span>
            <span className="number">
              {getBeautifiedNumber(totalMintedTokens ? totalMintedTokens : 0)}
            </span>
          </Stats>
        </StatsBox>
      );
    } else {
      return <StatsBox />;
    }
  };

  return (
    <Wrapper>
      <Header page="game" />
      <Content>
        <Title>
          Game <span>Statistics</span>
        </Title>
        <Holder>
          <Box>
            <h4>Game Status</h4>
            {renderGameStatus()}
            <TotalText>
              Daily Views:{" "}
              <span>{dailyUsers ? beautifyPrice(dailyUsers) : 0}</span>
            </TotalText>
          </Box>
          <LeaderboardsBox>
            <h4>Leaderboard</h4>
            <BoardWrapper>{renderLeaderboard()}</BoardWrapper>
          </LeaderboardsBox>
        </Holder>
        <OogaAttacked setLoader={setLoader} reduceAddress={reduceAddress} />
      </Content>
      <Footer page="game" />
      {loader && <Loading open={loader} />}
    </Wrapper>
  );
};

export default withConnect(Statistics, "/game/statistics");
