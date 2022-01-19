import { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLazyQuery } from "@apollo/client";
// ******** Components ********
import { message } from "antd";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Loading from "../../../components/Modals/Loading/Loading";
import ResultModal from "../../../components/Modals/ResultModal/ResultModal";
import ActionsLoading from "../../../components/Modals/ActionLoading/ActionLoading";
import Ape from "./Ape";
// ******** HOC ********
import withConnect from "../../../hoc/withConnect";
// ******** Hooks ********
import useWindowDimenstions from "../../../hooks/useWindowDimensions";
// ******** Images ********
import PlaceholderApe from "../../../assets/placeholder_ape.png";
import EvolveAnimation from "../../../assets/level_up.gif";
// ******** Services ********
import contract from "../../../services/contract";
// ******** Store ********
import { MintedContext } from "../../../store/minted-context";
import { UserContext } from "../../../store/user-context";
// ******** Text ********
import {
  PRE_SALE_IS_ONGOING,
  SOMETHING_WENT_WRONG,
  getActionLoadingEvolveMessage,
} from "../../../messages";
// ******** Queires ********
import { GET_BABY_OOGAS } from "../../../queries";
// ******** Events ********
import { BABY_EVOLVE, getAllEvents } from "../../../eventsListeners";
// ******** Styles ********
import {
  Wrapper,
  Title,
  Content,
  MainBox,
  TitleBox,
  ButtonBox,
  HelperText,
  ApesBox,
  SubtitleBox,
  CustomCheckbox,
  Box,
  LeftSide,
  RightSide,
  Animation,
} from "./Evolve.styles";

//TOOD display something after evolve

