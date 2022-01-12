import { useState, useContext, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
// ******** Components ********
import { message } from "antd";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import MergeMekaApesModal from "../../../components/Modals/MergeMekaApes/MergeMekaApes";
import Loading from "../../../components/Modals/Loading/Loading";
// ******** HOC ********
import withConnect from "../../../hoc/withConnect";
// ******** Images ********
import Placeholder from "../../../assets/placeholder.png";
import MergingArrow from "../../../assets/merging_arrow.svg";
// ******** Queires ********
import { GET_MEKA_MERGE_TOKENS } from "../../../queries";
// ******** Services ********
import contract from "../../../services/contract";
// ******** Store ********
import { MintedContext } from "../../../store/minted-context";
import { UserContext } from "../../../store/user-context";
// ******** Text ********
import { PRE_SALE_IS_ONGOING } from "../../../messages";
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
} from "./Merging.styles";

//TODO: get the mekaMerge price and check the price before click
//TODO: pull $OG after transaction
const Merging = () => {
  const { isMintSale } = useContext(MintedContext);
  const { userMetaMaskToken } = useContext(UserContext);
  const [isApeModalOpen, setIsApeModalOpen] = useState(false);
  const [keepMeka, setKeepMeka] = useState(null);
  const [burnMeka, setBurnMeka] = useState(null);
  const [selectedApe, setSelectedApe] = useState(null);
  const [type, setType] = useState(null);
  const [oppositeApe, setOppositeApe] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loader, setLoading] = useState(false);
  const [list, setList] = useState(false);
  const [getMekaApes, { loading, data, refetch }] = useLazyQuery(
    GET_MEKA_MERGE_TOKENS
  );

  useEffect(() => {
    if (data && data.spaceOogas) {
      setList(data.spaceOogas);
    } else {
      setList(null);
    }
  }, [data]);

  useEffect(() => {
    let isMounted = true;
    if (userMetaMaskToken && isMounted) {
      getMekaApes({
        variables: {
          owner: userMetaMaskToken,
        },
      });
    }
    return () => {
      isMounted = false;
    };
  }, [userMetaMaskToken, getMekaApes]);

  useEffect(() => {
    if (loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loading]);

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
      return <img src={keepMeka.img} alt={keepMeka.name} />;
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
      return <img src={burnMeka.img} alt={burnMeka.name} />;
    } else {
      return (
        <>
          <img src={Placeholder} alt="ape" />
          <span>Click to Select</span>
        </>
      );
    }
  };

  const handleClickMerge = async () => {
    if (!isMintSale) {
      if (burnMeka && keepMeka) {
        setIsDisabled(true);
        try {
          // first one is saved, second one is burned
          let tsx = await contract.mergeMekaApes(keepMeka.id, burnMeka.id);
          setLoading(true);
          tsx.wait().then(() => {
            refetch({
              variables: {
                owner: userMetaMaskToken,
              },
            });
            setLoading(false);
          });
        } catch (error) {
          console.log(error);
        }
        setIsDisabled(false);
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
              Select two MekaApes you want to merge. The MekaApe on the left
              will receive a random Mega Level (M1, M2 or M3). The MekaApe on
              the right will get burned. With the Mega Level, MekaApes get a
              bigger share of the $OG tax and also gain the ability to be gifted
              new mints. Merging costs 2,000 $OG.
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
      <Loading open={loader} />
    </Wrapper>
  );
};

export default withConnect(Merging, "/game/merging");
