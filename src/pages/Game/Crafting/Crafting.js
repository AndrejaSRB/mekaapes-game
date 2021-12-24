import { useState } from "react";
// ******** Components ********
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import StatusBar from "../../../components/StatusBar/StatusBar";
// ******** HOC ********
import withConnect from "../../../hoc/withConnect";
// ******** Icons ********
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
// ******** Styles ********
import {
  Wrapper,
  Title,
  Content,
  MainBox,
  TitleBox,
  OogearBox,
  Counter,
  Button,
  HelperText,
  ButtonBox,
  DmtBox,
  Text,
  CounterBox,
} from "./Crafting.styles";

const EXAMPLE_CURRENT_VALUE = 18323;

// TODO
// Disable buttons if the total value is 50k
// Disable buttons if the amount is bigger than the balance in that coin

const Crafting = () => {
  const [oogearCounter, setOogeaerCounter] = useState(0);
  const [dmtCounter, setDmtCounter] = useState(0);

  const handleDmtCounter = (type) => () => {
    if (type === "plus" && dmtCounter < 20) {
      setDmtCounter(dmtCounter + 1);
    } else if (type === "minus" && dmtCounter > 0) {
      setDmtCounter(dmtCounter - 1);
    }
  };

  const handleOogearCounter = (type) => () => {
    if (type === "plus" && oogearCounter < 20) {
      setOogeaerCounter(oogearCounter + 1);
    } else if (type === "minus" && oogearCounter > 0) {
      setOogeaerCounter(oogearCounter - 1);
    }
  };

  return (
    <Wrapper>
      <Header page="game" />
      <Content>
        <Title>
          Factory <span>Minting</span>
        </Title>
        <MainBox>
          <TitleBox>
            <h4>Guard the factory!</h4>
            <h6>(Stake) to earn $DMT</h6>
          </TitleBox>
          <StatusBar totalNumber={EXAMPLE_CURRENT_VALUE} />
          <CounterBox>
            <OogearBox>
              <Counter>
                <div
                  className={oogearCounter === 0 ? "minus disabled" : "minus"}
                  onClick={handleOogearCounter("minus")}>
                  <MinusOutlined />
                </div>
                <div className="number noselect" counter={oogearCounter}>
                  {oogearCounter}
                </div>
                <div
                  className={oogearCounter === 20 ? "plus disabled" : "plus"}
                  onClick={handleOogearCounter("plus")}>
                  <PlusOutlined />
                </div>
              </Counter>
              <ButtonBox>
                <button disabled={oogearCounter < 1}>Mint Now</button>
                <button disabled={oogearCounter < 1}>Mint & Stake</button>
              </ButtonBox>
              <HelperText>Price xxxxxx $OOGEAR</HelperText>
            </OogearBox>
            <DmtBox>
              <Counter>
                <div
                  className={dmtCounter === 0 ? "minus disabled" : "minus"}
                  onClick={handleDmtCounter("minus")}>
                  <MinusOutlined />
                </div>
                <div className="number noselect" counter={dmtCounter}>
                  {dmtCounter}
                </div>
                <div
                  className={dmtCounter === 20 ? "plus disabled" : "plus"}
                  onClick={handleDmtCounter("plus")}>
                  <PlusOutlined />
                </div>
              </Counter>
              <Button disabled={dmtCounter < 1}>Mint $DMT</Button>
              <HelperText>
                Price xxxxxx $DMT <span>1231/10,000</span>
              </HelperText>
            </DmtBox>
          </CounterBox>
          <Text>(Stake) to earn $DMT</Text>
        </MainBox>
      </Content>
      <Footer page="game" />
    </Wrapper>
  );
};

export default withConnect(Crafting, "/game/crafting");
