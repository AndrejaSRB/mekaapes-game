import { useEffect, useState, useContext } from "react";
// ******** Components ********
import { message } from "antd";
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
import contract from "../../services/contract";
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

const PRICE_MINT = 0.055;
const PRICE_MINT_AND_STAKE = 0.04;

// TODO: set allowed to true if its whitelisted or false if the user is not
// TODO: some users can mint maximum 2 and some 4, other which are not listed only 2.
// TODO: get from the contract amount of tokens which can user mint
// TODO: get new amount of possible new mint

const Minting = () => {
  const { userMetaMaskToken } = useContext(UserContext);
  const [currentETHBalance, setCurrentETHBalance] = useState(0);
  const [counter, setCounter] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [allowed] = useState(true);
  const [maxTokenAmount] = useState(4);

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
    if (type === "plus" && counter < maxTokenAmount) {
      setCounter(counter + 1);
    } else if (type === "minus" && counter > 0) {
      setCounter(counter - 1);
    }
  };

  const checkCurrentETHBalance = async () => {
    let balance = await metamask.getBalance(userMetaMaskToken);
    setCurrentETHBalance(+balance);
  };

  const handleClickMintAndStake = async () => {
    if (currentETHBalance > PRICE_MINT_AND_STAKE * counter) {
      setIsDisabled(true);
      try {
        await contract.mint(counter, true).then(async () => {
          //TODO: get new amount of possible new mint
          await checkCurrentETHBalance();
        });
      } catch (error) {
        console.log(error);
      }
      setCounter(0);
      setIsDisabled(false);
    } else {
      message.error("Sorry, you don't have enough ETH.");
    }
  };

  const handleClickMint = async () => {
    if (currentETHBalance > PRICE_MINT * counter) {
      setIsDisabled(true);
      try {
        await contract.mint(counter, false).then(async () => {
          // TODO: get new amount of possible new mint
          await checkCurrentETHBalance();
        });
      } catch (error) {
        console.log(error);
      }
      setCounter(0);
      setIsDisabled(false);
    } else {
      message.error("Sorry, you don't have enough ETH.");
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
            <button
              disabled={isDisabled}
              className="noselect"
              onClick={handleClickMintAndStake}>
              Mint and Stake
            </button>
            <Price className="noselect">
              <span>Price {PRICE_MINT_AND_STAKE} ETH</span>
            </Price>
            <button
              disabled={isDisabled}
              className="noselect orange"
              onClick={handleClickMint}>
              Mint Now
            </button>
          </ButtonWrapper>
          <Price className="noselect" margin>
            <span>Price {PRICE_MINT} ETH</span>
            0/10,000
          </Price>
        </MainBox>
      </Content>
      <Footer page="minting" />
    </Wrapper>
  );
};

export default withConnect(Minting, "/minting");
