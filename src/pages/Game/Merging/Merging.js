import { useState, useContext } from "react";
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
// ******** Demo images ********
import MekaImageOne from '../../../assets/Demo/MekaMerge/Kopie_von_Meka_M0_1.png';
import MekaImageTwo from '../../../assets/Demo/MekaMerge/Kopie_von_Meka_M0-2.png';
import MekaImageThree from '../../../assets/Demo/MekaMerge/Kopie_von_Meka_M0_3.png';
// ******** Services ********
import contract from "../../../services/contract";
// ******** Store ********
import { MintedContext } from "../../../store/minted-context";
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

const EXAMPLE_DATA = [
  {
    img: MekaImageOne,
    name: "Ape #2323",
    level: 0,
    status: "staked",
    id: 1,
  },
  {
    img: MekaImageTwo,
    name: "Ape #2323",
    level: 0,
    status: "staked",
    id: 2,
  },
  {
    img: MekaImageThree,
    name: "Ape #2323",
    level: 0,
    status: "staked",
    id: 3,
  },
];

const PRE_SALE_AMOUNT = 10000;

//TODO: filter the list of unstake and level 0 meka apes

const Merging = () => {
  const { totalMintedTokens } = useContext(MintedContext);
  const [isApeModalOpen, setIsApeModalOpen] = useState(false);
  const [keepMeka, setKeepMeka] = useState(null);
  const [burnMeka, setBurnMeka] = useState(null);
  const [selectedApe, setSelectedApe] = useState(null);
  const [type, setType] = useState(null);
  const [oppositeApe, setOppositeApe] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

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
    if (totalMintedTokens > PRE_SALE_AMOUNT) {
      if (burnMeka && keepMeka) {
        setIsDisabled(true);
        try {
          // TODO: pass the proper token id
          // TODO: first one is saved, second one is burned
          let tsx = await contract.mergeMekaApes(1231, 1541);
          setLoading(true);
          tsx.wait().then(() => {
            // TODO: get the  fresh list of meka apes
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
              new mints.
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
          list={EXAMPLE_DATA}
          oppositeApe={oppositeApe}
          type={type}
        />
      )}
      <Loading open={loading} />
    </Wrapper>
  );
};

export default withConnect(Merging, "/game/merging");
