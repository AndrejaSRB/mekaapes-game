import { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
// ******** Config ********
import whitelistJSON from "../../config/whitelistMintSignatures.json";
// ******** Components ********
import { message } from "antd";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Modals/Loading/Loading";
import CustomCountdown from "../../components/CustomCountdown/CustomCountdown";
// ******** HOC ********
import withConnect from "../../hoc/withConnect";
// ******** stores ********
import { UserContext } from "../../store/user-context";
import { MintedContext } from "../../store/minted-context";
// ******** Icons ********
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
// ******** Services ********
import metamask from "../../services/metamask";
import contract from "../../services/contract";
import prices from "../../services/prices";
// ******** Text ********
import { DONT_ENOUGH_ETH } from "../../messages";
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

const Minting = () => {
  const { userMetaMaskToken } = useContext(UserContext);
  const { totalMintedTokens, getTotalMinted } = useContext(MintedContext);
  const [currentETHBalance, setCurrentETHBalance] = useState(0);
  const [counter, setCounter] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [maxTokenAmount, setMaxTokenAmount] = useState(3);
  const [priceMint, setPriceMint] = useState(0);
  const [priceMintAndStake, setPriceMintAndStake] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mintSign, setMintSign] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isPreSaleCompleted, setIsPreSaleCompleted] = useState(false);

  useEffect(() => {
    if (userMetaMaskToken) {
      if (whitelistJSON && whitelistJSON.length > 0) {
        let isWhitelisted = whitelistJSON.find(
          (users) => users.address === userMetaMaskToken
        );
        setIsChecked(true);
        if (isWhitelisted) {
          const { mintSign } = isWhitelisted;
          setMaxTokenAmount(mintSign.mintAllowance);
          setMintSign(mintSign);
        } else {
          setMaxTokenAmount(0);
          setMintSign(null);
        }
      }
    }
  }, [userMetaMaskToken]);

  //   Get the maxTokenAmount
  useEffect(() => {
    if (userMetaMaskToken && isChecked) {
      const getMaxTokenAmount = async () => {
        try {
          await contract
            .allowedToMint(userMetaMaskToken, maxTokenAmount)
            .then((res) => {
              setMaxTokenAmount(+res.toString());
            });
        } catch (error) {
          console.log(error);
        }
      };
      getMaxTokenAmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMetaMaskToken, isChecked]);

  // Get the ETH Balance
  useEffect(() => {
    if (userMetaMaskToken) {
      const getETHBalance = async () => {
        let balance = await metamask.getBalance(userMetaMaskToken);
        setCurrentETHBalance(balance);
      };
      getETHBalance();
    } else {
      setCurrentETHBalance(0);
    }
  }, [userMetaMaskToken]);

  // Get the Mint ETH Price
  useEffect(() => {
    const getPriceMint = async () => {
      let price = await prices.getMintPrice();
      setPriceMint(price);
    };
    getPriceMint();
  }, []);

  // Get the Mint&Stake ETH Price
  useEffect(() => {
    const getPriceMintAndStake = async () => {
      let price = await prices.getMintStakePrice();
      setPriceMintAndStake(price);
    };
    getPriceMintAndStake();
  }, []);

  useEffect(() => {
    if (counter > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [counter]);

  const handleCounter = (type) => () => {
    if (type === "plus" && counter < maxTokenAmount) {
      setCounter(counter + 1);
    } else if (type === "minus" && counter > 0) {
      setCounter(counter - 1);
    }
  };

  const checkCurrentETHBalance = async () => {
    let balance = await metamask.getBalance(userMetaMaskToken);
    setCurrentETHBalance(balance);
  };

  const getMaxTokenAmount = async () => {
    try {
      await contract
        .allowedToMint(userMetaMaskToken, maxTokenAmount)
        .then((res) => {
          setMaxTokenAmount(+res.toString());
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickMintAndStake = async () => {
    if (
      currentETHBalance.toString() >
      +priceMintAndStake.toString() * counter
    ) {
      setIsDisabled(true);
      try {
        let tsx = await contract.mint(
          counter,
          true,
          priceMintAndStake.mul(counter),
          mintSign
        );
        setLoading(true);
        tsx.wait().then(async () => {
          getTotalMinted();
          await getMaxTokenAmount();
          await checkCurrentETHBalance();
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
      }
      setCounter(0);
      setIsDisabled(false);
    } else {
      message.error(DONT_ENOUGH_ETH);
    }
  };

  const handleClickMint = async () => {
    if (currentETHBalance.toString() > priceMint.toString() * counter) {
      setIsDisabled(true);
      try {
        let tsx = await contract.mint(
          counter,
          false,
          priceMint.mul(counter),
          mintSign
        );
        setLoading(true);
        tsx.wait().then(async () => {
          getTotalMinted();
          await getMaxTokenAmount();
          await checkCurrentETHBalance();
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
      }
      setCounter(0);
      setIsDisabled(false);
    } else {
      message.error(DONT_ENOUGH_ETH);
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
    if (totalMintedTokens > 0) {
      let number = totalMintedTokens;
      if (number < 10000) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return "10,000";
      }
    } else {
      return 0;
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
          {isPreSaleCompleted ? (
            <h4>MekaApes Game Public Sale</h4>
          ) : (
            <h4>MekaApes Game Whitelist Sale</h4>
          )}
          {isPreSaleCompleted ? (
            <IntroText>
              Public mint is live! The game starts immediately after the public sale!{" "}
              <span>
                Choose "Mint and Stake" to safe one transaction and earn $OG
                immediately.
              </span>
            </IntroText>
          ) : (
            <IntroText>
              The whitelist sale will turn into public sale when the timer runs out. The game starts immediately after the public sale!{" "}
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
              disabled={isDisabled}
              className="noselect"
              onClick={handleClickMintAndStake}>
              Mint & Stake
            </button>
            <Price className="noselect">
              <span>Price {getSmallETHPrice(priceMintAndStake)} ETH</span>
            </Price>
            <button
              disabled={isDisabled}
              className="noselect orange"
              onClick={handleClickMint}>
              Mint Only
            </button>
          </ButtonWrapper>
          <Price className="noselect" margin>
            <span>Price {getSmallETHPrice(priceMint)} ETH</span>
          </Price>
          <CustomCountdown
            getCurrentAmount={getCurrentAmount}
            setIsPreSaleCompleted={setIsPreSaleCompleted}
          />
        </MainBox>
      </Content>
      <Footer page="minting" />
      <Loading open={loading} />
    </Wrapper>
  );
};

export default withConnect(Minting, "/minting");
