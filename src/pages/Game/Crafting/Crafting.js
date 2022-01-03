import { useState, useEffect, useContext } from "react";
// ******** Components ********
import { message } from "antd";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import StatusBar from "../../../components/StatusBar/StatusBar";
// ******** Images ********
import Animation from "../../../assets/level_up.gif";
// ******** HOC ********
import withConnect from "../../../hoc/withConnect";
// ******** Icons ********
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
// ******** Stores ********
import { BalanceContext } from "../../../store/balance-context";
// ******** Services ********
import contract from "../../../services/contract";
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
  AnimationBox,
} from "./Crafting.styles";

const EXAMPLE_CURRENT_VALUE = 29223;
const DMT_MINT_PRICE = 120;
const MAX_TOKEN_AMOUNT = 20;

// Prices
// 10,001 - 25,000: 4,000 $OG
// 25,001 - 40,000: 8,000 $OG
// 40,001 - 55,000: 12,000 $OG

//TODO: Disable minting with $DTM after 10k of total minted
//TODO: get the total amount of minted tokens
//TODO: get the total amount of minted tokens with $DMT

const Crafting = () => {
  const { dmtBalance, oogearBalance } = useContext(BalanceContext);
  const [oogearCounter, setOogeaerCounter] = useState(0);
  const [dmtCounter, setDmtCounter] = useState(0);
  const [OGPrice, setOGPrice] = useState(4000);
  const [isDisableOGButtons, setIsDisableOGButtons] = useState(true);
  const [isDisableDMTButton, setIsDisableDMTButton] = useState(true);

  // TODO: fix the proper variable for total number
  useEffect(() => {
    // Disable all buttons if we reach 55k
    if (EXAMPLE_CURRENT_VALUE === 55000) {
      setIsDisableOGButtons(true);
      setIsDisableDMTButton(true);
    }
  }, []);

  // TODO: fix the proper variable for total number
  useEffect(() => {
    // Change the minting price depend of the amount of minted tokens
    if (EXAMPLE_CURRENT_VALUE >= 10001 && EXAMPLE_CURRENT_VALUE < 25001) {
      setOGPrice(4000);
    } else if (
      EXAMPLE_CURRENT_VALUE >= 25001 &&
      EXAMPLE_CURRENT_VALUE < 40000
    ) {
      setOGPrice(6000);
    } else if (
      EXAMPLE_CURRENT_VALUE >= 40001 &&
      EXAMPLE_CURRENT_VALUE < 55000
    ) {
      setOGPrice(12000);
    }
  }, []);

  // TODO: disable DMT button if it's minted 10k tokens with $DMT
  useEffect(() => {
    if (dmtCounter < 1) {
      setIsDisableDMTButton(true);
    } else {
      setIsDisableDMTButton(false);
    }
  }, [dmtCounter]);

  useEffect(() => {
    if (oogearCounter < 1) {
      setIsDisableOGButtons(true);
    } else {
      setIsDisableOGButtons(false);
    }
  }, [oogearCounter]);

  const handleDmtCounter = (type) => () => {
    if (type === "plus" && dmtCounter < MAX_TOKEN_AMOUNT) {
      setDmtCounter(dmtCounter + 1);
    } else if (type === "minus" && dmtCounter > 0) {
      setDmtCounter(dmtCounter - 1);
    }
  };

  const handleOogearCounter = (type) => () => {
    if (type === "plus" && oogearCounter < MAX_TOKEN_AMOUNT) {
      setOogeaerCounter(oogearCounter + 1);
    } else if (type === "minus" && oogearCounter > 0) {
      setOogeaerCounter(oogearCounter - 1);
    }
  };

  const getDMTBtnIsDisabled = () => {
    let disabled = true;
    if (isDisableDMTButton) {
      disabled = true;
    } else if (dmtCounter > 0) {
      disabled = false;
    }
    return disabled;
  };

  const getOGBtnIsDisabled = () => {
    let disabled = true;
    if (isDisableOGButtons) {
      disabled = true;
    } else if (oogearCounter > 0) {
      disabled = false;
    }
    return disabled;
  };

  const handleClickMintWithOG = async () => {
    if (oogearCounter > 0) {
      if (+oogearCounter * OGPrice < +oogearBalance) {
        setIsDisableOGButtons(true);
        try {
          await contract.mintWithOG(+oogearCounter, false);
          //TODO: get the fresh $OG balance
          //TODO: get the fresh total minted token amount
        } catch (error) {
          console.log(error);
        }
        setOogeaerCounter(0);
        setIsDisableOGButtons(false);
      } else {
        message.error("Sorry, you don't have enough $OG.");
      }
    }
  };

  const handleClickMintWithOGAndStake = async () => {
    if (oogearCounter > 0) {
      if (+oogearCounter * OGPrice < +oogearBalance) {
        setIsDisableOGButtons(true);
        try {
          await contract.mintWithOG(+oogearCounter, true);
          //TODO: get the fresh $OG balance
          //TODO: get the fresh total minted token amount
        } catch (error) {
          console.log(error);
        }
        setOogeaerCounter(0);
        setIsDisableOGButtons(false);
      } else {
        message.error("Sorry, you don't have enough $OG.");
      }
    }
  };

  const handleClickMintWithDMT = async () => {
    if (dmtCounter > 0) {
      if (+dmtCounter * DMT_MINT_PRICE < +dmtBalance) {
        setIsDisableDMTButton(true);
        try {
          await contract.mintWithDMT(dmtCounter);
          //TODO: get the fresh $DMT balance
          //TODO: get the fresh total minted token amount
          //TODO: get the fresh $DMT total minted token amount
        } catch (error) {
          console.log(error);
        }
        setDmtCounter(0);
        setIsDisableDMTButton(false);
      } else {
        message.error("Sorry, you don't have enough $DMT.");
      }
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
          </TitleBox>
          <AnimationBox>
            <img src={Animation} alt="animation" />
          </AnimationBox>
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
                  className={
                    oogearCounter === MAX_TOKEN_AMOUNT
                      ? "plus disabled"
                      : "plus"
                  }
                  onClick={handleOogearCounter("plus")}>
                  <PlusOutlined />
                </div>
              </Counter>
              <ButtonBox>
                <button
                  disabled={getOGBtnIsDisabled()}
                  onClick={handleClickMintWithOG}>
                  Mint Now
                </button>
                <button
                  disabled={getOGBtnIsDisabled()}
                  onClick={handleClickMintWithOGAndStake}>
                  Mint & Stake
                </button>
              </ButtonBox>
              <HelperText>Price {OGPrice} $OG</HelperText>
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
                  className={
                    dmtCounter === MAX_TOKEN_AMOUNT ? "plus disabled" : "plus"
                  }
                  onClick={handleDmtCounter("plus")}>
                  <PlusOutlined />
                </div>
              </Counter>
              <Button
                disabled={getDMTBtnIsDisabled()}
                onClick={handleClickMintWithDMT}>
                Mint $DMT
              </Button>
              <HelperText>
                Price {DMT_MINT_PRICE} $DMT <span>1231/10,000</span>
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
