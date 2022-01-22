import { useEffect, useState, useContext, useRef } from "react";
import { ethers, BigNumber } from "ethers";
import { useApolloClient } from "@apollo/client";
import * as Sentry from "@sentry/react";
// ******** Config ********
import whitelistJSON from "../../config/whitelistMintSignatures.json";
// ******** Components ********
import { message } from "antd";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Modals/Loading/Loading";
import CustomCountdown from "../../components/CustomCountdown/CustomCountdown";
import ResultsModal from "../../components/Modals/ResultModal/ResultModal";
import ActionsModal from "../../components/Modals/ActionLoading/ActionLoading";
// ******** HOC ********
import withConnect from "../../hoc/withConnect";
// ******** stores ********
import { UserContext } from "../../store/user-context";
import { MintedContext } from "../../store/minted-context";
// ******** Hooks ********
import usePrices from "../../hooks/usePrices";
import useETHBalance from "../../hooks/useETHBalance";
import useMaxTokenAmount from "../../hooks/useMaxTokenAmount";
import useTotalAmountMintedTokens from "../../hooks/useTotalAmountMintedTokens";
// ******** Icons ********
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
// ******** Services ********
import contract from "../../services/contract";
// ******** Config ********
import pricesOrder from "../../config/pricesOrder";
// ******** Text ********
import {
  DONT_ENOUGH_ETH,
  SOMETHING_WENT_WRONG,
  getActionLoadingMintMessage,
} from "../../messages";
// ******** Events ********
import {
  getAllEvents,
  getEvent,
  MEKA_CONVERT,
  OOGA_ATTACKED,
  MINT_MULTIPLE_ROBO,
  makeRandomSubscription,
} from "../../eventsListeners";
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

const emptyMintSign = {
  mintAllowance: 0,
  _v: 0,
  _s: ethers.constants.HashZero,
  _r: ethers.constants.HashZero,
};

