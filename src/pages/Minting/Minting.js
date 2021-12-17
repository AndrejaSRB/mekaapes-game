import { useState } from "react";
// ******** Components ********
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// ******** HOC ********
import withConnect from "../../hoc/withConnect";
// ******** Icons ********
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
// ******** Styles ********
import {
  Wrapper,
  Content,
  Title,
  MainBox,
  IntroText,
  ButtonWrapper,
  Counter,
  Price,
  ContentNotAllowed,
  GoBack,
} from "./Minting.styles";

const Minting = () => {
  const [counter, setCounter] = useState(0);
  const [allowed] = useState(true);

  // set allowed to true if its whitelisted or false if the user is not

  const handleCounter = (type) => () => {
    if (type === "plus" && counter < 20) {
      setCounter(counter + 1);
    } else if (type === "minus" && counter > 0) {
      setCounter(counter - 1);
    }
  };

  return (
    <Wrapper height={allowed}>
      <Header page="minting" />
      {allowed ? (
        <Content>
          <Title>You are the first!</Title>
          <MainBox>
            <h4>Welcome!</h4>
            <IntroText>
              You have secured your place as the first defender of the Factory!{" "}
              <span>
                Begin the defensive by minting a unique Defender in the form of
                a Robo Oogas or MekaApes.
              </span>
            </IntroText>
            <Counter>
              <div className="icon" onClick={handleCounter("minus")}>
                <MinusOutlined />
              </div>
              <div className="number noselect">{counter}</div>
              <div className="icon" onClick={handleCounter("plus")}>
                <PlusOutlined />
              </div>
            </Counter>
            <ButtonWrapper>
              <button disabled={counter === 0} className="noselect">
                Mint Now
              </button>
              <button disabled={counter === 0} className="noselect">
                Mint and Stake
              </button>
            </ButtonWrapper>
            <Price className="noselect">
              <span>Price 0.0088 ETH</span>
              0/10,000
            </Price>
          </MainBox>
        </Content>
      ) : (
        <ContentNotAllowed>
          <Title>
            Something went <span>wrong!</span>
          </Title>
          <p>Sorry, but in this moment you are not on the list.</p>
          <GoBack to="/">Go Back</GoBack>
        </ContentNotAllowed>
      )}
      <Footer page={allowed ? "minting" : "connect"} />
    </Wrapper>
  );
};

export default withConnect(Minting, "/minting");
