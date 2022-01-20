import { useState, useContext, useEffect } from "react";
import { useLazyQuery, useApolloClient } from "@apollo/client";
import { BigNumber } from "ethers";
// ******** Components ********
import { message } from "antd";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import MergeMekaApesModal from "../../../components/Modals/MergeMekaApes/MergeMekaApes";
import Loading from "../../../components/Modals/Loading/Loading";
import ResultsModal from "../../../components/Modals/ResultModal/ResultModal";
import ActionsLoading from "../../../components/Modals/ActionLoading/ActionLoading";
// ******** HOC ********
import withConnect from "../../../hoc/withConnect";
// ******** Images ********
import Placeholder from "../../../assets/placeholder.png";
import MergingArrow from "../../../assets/merging_arrow.svg";
// ******** Queires ********
import {
  GET_MEKA_MERGE_TOKENS_UNSTAKE,
  GET_MEKA_MERGE_TOKENS_STAKED,
} from "../../../queries";
// ******** Services ********
import contract from "../../../services/contract";
import gas from "../../../services/gas";
// ******** Store ********
import { MintedContext } from "../../../store/minted-context";
import { BalanceContext } from "../../../store/balance-context";
import { UserContext } from "../../../store/user-context";
// ******** Hooks ********
import usePrices from "../../../hooks/usePrices";
// ******** Text ********
import {
  PRE_SALE_IS_ONGOING,
  DONT_ENOUGH_OG,
  SOMETHING_WENT_WRONG,
  ACTION_LOADING_MERGE,
} from "../../../messages";
// ******** Functions ********
import { convertBigNumberToPrice } from "../Upgrade/helpers";
import { getCurrentGasFee } from "../Factory/helper";
// ******** Config ********
import priceOrder from "../../../config/pricesOrder";
// ******** Events ********
import {
  MEKA_MERGE,
  getAllEvents,
  makeRandomSubscription,
} from "../../../eventsListeners";
// ******** Styles ********
import {
  Wrapper,
  Title,
  Content,
  MainBox,
  TitleBox,
  MergingBox,
  Box,
  ButtonBox,
  HelperText,
  PlaceholderImage,
} from "./Merging.styles";