const Minting = () => {
  const client = useApolloClient();
  const { userMetaMaskToken } = useContext(UserContext);
  const { isMintSale, isPublicSale } = useContext(MintedContext);
  const [counter, setCounter] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [mintSign, setMintSign] = useState(emptyMintSign);
  // Action Modal
  const [actionLoading, setActionLoading] = useState(false);
  const [actionLoadingText, setActionLoadingText] = useState("");
  const [tsxNumber, setTsxNumber] = useState(0);
  // Total Amount
  const {
    data: amount,
    isLoading: totalAmountLoading,
    refetch: getTotalMinted,
  } = useTotalAmountMintedTokens(userMetaMaskToken);
  // Max Token
  const {
    data: maxTokenAmount,
    isLoading: maxTokenAmountLoading,
    refetch: getMaxTokenAmount,
  } = useMaxTokenAmount(userMetaMaskToken);
  // ETH Balance
  const [currentETHBalance, setCurrentETHBalance] = useState(0);
  const {
    data: ethBalance,
    isLoading: ethBalanceLoading,
    refetch: getEthBalance,
  } = useETHBalance(userMetaMaskToken);
  // Prices
  const { data: prices, isLoading: priceLoading } =
    usePrices(userMetaMaskToken);
  const [priceMint, setPriceMint] = useState(BigNumber.from(0));
  const [priceMintAndStake, setPriceMintAndStake] = useState(BigNumber.from(0));
  // Transaction Events
  const tsxAmount = useRef(BigNumber.from(0));
  const tsxStartFromTokenId = useRef(BigNumber.from(0));
  const [tokens, setTokens] = useState(null);
  const [craftingType, setCraftingType] = useState(null);

  // loading state
  useEffect(() => {
    if (
      priceLoading ||
      ethBalanceLoading ||
      maxTokenAmountLoading ||
      totalAmountLoading
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [
    priceLoading,
    ethBalanceLoading,
    maxTokenAmountLoading,
    totalAmountLoading,
  ]);

  // set eth balance
  useEffect(() => {
    if (ethBalance) {
      setCurrentETHBalance(ethBalance);
    } else {
      setCurrentETHBalance(0);
    }
  }, [ethBalance]);

  // set prices
  useEffect(() => {
    if (userMetaMaskToken && prices && !priceLoading) {
      const ethMintPrice = prices?.["mintPrice"]
        ? prices?.["mintPrice"]
        : prices?.[pricesOrder["mintPrice"]];
      const ethMintAndStakePrice = prices?.["mintStakePrice"]
        ? prices?.["mintStakePrice"]
        : prices?.[pricesOrder["mintStakePrice"]];
      setPriceMint(ethMintPrice);
      setPriceMintAndStake(ethMintAndStakePrice);
    }
  }, [prices, userMetaMaskToken, priceLoading]);

  // check if the user is whitelisted
  useEffect(() => {
    if (userMetaMaskToken) {
      if (whitelistJSON && whitelistJSON.length > 0) {
        let isWhitelisted = whitelistJSON.find(
          (users) => users.address === userMetaMaskToken
        );
        if (isWhitelisted) {
          const { mintSign } = isWhitelisted;
          setMintSign(mintSign);
        } else {
          setMintSign(emptyMintSign);
        }
      }
    }
  }, [userMetaMaskToken]);

  useEffect(() => {
    if (!isMintSale) {
      setIsDisabled(true);
    }
  }, [isMintSale]);

  useEffect(() => {
    if (counter > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [counter, isMintSale]);

  const handleCounter = (type) => () => {
    if (type === "plus" && counter < maxTokenAmount) {
      setCounter(counter + 1);
    } else if (type === "minus" && counter > 0) {
      setCounter(counter - 1);
    }
  };

  const getSmallETHPrice = (price) => {
    if (price) {
      return ethers.utils.formatUnits(price);
    } else {
      return price;
    }
  };

  const getCurrentAmount = () => {
    if (amount > 0) {
      let number = amount;
      if (number < 10000) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return "10,000";
      }
    } else {
      return 0;
    }
  };

  const getFreshTokens = async () => {
    await client.cache.reset().then(async () => {
      await client.refetchQueries({
        include: ["GetUnstakeRoboOogas", "GetUnstakeMekaApes", "GetStakedApe"],
      });
    });
  };

  const getFreshData = async () => {
    getTotalMinted();
    getMaxTokenAmount();
    getEthBalance();
    await getFreshTokens();
  };

  const handleCloseResultsModal = async () => {
    setIsResultsModalOpen(false);
    await getFreshData();
    setTokens(null);
    setCraftingType(null);
    tsxAmount.current = BigNumber.from(0);
    tsxStartFromTokenId.current = BigNumber.from(0);
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
            token.name = "MekaApe";
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
          if (token.id === tokenId) {
            token.stolen = true;
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

  const handleClickMintAndStake = async () => {
    if (
      currentETHBalance.gt(priceMintAndStake.mul(counter)) ||
      currentETHBalance.eq(priceMintAndStake.mul(counter))
    ) {
      setIsDisabled(true);
      setCraftingType("mint&stake");
      try {
        let tsx = await contract.mint(
          counter,
          true,
          priceMintAndStake.mul(counter),
          mintSign
        );
        setActionLoadingText(getActionLoadingMintMessage(+counter));
        setActionLoading(true);
        tsx
          .wait()
          .then(async (receipt) => {
            setTsxNumber(2);
            getMintMultiEventAndWaitSecondTx(receipt);
            getFreshData();
          })
          .catch((error) => {
            console.log(error);
            Sentry.captureException(new Error(error), {
              tags: {
                section: "ETH Mint&Stake tsx.wait",
              },
            });
            setActionLoading(false);
            message.error(SOMETHING_WENT_WRONG);
          });
      } catch (error) {
        console.log(error);
        Sentry.captureException(new Error(error), {
          tags: {
            section: "ETH Mint&Stake 1st tsx",
          },
        });
        message.error(SOMETHING_WENT_WRONG);
      }
      setCounter(0);
      setIsDisabled(false);
    } else {
      message.error(DONT_ENOUGH_ETH);
    }
  };

  const handleClickMint = async () => {
    if (
      currentETHBalance.gt(priceMint.mul(counter)) ||
      currentETHBalance.eq(priceMint.mul(counter))
    ) {
      setIsDisabled(true);
      setCraftingType("mint");
      try {
        let tsx = await contract.mint(
          counter,
          false,
          priceMint.mul(counter),
          mintSign
        );
        setActionLoadingText(getActionLoadingMintMessage(+counter));
        setActionLoading(true);
        tsx
          .wait()
          .then(async (receipt) => {
            setTsxNumber(2);
            getMintMultiEventAndWaitSecondTx(receipt);
            getFreshData();
          })
          .catch((error) => {
            console.log(error);
            Sentry.captureException(new Error(error), {
              tags: {
                section: "ETH Mint tsx.wait",
              },
            });
            setActionLoading(false);
            message.error(SOMETHING_WENT_WRONG);
          });
      } catch (error) {
        console.log(error);
        Sentry.captureException(new Error(error), {
          tags: {
            section: "ETH Mint 1st tsx",
          },
        });
        message.error(SOMETHING_WENT_WRONG);
      }
      setCounter(0);
      setIsDisabled(false);
    } else {
      message.error(DONT_ENOUGH_ETH);
    }
  };

  return (
    <Wrapper>
      <Header page="minting" />
      <Content>
        <Title>
          You're currently able to mint: <span>{maxTokenAmount}</span>
        </Title>
        <MainBox>
          {isPublicSale ? (
            <h4>MekaApes Game Public Sale</h4>
          ) : (
            <h4>MekaApes Game Whitelist Sale</h4>
          )}
          {isPublicSale ? (
            <IntroText>
              Public mint is live! The game starts immediately after the public
              sale!{" "}
              <span>
                Choose "Mint and Stake" to safe one transaction and earn $OG
                immediately.
              </span>
            </IntroText>
          ) : (
            <IntroText>
              The whitelist sale will turn into public sale when the timer runs
              out. The game starts immediately after the public sale!{" "}
              <span>
                Choose "Mint and Stake" to safe one transaction and earn $OG
                immediately.
              </span>
            </IntroText>
          )}
          <Counter>
            <div
              className={counter === 0 ? "icon disabled" : "icon"}
              onClick={handleCounter("minus")}>
              <MinusOutlined />
            </div>
            <div className="number noselect">{counter}</div>
            <div
              className={maxTokenAmount === counter ? "icon disabled" : "icon"}
              onClick={handleCounter("plus")}>
              <PlusOutlined />
            </div>
          </Counter>
          <ButtonWrapper>
            <button
              disabled={isDisabled || counter === 0}
              className="noselect"
              onClick={handleClickMintAndStake}>
              Mint & Stake
            </button>
            <Price className="noselect">
              <span>Price {getSmallETHPrice(priceMintAndStake)} ETH</span>
            </Price>
            <button
              disabled={isDisabled || counter === 0}
              className="noselect orange"
              onClick={handleClickMint}>
              Mint Only
            </button>
          </ButtonWrapper>
          <Price className="noselect" margin>
            <span>Price {getSmallETHPrice(priceMint)} ETH</span>
          </Price>
          <CustomCountdown getCurrentAmount={getCurrentAmount} />
        </MainBox>
      </Content>
      <Footer page="minting" />
      {loading && <Loading open={loading} />}
      {isResultsModalOpen && (
        <ResultsModal
          open={isResultsModalOpen}
          handleClose={handleCloseResultsModal}
          tokens={tokens}
          craftingType={craftingType}
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

export default withConnect(Minting, "/minting");