const Evolve = () => {
  const { width } = useWindowDimenstions();
  const { isMintSale } = useContext(MintedContext);
  const { userMetaMaskToken } = useContext(UserContext);
  const [selectAll, setSelectAll] = useState(false);
  const [allBabies, setAllBabies] = useState(null);
  const [allNotEvolved, setAllNotEvolved] = useState(null);
  const [selected, setSelected] = useState([]);
  const [isActive, setIsActive] = useState(null);
  const [minElementNumber, setMinElementNumber] = useState(16);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionLoadingText, setActionLoadingText] = useState("");
  const [tokens, setTokens] = useState(null);
  const [getBabies, { loading, data }] = useLazyQuery(GET_BABY_OOGAS);

  useEffect(() => {
    let isMounted = true;
    if (userMetaMaskToken && isMounted) {
      getBabies({
        variables: {
          owner: userMetaMaskToken,
        },
      });
    }
    return () => {
      isMounted = false;
    };
  }, [userMetaMaskToken, getBabies]);

  useEffect(() => {
    if (loading) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  }, [loading]);

  useEffect(() => {
    if (data?.babyOogas && data?.babyOogas.length > 0) {
      const { babyOogas } = data;
      let notEvolvedBabies = babyOogas.filter(
        (baby) => baby.evolvedTo === null
      );
      setAllNotEvolved(notEvolvedBabies);
    } else {
      setAllNotEvolved([]);
    }
  }, [data]);

  useEffect(() => {
    if (allNotEvolved) {
      let length = allNotEvolved.length;
      let babies = [...allNotEvolved];
      if (length < minElementNumber) {
        let placeholderArray = Array.from(
          { length: minElementNumber - length },
          () => ({
            img: PlaceholderApe,
            name: "ape",
            placeholder: true,
            id: uuidv4(),
          })
        );
        babies = [...allNotEvolved, ...placeholderArray];
      }
      setAllBabies(babies);
    }
  }, [minElementNumber, allNotEvolved]);

  useEffect(() => {
    if (width < 388) {
      setMinElementNumber(8);
    } else if (width < 1200) {
      setMinElementNumber(12);
    } else if (width > 1300) {
      setMinElementNumber(12);
    } else {
      setMinElementNumber(16);
    }
  }, [width]);

  const hadnleChangeCheckbox = (e) => {
    if (allNotEvolved?.length > 0) {
      if (!e.target.checked) {
        setSelected([]);
      } else {
        setSelected([...allNotEvolved]);
      }
      setSelectAll(e.target.checked);
    }
  };

  const handleClickApe = (ape, isPlaceholder) => () => {
    if (!isPlaceholder) {
      if (selectAll) {
        setSelectAll(false);
        setSelected([ape]);
      } else {
        if (selected && selected.length > 0) {
          if (selected.indexOf(ape) === -1) {
            setSelected([...selected, ape]);
          } else {
            let allBabies = [...selected];
            let index = null;
            selected.forEach((baby, i) => {
              if (baby.id === ape.id) {
                index = i;
              }
            });
            allBabies.splice(index, 1);
            setSelected(allBabies);
          }
        } else {
          setSelected([ape]);
        }
      }
    }
  };

  const getIfSelected = (id) => {
    if (selectAll) {
      return true;
    } else {
      if (selected && selected.length > 0) {
        return selected.find((item) => item.id === id);
      } else {
        return false;
      }
    }
  };

  const handleRenderBabyOogas = () => {
    if (allBabies && allBabies.length > 0) {
      return allBabies.map((ape) => (
        <Ape
          key={ape.id}
          ape={ape}
          handleClickApe={handleClickApe}
          getIfSelected={getIfSelected}
        />
      ));
    }
  };

  const getLength = () => {
    if (allBabies) {
      let length = allBabies.length;
      if (length === 0) {
        return minElementNumber;
      } else if (length > minElementNumber) {
        return length;
      } else {
        return minElementNumber;
      }
    } else {
      return minElementNumber;
    }
  };

  const getIfDisabled = () => {
    if (allBabies && allBabies.length > 0) {
      if (isActive) {
        return true;
      } else if (selectAll) {
        return false;
      } else {
        if (selected && selected.length > 0) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      return true;
    }
  };

  const handleCloseResultsModal = () => {
    setIsResultsModalOpen(false);
    getBabies({
      variables: {
        owner: userMetaMaskToken,
      },
    });
  };

  const getEvolveEvent = (receipt) => {
    let { mekaApesContract } = contract;
    let evolveEvent = getAllEvents(receipt, mekaApesContract, BABY_EVOLVE);
    let allTokens = [];
    if (evolveEvent?.length > 0) {
      evolveEvent.forEach((event) => {
        allTokens.push({
          type: "evolve",
          id: event.args.newTokenId.toNumber(),
          level: 0,
        });
      });
    }
    setTokens(allTokens);
    getBabies({
      variables: {
        owner: userMetaMaskToken,
      },
    });
    setActionLoadingText("");
    setActionLoading(false);
    setIsResultsModalOpen(true);
  };

  const handleClickEvolve = async () => {
    if (!isMintSale) {
      if (selected && selected.length > 0) {
        setIsActive(true);
        const tokenIds = [];
        selected.forEach((token) => tokenIds.push(token.id));
        try {
          let tsx = await contract.evolveBabyOogas(tokenIds);
          setActionLoading(true);
          setActionLoadingText(getActionLoadingEvolveMessage(selected));

          tsx
            .wait()
            .then((receipt) => {
              getEvolveEvent(receipt);
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
        setSelected([]);
        setIsActive(false);
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
          Baby Ooga <span>Evolution</span>
        </Title>
        <MainBox>
          <TitleBox>
            <h4>Evolve your Baby Oogas to MekaApes!</h4>
          </TitleBox>
          <Box>
            <LeftSide>
              <Animation>
                <img src={EvolveAnimation} alt="Evolve Animation" />
              </Animation>
            </LeftSide>
            <RightSide>
              <SubtitleBox>
                <p>Your Baby Oogas:</p>
                <CustomCheckbox
                  onChange={hadnleChangeCheckbox}
                  checked={selectAll}>
                  Select All:
                </CustomCheckbox>
              </SubtitleBox>
              <ApesBox length={getLength()}>{handleRenderBabyOogas()}</ApesBox>
            </RightSide>
          </Box>
          <ButtonBox>
            <button disabled={getIfDisabled()} onClick={handleClickEvolve}>
              Evolve
            </button>
          </ButtonBox>
          <HelperText>
            Every{" "}
            <a
              href="https://opensea.io/collection/oogaverse"
              target="_blank"
              rel="noreferrer">
              Baby Ooga
            </a>{" "}
            can claim a MekaApe. You are only paying for gas and also keep the
            Baby Ooga. It won't get burned.
          </HelperText>
        </MainBox>
      </Content>
      <Footer page="game" />
      {loader && <Loading open={loader} />}

      {isResultsModalOpen && (
        <ResultModal
          open={isResultsModalOpen}
          handleClose={handleCloseResultsModal}
          tokens={tokens}
        />
      )}
      {actionLoading && (
        <ActionsLoading
          open={actionLoading}
          text={actionLoadingText}
          tsxNumber={1}
          tsxTotalNumber={1}
        />
      )}
    </Wrapper>
  );
};

export default withConnect(Evolve, "/game/evolve");
