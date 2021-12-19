import { useEffect, useState } from "react";
import { useWallet } from "use-wallet";
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
} from "./Minting.styles";

  // set allowed to true if its whitelisted or false if the user is not
  // TODO some users can mint maximum 2 and some 4, other which are not listed only 2.

const Minting = () => {
  const [currentETHBalance, setCurrentETHBalance] = useState(0);
  const [counter, setCounter] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [price] = useState(0.0088);
  const [allowed] = useState(true);
  const wallet = useWallet();

  useEffect(() => {
    if (wallet) {
      const balance = wallet.balance;
      if (+balance > 0) {
        setCurrentETHBalance(
          Number((Number(-1) / 1000000000000000000).toFixed(5))
        );
      }
    }
  }, [wallet]);

  useEffect(() => {
    if (counter) {
      if (currentETHBalance >= counter * price) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }
  }, [currentETHBalance, counter, price]);

  useEffect(() => {
    if (allowed) {
      if (counter > 0) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    } else {
      setIsDisabled(true);
    }
  }, [allowed, counter]);

  const handleCounter = (type) => () => {
    if (type === "plus" && counter < 4) {
      setCounter(counter + 1);
    } else if (type === "minus" && counter > 0) {
      setCounter(counter - 1);
    }
  };

  return (
    <Wrapper>
      <Header page="minting" />
      <Content>
        <Title>{allowed ? "You are the worthy!" : "You shall not pass"}</Title>
        <MainBox>
          <h4>Welcome!</h4>
          {allowed ? (
            <IntroText>
              You have secured your place as the first defender of the Factory!{" "}
              <span>
                Begin the defensive by minting a unique Defender in the form of
                a Robo Oogas or MekaApes.
              </span>
            </IntroText>
          ) : (
            <IntroText></IntroText>
          )}
          <Counter>
            <div
              className={counter === 0 ? "icon disabled" : "icon"}
              onClick={handleCounter("minus")}>
              <MinusOutlined />
            </div>
            <div className="number noselect">{counter}</div>
            <div className="icon" onClick={handleCounter("plus")}>
              <PlusOutlined />
            </div>
          </Counter>
          <ButtonWrapper>
            <button disabled={isDisabled} className="noselect">
              Mint Now
            </button>
            <button disabled={isDisabled} className="noselect">
              Mint and Stake
            </button>
          </ButtonWrapper>
          <Price className="noselect">
            <span>Price {price} ETH</span>
            0/10,000
          </Price>
        </MainBox>
      </Content>
      <Footer page="minting" />
    </Wrapper>
  );
};

export default withConnect(Minting, "/minting");
