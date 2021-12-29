import { useEffect, useState, useContext } from "react";
// ******** Components ********
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// ******** HOC ********
import withConnect from "../../hoc/withConnect";
// ******** stores ********
import { UserContext } from "../../store/user-context";
// ******** Icons ********
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
// ******** Services ********
import metamask from "../../services/metamask";
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
// Check the ETH balance, and update on every minting transaction

const Minting = () => {
  const { userMetaMaskToken } = useContext(UserContext);
  const [currentETHBalance, setCurrentETHBalance] = useState(0);
  const [counter, setCounter] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [price] = useState(0.0088);
  const [allowed] = useState(true);

  useEffect(() => {
    if (userMetaMaskToken) {
      const getETHBalance = async () => {
        let balance = await metamask.getBalance(userMetaMaskToken);
        setCurrentETHBalance(+balance);
      };
      getETHBalance();
    } else {
      setCurrentETHBalance(0);
    }
  }, [userMetaMaskToken]);

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
          {allowed ? (
            <h4>Welcome!</h4>
          ) : (
            <h4>
              Sorry...{" "}
              <span>
                Your wallet is not whitelisted. You need to wait for the public
                mint.
              </span>
            </h4>
          )}
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
              Mint and Stake
            </button>
            <button disabled={isDisabled} className="noselect">
              Mint Now
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
