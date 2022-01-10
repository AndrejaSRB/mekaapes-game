import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
// ******** Components ********
import { message } from "antd";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import StatusBar from "../../../components/StatusBar/StatusBar";
import Loading from "../../../components/Modals/Loading/Loading";
// ******** Images ********
import Animation from "../../../assets/crafting_animation.gif";
// ******** HOC ********
import withConnect from "../../../hoc/withConnect";
// ******** Icons ********
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
// ******** Stores ********
import { BalanceContext } from "../../../store/balance-context";
import { UserContext } from "../../../store/user-context";
import { MintedContext } from "../../../store/minted-context";
// ******** Services ********
import contract from "../../../services/contract";
import prices from "../../../services/prices";
// ******** Text ********
import { APPROVE_DMT_TRANSACTION, PRE_SALE_IS_ONGOING, DONT_ENOUGH_OG, DONT_ENOUGH_DMT } from '../../../messages';
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
  HelperOGText,
} from "./Crafting.styles";

const MAX_TOKEN_AMOUNT = 20;
const INTERVAL_PERIOD = 30000;
const TOTAL_MINTED_AMOUNT = 55000;
const TOTAL_MINTED_DMT_AMOUNT = 10000;
const INITIAL_EHT_MINT = 10000;

// Prices
// 10,001 - 25,000: 4,000 $OG
// 25,001 - 40,000: 8,000 $OG
// 40,001 - 55,000: 12,000 $OG

