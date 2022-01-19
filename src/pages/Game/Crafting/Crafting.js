import { useState, useEffect, useContext, useRef } from "react";
import { BigNumber } from "ethers";
// ******** Components ********
import { message } from "antd";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import StatusBar from "../../../components/StatusBar/StatusBar";
import Loading from "../../../components/Modals/Loading/Loading";
import ResultsModal from "../../../components/Modals/ResultModal/ResultModal";
import ActionsModal from "../../../components/Modals/ActionLoading/ActionLoading";
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
// ******** Hooks ********
import usePrices from "../../../hooks/usePrices";
import useTotalMintedDMTTokens from "../../../hooks/useTotalMintedDMTTokens";
import useTotalAmountMintedTokens from "../../../hooks/useTotalAmountMintedTokens";
import useIsDMTTransactionApproved from "../../../hooks/useIsDMTTransactionApproved";
// ******** Services ********
import gas from "../../../services/gas";
// ******** Text ********
import {
  APPROVE_DMT_TRANSACTION,
  PRE_SALE_IS_ONGOING,
  DONT_ENOUGH_OG,
  DONT_ENOUGH_DMT,
  SOMETHING_WENT_WRONG,
  getActionLoadingMintMessage,
} from "../../../messages";
// ******** Functions ********
import { convertBigNumberToPrice } from "../Upgrade/helpers";
import { getCurrentGasFee, beautifyNumber } from "../Factory/helper";
// ******** Config ********
import priceOrder from "../../../config/pricesOrder";
// ******** Events Listeners ********
import {
  getAllEvents,
  getEvent,
  MEKA_CONVERT,
  OOGA_ATTACKED,
  MINT_MULTIPLE_ROBO,
  makeRandomSubscription,
} from "../../../eventsListeners";
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
const TOTAL_MINTED_AMOUNT = 55000;
const TOTAL_MINTED_DMT_AMOUNT = 10000;

