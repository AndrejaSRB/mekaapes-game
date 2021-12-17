// ******** Components ********
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
// ******** HOC ********
import withConnect from "../../../hoc/withConnect";
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
} from "./Statistics.styles";

const Statistics = () => {
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
            <div>
              <Stats position="first">
                <span>MekaApes Minted:</span>
                <span className="number">3.212</span>
              </Stats>
              <Stats>
                <span>MekaApes Staked:</span>
                <span className="number">3.212</span>
              </Stats>
              <Stats>
                <span>Robo Oogas Minted:</span>
                <span className="number">3.212</span>
              </Stats>
              <Stats>
                <span>Robo Oogas Staked:</span>
                <span className="number">3.212</span>
              </Stats>
              <Stats>
                <span>MekaApes Staked:</span>
                <span className="number">3.212</span>
              </Stats>
              <Stats position="last">
                <span>Robo Oogas Stolen:</span>
                <span className="number">3.212</span>
              </Stats>
            </div>
            <TotalText>
              Total Stolen: <span>56%</span>
            </TotalText>
          </Box>
          <LeaderboardsBox>
            <h4>Leaderboards</h4>
            <BoardWrapper>
              <Place position="first">
                <span>0x9677...9123</span>
                <span className="number">32,370,000,000</span>
              </Place>
              <Place>
                <span>0x9677...9123</span>
                <span className="number">32,370,000,000</span>
              </Place>
              <Place>
                <span>0x9677...9123</span>
                <span className="number">32,370,000,000</span>
              </Place>
              <Place>
                <span>0x9677...9123</span>
                <span className="number">32,370,000,000</span>
              </Place>
              <Place>
                <span>0x9677...9123</span>
                <span className="number">32,370,000,000</span>
              </Place>
              <Place>
                <span>0x9677...9123</span>
                <span className="number">32,370,000,000</span>
              </Place>
              <Place>
                <span>0x9677...9123</span>
                <span className="number">32,370,000,000</span>
              </Place>
              <Place>
                <span>0x9677...9123</span>
                <span className="number">32,370,000,000</span>
              </Place>
              <Place>
                <span>0x9677...9123</span>
                <span className="number">32,370,000,000</span>
              </Place>
              <Place>
                <span>0x9677...9123</span>
                <span className="number">32,370,000,000</span>
              </Place>
              <Place position="last">
                <span>0x9677...9123</span>
                <span className="number">32,370,000,000</span>
              </Place>
            </BoardWrapper>
          </LeaderboardsBox>
        </Holder>
      </Content>
      <Footer page="game" />
    </Wrapper>
  );
};

export default withConnect(Statistics, "/game");