const Crafting = () => {
  const { userMetaMaskToken } = useContext(UserContext);
  const { dmtBalance, oogearBalance, getOogearBalance, getDmtBalance } =
    useContext(BalanceContext);
  const { totalMintedTokens, getTotalMinted } = useContext(MintedContext);
  const [oogearCounter, setOogeaerCounter] = useState(0);
  const [dmtCounter, setDmtCounter] = useState(0);
  const [OGPrice, setOGPrice] = useState(0);
  const [OGStakePrice, setOGStakePrice] = useState(0);
  const [dmtPrice, setDMTPrice] = useState(0);
  const [isDisableOGButtons, setIsDisableOGButtons] = useState(true);
  const [isDisableDMTButton, setIsDisableDMTButton] = useState(true);
  const [isDMTApproved, setIsDMTApproved] = useState(true);
  const [disabledApproveBtn, setDisableApproveBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalMintedDMTTokens, setTotalMintedDMTTokens] = useState(0);

  // Get amount of total minted DMT tokens
  useEffect(() => {
    const getTotalMintedDMTTokens = async () => {
      let totalMinted = await contract.getTotalDMTMintedTokens();
      setTotalMintedDMTTokens(totalMinted);
    };
    getTotalMintedDMTTokens();
  }, []);

  // Check if $DMT transaction is approved
  useEffect(() => {
    if (userMetaMaskToken && dmtPrice > 0) {
      const checkIfApprovedDMTTransaction = async () => {
        let isApproved = await contract.isDMTtransactionApproved(
          userMetaMaskToken,
          dmtPrice
        );
        setIsDMTApproved(isApproved);
      };
      checkIfApprovedDMTTransaction();
    }
  }, [userMetaMaskToken, dmtPrice]);

  useEffect(() => {
    if (totalMintedTokens === TOTAL_MINTED_AMOUNT) {
      setIsDisableOGButtons(true);
      setIsDisableDMTButton(true);
    }
  }, [totalMintedTokens]);

  // Get the Mint $DMT Price
  useEffect(() => {
    const getPriceMintAndStake = async () => {
      let price = await prices.getMintDMTPrice();
      setDMTPrice(ethers.utils.formatUnits(price));
    };
    getPriceMintAndStake();
  }, []);

  // Get the Mint $OG Price
  useEffect(() => {
    const getPriceMintOG = async () => {
      let price = await prices.getMintOGprice();
      setOGPrice(ethers.utils.formatUnits(price));
    };
    getPriceMintOG();
    let interval = setInterval(async () => {
      let price = await prices.getMintOGprice();
      setOGPrice(ethers.utils.formatUnits(price, 18));
    }, INTERVAL_PERIOD);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Get the Mint&Stake $OG Price
  useEffect(() => {
    const getPriceMintAndStake = async () => {
      let price = await prices.getMintOGStakePrice();
      setOGStakePrice(ethers.utils.formatUnits(price));
    };
    getPriceMintAndStake();
    let interval = setInterval(async () => {
      let price = await prices.getMintOGStakePrice();
      setOGStakePrice(ethers.utils.formatUnits(price, 18));
    }, INTERVAL_PERIOD);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (totalMintedTokens < INITIAL_EHT_MINT) {
      setIsDisableDMTButton(true);
    } else if (totalMintedTokens === TOTAL_MINTED_AMOUNT) {
      setIsDisableDMTButton(true);
    } else if (totalMintedDMTTokens === TOTAL_MINTED_DMT_AMOUNT) {
      setIsDisableDMTButton(true);
    } else if (dmtCounter < 1) {
      setIsDisableDMTButton(true);
    } else {
      setIsDisableDMTButton(false);
    }
  }, [dmtCounter, totalMintedDMTTokens, totalMintedTokens]);

  useEffect(() => {
    if (totalMintedTokens < INITIAL_EHT_MINT) {
      setIsDisableDMTButton(true);
    } else if (totalMintedTokens === TOTAL_MINTED_AMOUNT) {
      setIsDisableOGButtons(true);
    } else if (oogearCounter < 1) {
      setIsDisableOGButtons(true);
    } else {
      setIsDisableOGButtons(false);
    }
  }, [oogearCounter, totalMintedTokens]);

  const handleDmtCounter = (type) => () => {
    if (totalMintedTokens > INITIAL_EHT_MINT) {
      if (isDMTApproved) {
        if (type === "plus" && dmtCounter < MAX_TOKEN_AMOUNT) {
          setDmtCounter(dmtCounter + 1);
        } else if (type === "minus" && dmtCounter > 0) {
          setDmtCounter(dmtCounter - 1);
        }
      } else {
        message.info(APPROVE_DMT_TRANSACTION);
      }
    } else {
      message.info(PRE_SALE_IS_ONGOING);
    }
  };

  const handleOogearCounter = (type) => () => {
    if (totalMintedTokens > INITIAL_EHT_MINT) {
      if (type === "plus" && oogearCounter < MAX_TOKEN_AMOUNT) {
        setOogeaerCounter(oogearCounter + 1);
      } else if (type === "minus" && oogearCounter > 0) {
        setOogeaerCounter(oogearCounter - 1);
      }
    } else {
      message.info(PRE_SALE_IS_ONGOING);
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

  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleClickApproveDMT = async () => {
    setDisableApproveBtn(true);
    try {
      let tsx = await contract.approveDMTtransaction();
      setLoading(true);
      tsx.wait().then(async () => {
        let isApproved = await contract.isDMTtransactionApproved(
          userMetaMaskToken,
          dmtPrice
        );
        setIsDMTApproved(isApproved);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
    setDisableApproveBtn(false);
  };

  const handleClickMintWithOG = async () => {
    if (oogearCounter > 0) {
      if (+oogearCounter * +OGPrice < +oogearBalance) {
        setIsDisableOGButtons(true);
        try {
          let tsx = await contract.mintWithOG(+oogearCounter, false);
          setLoading(true);
          tsx.wait().then(async () => {
            getOogearBalance();
            getTotalMinted();
            //TODO: Get the fresh token list ? think about this
            setLoading(false);
          });
        } catch (error) {
          console.log(error);
        }
        setOogeaerCounter(0);
        setIsDisableOGButtons(false);
      } else {
        message.error(DONT_ENOUGH_OG);
      }
    }
  };

  const handleClickMintWithOGAndStake = async () => {
    if (oogearCounter > 0) {
      if (+oogearCounter * +OGStakePrice < +oogearBalance) {
        setIsDisableOGButtons(true);
        try {
          let tsx = await contract.mintWithOG(+oogearCounter, true);
          setLoading(true);
          tsx.wait().then(async () => {
            getOogearBalance();
            getTotalMinted();
            //TODO: Get the fresh token list ? think about this
            setLoading(false);
          });
        } catch (error) {
          console.log(error);
        }
        setOogeaerCounter(0);
        setIsDisableOGButtons(false);
      } else {
        message.error(DONT_ENOUGH_OG);
      }
    }
  };

  const handleClickMintWithDMT = async () => {
    if (dmtCounter > 0) {
      if (+dmtCounter * +dmtPrice < +dmtBalance) {
        setIsDisableDMTButton(true);
        try {
          let tsx = await contract.mintWithDMT(dmtCounter);
          setLoading(true);
          tsx.wait().then(async () => {
            getDmtBalance();
            getTotalMinted();
            let totalDMTMinted = await contract.getTotalDMTMintedTokens();
            setTotalMintedDMTTokens(totalDMTMinted);
            setLoading(false);
          });
          //TODO: Get the fresh token list ? think about this
        } catch (error) {
          console.log(error);
        }
        setDmtCounter(0);
        setIsDisableDMTButton(false);
      } else {
        message.error(DONT_ENOUGH_DMT);
      }
    }
  };

  return (
    <Wrapper>
      <Header page="game" />
      <Content>
        <Title>Crafting</Title>
        <MainBox>
          <TitleBox>
            <h4>Mint new Robo Oogas!</h4>
          </TitleBox>
          <AnimationBox>
            <img src={Animation} alt="animation" />
          </AnimationBox>
          <StatusBar totalNumber={totalMintedTokens} />
          <CounterBox>
            <OogearBox>
              <Counter>
                <div
                  className={
                    oogearCounter === 0 || totalMintedTokens < INITIAL_EHT_MINT
                      ? "minus disabled"
                      : "minus"
                  }
                  onClick={handleOogearCounter("minus")}>
                  <MinusOutlined />
                </div>
                <div className="number noselect" counter={oogearCounter}>
                  {oogearCounter}
                </div>
                <div
                  className={
                    oogearCounter === MAX_TOKEN_AMOUNT ||
                    totalMintedTokens < INITIAL_EHT_MINT
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
                  $OG Mint
                </button>
                <button
                  disabled={getOGBtnIsDisabled()}
                  onClick={handleClickMintWithOGAndStake}>
                  $OG Mint & Stake
                </button>
              </ButtonBox>
              <HelperOGText>
                Mint Price: {OGPrice} $OG{" "}
                <span>Mint & Stake Price: {OGStakePrice} $OG</span>
              </HelperOGText>
            </OogearBox>
            <DmtBox>
              <Counter>
                <div
                  className={
                    dmtCounter === 0 || totalMintedTokens < INITIAL_EHT_MINT
                      ? "minus disabled"
                      : "minus"
                  }
                  onClick={handleDmtCounter("minus")}>
                  <MinusOutlined />
                </div>
                <div className="number noselect" counter={dmtCounter}>
                  {dmtCounter}
                </div>
                <div
                  className={
                    dmtCounter === MAX_TOKEN_AMOUNT ||
                    totalMintedTokens < INITIAL_EHT_MINT
                      ? "plus disabled"
                      : "plus"
                  }
                  onClick={handleDmtCounter("plus")}>
                  <PlusOutlined />
                </div>
              </Counter>

              {isDMTApproved ? (
                <Button
                  disabled={getDMTBtnIsDisabled()}
                  onClick={handleClickMintWithDMT}>
                  $DMT Mint & Stake
                </Button>
              ) : (
                <Button
                  disabled={disabledApproveBtn}
                  onClick={handleClickApproveDMT}>
                  Approve $DMT Transaction
                </Button>
              )}
              <HelperText>
                Price {dmtPrice} $DMT{" "}
                <span>{numberWithCommas(+totalMintedDMTTokens)}/10,000</span>
              </HelperText>
            </DmtBox>
          </CounterBox>
          <Text>
            When minting Robo Oogas with $OG or $DMT there is a 10% chance that
            you'll receive a MekaApe instead of a Robo Ooga! There is also a 10%
            risk that the Mint gets gifted to a random Mega Meka holder. Minting
            with $DMT reduces that risk to only 5%. $DMT Mint is limited to
            10,000 mints and your NFTs will be staked automatically.
          </Text>
        </MainBox>
      </Content>
      <Footer page="game" />
      <Loading open={loading} />
    </Wrapper>
  );
};

export default withConnect(Crafting, "/game/crafting");