const Merging = () => {
  const client = useApolloClient();
  const { isMintSale } = useContext(MintedContext);
  const { userMetaMaskToken } = useContext(UserContext);
  const { getOogearBalance, OGBalanceBigNumber } = useContext(BalanceContext);
  const [isApeModalOpen, setIsApeModalOpen] = useState(false);
  const [keepMeka, setKeepMeka] = useState(null);
  const [burnMeka, setBurnMeka] = useState(null);
  const [selectedApe, setSelectedApe] = useState(null);
  const [type, setType] = useState(null);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [oppositeApe, setOppositeApe] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loader, setLoading] = useState(false);
  const [list, setList] = useState(false);
  // Action Loading
  const [actionLoading, setActionLoading] = useState(false);
  const [tsxNumber, setTsxNumber] = useState(1);

  const [
    getUnstakeMekaApes,
    { loading: unstakeLoading, data: unstakedMekaData },
  ] = useLazyQuery(GET_MEKA_MERGE_TOKENS_UNSTAKE);

  const [getStakedMekaApes, { loading: stakeLoading, data: stakedMekaData }] =
    useLazyQuery(GET_MEKA_MERGE_TOKENS_STAKED);

  // Prices
  const { data: prices, isLoading: priceLoading } =
    usePrices(userMetaMaskToken);
  const [mergePrice, setMergePrice] = useState(BigNumber.from(0));
  // Events
  const [tokens, setTokens] = useState(null);

  // Set Price
  useEffect(() => {
    if (userMetaMaskToken && prices && !priceLoading) {
      const merge_price = prices?.["mekaMergePrice"]
        ? prices?.["mekaMergePrice"]
        : prices?.[priceOrder["mekaMergePrice"]];
      setMergePrice(merge_price);
    }
  }, [prices, userMetaMaskToken, priceLoading]);

  useEffect(() => {
    if (
      unstakedMekaData &&
      unstakedMekaData.spaceOogas &&
      stakedMekaData &&
      stakedMekaData.spaceOogas
    ) {
      setList([...unstakedMekaData.spaceOogas, ...stakedMekaData.spaceOogas]);
    } else {
      setList(null);
    }
  }, [unstakedMekaData, stakedMekaData]);

  // Get Data
  useEffect(() => {
    let isMounted = true;
    if (userMetaMaskToken && isMounted && isApeModalOpen) {
      getUnstakeMekaApes({
        variables: {
          owner: userMetaMaskToken,
        },
      });
      getStakedMekaApes({
        variables: {
          owner: userMetaMaskToken,
        },
      });
    }
    return () => {
      isMounted = false;
    };
  }, [
    userMetaMaskToken,
    getUnstakeMekaApes,
    isApeModalOpen,
    getStakedMekaApes,
  ]);

  // Loading state
  useEffect(() => {
    if (unstakeLoading || stakeLoading || priceLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [unstakeLoading, stakeLoading, priceLoading]);

  const handleOpenApeModal = (type) => () => {
    if (type === "keep") {
      setType("keep");
      setSelectedApe(keepMeka);
      setOppositeApe(burnMeka);
    } else {
      setType("burn");
      setSelectedApe(burnMeka);
      setOppositeApe(keepMeka);
    }
    setIsApeModalOpen(true);
  };

  const handleCloseApeModal = () => {
    setIsApeModalOpen(false);
    setSelectedApe(null);
    setOppositeApe(null);
  };

  const handleSavePickedApe = (ape) => {
    if (type === "keep") {
      setKeepMeka(ape);
    } else {
      setBurnMeka(ape);
    }
    setType(null);
  };

  const renderKeepApe = () => {
    if (keepMeka) {
      if (keepMeka?.image) {
        return <img src={keepMeka.img} alt={keepMeka.id} />;
      } else {
        return <PlaceholderImage />;
      }
    } else {
      return (
        <>
          <img src={Placeholder} alt="ape" />
          <span>Click to Select</span>
        </>
      );
    }
  };

  const renderBurnApe = () => {
    if (burnMeka) {
      if (burnMeka?.image) {
        return <img src={burnMeka.img} alt={burnMeka.id} />;
      } else {
        return <PlaceholderImage />;
      }
    } else {
      return (
        <>
          <img src={Placeholder} alt="ape" />
          <span>Click to Select</span>
        </>
      );
    }
  };

  const getFreshData = async () => {
    await client.cache.reset().then(async () => {
      getUnstakeMekaApes({
        variables: {
          owner: userMetaMaskToken,
        },
      });
      getStakedMekaApes({
        variables: {
          owner: userMetaMaskToken,
        },
      });
    });
  };

  const handleCloseResultsModal = () => {
    setIsResultsModalOpen(false);
    getFreshData();
    getOogearBalance();
    setKeepMeka(null);
    setBurnMeka(null);
    setTokens(null);
  };

  const getGasFee = async () => {
    let gasFee = await getCurrentGasFee();
    let randomGasFee = await gas.getMergeRandomGas();
    let total = gasFee.mul(randomGasFee);
    return total;
  };

  const onRandomsReceived = async (requestId, entropy, event) => {
    let txReceipt = await event.getTransactionReceipt();
    let { mekaApesContract } = contract;

    let tokens = [];
    let mekaConvertEvent = getAllEvents(
      txReceipt,
      mekaApesContract,
      MEKA_MERGE
    );
    console.log("mekaConvertEvent", mekaConvertEvent);
    if (mekaConvertEvent?.length > 0) {
      mekaConvertEvent.forEach((event) => {
        let tokenId = event.args.tokenId.toNumber();
        let level = 0;
        if (BigNumber.isBigNumber(event.args.megaLevel)) {
          level = event.args.megaLevel.toNumber();
        }
        tokens.push({
          type: "merge",
          id: tokenId,
          level: level,
        });
      });
    }
    setTokens(tokens);
    setActionLoading(false);
    setTsxNumber(1);
    setKeepMeka(null);
    setBurnMeka(null);
    getFreshData();
    setIsResultsModalOpen(true);
  };

  const handleClickMerge = async () => {
    if (!isMintSale) {
      if (OGBalanceBigNumber.gt(mergePrice)) {
        if (burnMeka && keepMeka) {
          setIsDisabled(true);
          let gasFee = await getGasFee();
          try {
            // first one is saved, second one is burned
            let tsx = await contract.mergeMekaApes(
              keepMeka.id,
              burnMeka.id,
              gasFee
            );
            setActionLoading(true);
            tsx
              .wait()
              .then((receipt) => {
                setTsxNumber(2);
                makeRandomSubscription(receipt, contract, onRandomsReceived);
                getOogearBalance();
                getFreshData();
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
          setIsDisabled(false);
        }
      } else {
        message.error(DONT_ENOUGH_OG);
      }
    } else {
      message.info(PRE_SALE_IS_ONGOING);
    }
  };

  return (
    <Wrapper>
      <Header page="game" />
      <Content>
        <Title>
          Meka <span>Merge</span>
        </Title>
        <MainBox>
          <TitleBox>
            <h4>Receive a random Mega Level!</h4>
            <h6>
              {`Select two MekaApes you want to merge. The MekaApe on the left
              will receive a random Mega Level (M1, M2 or M3). The MekaApe on
              the right will get burned. With the Mega Level, MekaApes get a
              bigger share of the $OG tax and also gain the ability to be gifted
              new mints. Merging costs ${convertBigNumberToPrice(
                mergePrice
              )} $OG.`}
            </h6>
          </TitleBox>
          <MergingBox>
            <Box onClick={handleOpenApeModal("keep")}>
              {renderKeepApe()}
              <p>Keep</p>
            </Box>
            <img src={MergingArrow} alt="arrow" />
            <Box onClick={handleOpenApeModal("burn")}>
              {renderBurnApe()}
              <p>Burn</p>
            </Box>
          </MergingBox>
          <ButtonBox>
            <button
              onClick={handleClickMerge}
              disabled={
                !(Boolean(keepMeka) && Boolean(burnMeka)) && isDisabled
              }>
              Merge MekaApes!
            </button>
          </ButtonBox>
          <HelperText>
            After 1-3 minutes your MekaApe will receive the Mega Level trait.
            You might need to refresh the Metadata on OpenSea to see it.
          </HelperText>
        </MainBox>
      </Content>
      <Footer page="game" />
      {isApeModalOpen && (
        <MergeMekaApesModal
          open={isApeModalOpen}
          handleCloseModal={handleCloseApeModal}
          selectedApe={selectedApe}
          handleSavePickedApe={handleSavePickedApe}
          list={list}
          oppositeApe={oppositeApe}
          type={type}
        />
      )}
      {loader && <Loading open={loader} />}
      {isResultsModalOpen && (
        <ResultsModal
          open={isResultsModalOpen}
          handleClose={handleCloseResultsModal}
          title="You successfully merged your Meka Apes!"
          tokens={tokens}
        />
      )}
      {actionLoading && (
        <ActionsLoading
          open={actionLoading}
          text={ACTION_LOADING_MERGE}
          tsxNumber={tsxNumber}
          tsxTotalNumber={2}
        />
      )}
    </Wrapper>
  );
};

export default withConnect(Merging, "/game/merging");