const Crafting = () => {
  const { userMetaMaskToken } = useContext(UserContext);
  const {
    getOogearBalance,
    getDmtBalance,
    DMTBalanceBigNumber,
    OGBalanceBigNumber,
  } = useContext(BalanceContext);
  const { isMintSale } = useContext(MintedContext);
  const [oogearCounter, setOogeaerCounter] = useState(0);
  const [dmtCounter, setDmtCounter] = useState(0);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [isDisableOGButtons, setIsDisableOGButtons] = useState(true);
  const [isDisableDMTButton, setIsDisableDMTButton] = useState(true);
  const [isDMTApproved, setIsDMTApproved] = useState(true);
  const [disabledApproveBtn, setDisableApproveBtn] = useState(false);
  const [loader, setLoading] = useState(false);
  // Action Modal
  const [actionLoading, setActionLoading] = useState(false);
  const [actionLoadingText, setActionLoadingText] = useState("");
  const [tsxNumber, setTsxNumber] = useState(0);
  // Total Amount
  const {
    data: totalMintedTokens,
    isLoading: totalAmountLoading,
    refetch: getTotalMinted,
  } = useTotalAmountMintedTokens(userMetaMaskToken);
  const {
    data: totalMintedDMTTokens,
    isLoading: totalMintedDMTLoading,
    refetch: getTotalMintedDMTAmount,
  } = useTotalMintedDMTTokens();
  // Prices
  const { data: prices, isLoading: priceLoading } =
    usePrices(userMetaMaskToken);
  const [mintAndStakeOGPrice, setMintAndStakeOGPrice] = useState(
    BigNumber.from(0)
  );
  const [mintOGPrice, setMintOGPrice] = useState(BigNumber.from(0));
  const [mintDMTPrice, setMintDMTPrice] = useState(BigNumber.from(0));
  // $DMT Transaction approve
  const {
    data: isDMTApprovedStatus,
    isLoading: isDMTpprovedLoading,
    refetch: getIfDMTIsApproved,
  } = useIsDMTTransactionApproved(userMetaMaskToken, mintDMTPrice);
  // Transaction Events
  const tsxAmount = useRef(BigNumber.from(0));
  const tsxStartFromTokenId = useRef(BigNumber.from(0));
  const [tokens, setTokens] = useState(null);

  // Loading state
  useEffect(() => {
    if (
      priceLoading ||
      totalMintedDMTLoading ||
      totalAmountLoading ||
      isDMTpprovedLoading
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [
    priceLoading,
    totalMintedDMTLoading,
    totalAmountLoading,
    isDMTpprovedLoading,
  ]);

  // Get prices
  useEffect(() => {
    if (userMetaMaskToken && prices && !priceLoading) {
      let mint_dmt_price = prices?.["mintDMTstakePrice"]
        ? prices?.["mintDMTstakePrice"]
        : prices?.[priceOrder["mintDMTstakePrice"]];
      let mint_og_price = prices?.["mintOGprice"]
        ? prices?.["mintOGprice"]
        : prices?.[priceOrder["mintOGprice"]];
      let mint_and_stake_og_price = prices?.["mintOGstakePrice"]
        ? prices?.["mintOGstakePrice"]
        : prices?.[priceOrder["mintOGstakePrice"]];
      setMintDMTPrice(mint_dmt_price);
      setMintOGPrice(mint_og_price);
      setMintAndStakeOGPrice(mint_and_stake_og_price);
    }
  }, [prices, userMetaMaskToken, priceLoading]);

  // Check if $DMT transaction is approved
  useEffect(() => {
    if (isDMTApprovedStatus !== null && isDMTApprovedStatus !== undefined) {
      setIsDMTApproved(isDMTApprovedStatus);
    }
  }, [isDMTApprovedStatus]);

  // Check if its minting done
  useEffect(() => {
    if (totalMintedTokens === TOTAL_MINTED_AMOUNT) {
      setIsDisableOGButtons(true);
      setIsDisableDMTButton(true);
    }
  }, [totalMintedTokens]);

  useEffect(() => {
    if (isMintSale) {
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
  }, [dmtCounter, totalMintedDMTTokens, totalMintedTokens, isMintSale]);

  useEffect(() => {
    if (isMintSale) {
      setIsDisableDMTButton(true);
    } else if (totalMintedTokens === TOTAL_MINTED_AMOUNT) {
      setIsDisableOGButtons(true);
    } else if (oogearCounter < 1) {
      setIsDisableOGButtons(true);
    } else {
      setIsDisableOGButtons(false);
    }
  }, [oogearCounter, totalMintedTokens, isMintSale]);

  const handleDmtCounter = (type) => () => {
    if (!isMintSale) {
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
    if (!isMintSale) {
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

  const checkBalance = (counter, price, balance) => {
    let totalPrice = price.mul(+counter);
    return balance.gt(totalPrice);
  };

  const handleCloseResultsModal = () => {
    setIsResultsModalOpen(false);
    getTotalMinted();
    getTotalMintedDMTAmount();
    setTokens(null);
    tsxAmount.current = BigNumber.from(0);
    tsxStartFromTokenId.current = BigNumber.from(0);
  };

  const handleClickApproveDMT = async () => {
    setDisableApproveBtn(true);
    try {
      let tsx = await contract.approveDMTtransaction();
      setLoading(true);
      tsx
        .wait()
        .then(async () => {
          getIfDMTIsApproved();
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          message.error(SOMETHING_WENT_WRONG);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      message.error(SOMETHING_WENT_WRONG);
      getDmtBalance();
      getOogearBalance();
    }
    setDisableApproveBtn(false);
  };

  const getGasFee = async (amount, isStake) => {
    let gasFee = await getCurrentGasFee();
    let randomGasFee = await gas.getMintRandomGas(amount, isStake);
    let total = gasFee.mul(randomGasFee);
    return total;
  };

  const onRandomsReceived = async (requestId, entropy, event) => {
    let txReceipt = await event.getTransactionReceipt();
    let { mekaApesContract } = contract;

    let amount = tsxAmount.current.toNumber();
    let startTokenId = tsxStartFromTokenId.current.toNumber();
    let tokens = [...Array(amount)].map((_, i) => ({
      type: "crafting",
      name: "Robo Ooga",
      id: i + startTokenId,
      stolen: null,
    }));
    let mekaConvertEvent = getAllEvents(
      txReceipt,
      mekaApesContract,
      MEKA_CONVERT
    );
    let oogaAttackedEvent = getAllEvents(
      txReceipt,
      mekaApesContract,
      OOGA_ATTACKED
    );
    if (mekaConvertEvent?.length > 0) {
      let allTokens = [...tokens];
      mekaConvertEvent.forEach((event) => {
        let tokenId = event.args.tokenId.toNumber();
        allTokens.forEach((token) => {
          if (token.id === tokenId) {
            token.name = "Mega Ape";
          }
        });
      });
      tokens = [...allTokens];
    }
    if (oogaAttackedEvent?.length > 0) {
      let allTokens = [...tokens];
      mekaConvertEvent.forEach((event) => {
        let tokenId = event.args.tokenId.toNumber();
        allTokens.forEach((token) => {
            let mekaApeId = token.args.tributeOogaId.toNumber();
          if (token.id === tokenId) {
            token.stolen = true;
            token.stolenApeId = mekaApeId
          }
        });
      });
      tokens = [...allTokens];
    }
    setTokens(tokens);
    setActionLoading(false);
    setActionLoadingText("");
    setTsxNumber(0);
    setIsResultsModalOpen(true);
  };

  const getMintMultiEventAndWaitSecondTx = (receipt) => {
    let { mekaApesContract } = contract;
    let muintMultiEvent = getEvent(
      receipt,
      mekaApesContract,
      MINT_MULTIPLE_ROBO
    );
    tsxStartFromTokenId.current = muintMultiEvent.args.startFromTokenId;
    tsxAmount.current = muintMultiEvent.args.amount;
    makeRandomSubscription(receipt, contract, onRandomsReceived);
  };

  const handleClickMintWithOG = async () => {
    if (oogearCounter > 0) {
      if (checkBalance(oogearCounter, mintOGPrice, OGBalanceBigNumber)) {
        setIsDisableOGButtons(true);
        let gasFee = await getGasFee(+oogearCounter, false);
        try {
          let tsx = await contract.mintWithOG(+oogearCounter, false, gasFee);
          setActionLoadingText(getActionLoadingMintMessage(+oogearCounter));
          setActionLoading(true);
          tsx
            .wait()
            .then(async (receipt) => {
              setTsxNumber(2);
              getMintMultiEventAndWaitSecondTx(receipt);
              getOogearBalance();
              getTotalMinted();
            })
            .catch((error) => {
              console.log(error);
              message.error(SOMETHING_WENT_WRONG);
              setActionLoading(false);
            });
        } catch (error) {
          console.log(error);
          message.error(SOMETHING_WENT_WRONG);
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
      if (
        checkBalance(oogearCounter, mintAndStakeOGPrice, OGBalanceBigNumber)
      ) {
        setIsDisableOGButtons(true);
        let gasFee = await getGasFee(+oogearCounter, true);
        try {
          let tsx = await contract.mintWithOG(+oogearCounter, true, gasFee);
          setActionLoadingText(getActionLoadingMintMessage(+oogearCounter));
          setActionLoading(true);
          tsx
            .wait()
            .then(async (receipt) => {
              setTsxNumber(2);
              getMintMultiEventAndWaitSecondTx(receipt);
              getOogearBalance();
              getTotalMinted();
            })
            .catch((error) => {
              console.log(error);
              message.error(SOMETHING_WENT_WRONG);
              setActionLoading(false);
            });
        } catch (error) {
          console.log(error);
          message.error(SOMETHING_WENT_WRONG);
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
      if (checkBalance(dmtCounter, mintDMTPrice, DMTBalanceBigNumber)) {
        setIsDisableDMTButton(true);
        let gasFee = await getGasFee(+dmtCounter, true);
        try {
          let tsx = await contract.mintWithDMT(dmtCounter, gasFee);
          setActionLoadingText(getActionLoadingMintMessage(+dmtCounter));
          setActionLoading(true);
          tsx
            .wait()
            .then(async (receipt) => {
              setTsxNumber(2);
              getMintMultiEventAndWaitSecondTx(receipt);
              getDmtBalance();
              getTotalMinted();
              getTotalMintedDMTAmount();
            })
            .catch((error) => {
              console.log(error);
              message.error(SOMETHING_WENT_WRONG);
              setActionLoading(false);
            });
        } catch (error) {
          console.log(error);
          message.error(SOMETHING_WENT_WRONG);
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
                    oogearCounter === 0 || isMintSale
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
                    oogearCounter === MAX_TOKEN_AMOUNT || isMintSale
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
                Mint Price:{" "}
                {beautifyNumber(convertBigNumberToPrice(mintOGPrice))} $OG{" "}
                <span>
                  Mint & Stake Price:{" "}
                  {beautifyNumber(convertBigNumberToPrice(mintAndStakeOGPrice))}{" "}
                  $OG
                </span>
              </HelperOGText>
            </OogearBox>
            <DmtBox>
              <Counter>
                <div
                  className={
                    dmtCounter === 0 || isMintSale ? "minus disabled" : "minus"
                  }
                  onClick={handleDmtCounter("minus")}>
                  <MinusOutlined />
                </div>
                <div className="number noselect" counter={dmtCounter}>
                  {dmtCounter}
                </div>
                <div
                  className={
                    dmtCounter === MAX_TOKEN_AMOUNT || isMintSale
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
                Price {beautifyNumber(convertBigNumberToPrice(mintDMTPrice))}{" "}
                $DMT{" "}
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
      {loader && <Loading open={loader} />}
      {isResultsModalOpen && (
        <ResultsModal
          open={isResultsModalOpen}
          handleClose={handleCloseResultsModal}
          tokens={tokens}
        />
      )}
      {actionLoading && (
        <ActionsModal
          open={actionLoading}
          text={actionLoadingText}
          tsxNumber={tsxNumber}
          tsxTotalNumber={2}
        />
      )}
    </Wrapper>
  );
};

export default withConnect(Crafting, "/game/crafting");
