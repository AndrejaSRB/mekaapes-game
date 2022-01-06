import { useState } from "react";
// ******** Components ********
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import MergeMekaApesModal from "../../../components/Modals/MergeMekaApes/MergeMekaApes";
import Loading from "../../../components/Modals/Loading/Loading";
// ******** HOC ********
import withConnect from "../../../hoc/withConnect";
// ******** Images ********
import PlaceholderApe from "../../../assets/placeholder_ape.png";
import MekaApeExample from "../../../assets/meka-ape-landing.png";
import RoboOogaExample from "../../../assets/landing-image.png";
import MergingArrow from "../../../assets/merging_arrow.svg";
// ******** Services ********
import contract from "../../../services/contract";
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
    img: RoboOogaExample,
    name: "Ape #2323",
    level: 0,
    status: "staked",
    id: 1,
  },
  {
    img: MekaApeExample,
    name: "Ape #1121",
    level: 1,
    status: "staked",
    id: 2,
  },
  {
    img: RoboOogaExample,
    name: "Ape #12",
    level: 0,
    status: "staked",
    id: 3,
  },
  {
    img: RoboOogaExample,
    name: "Ape #31231",
    level: 0,
    status: "unstaked",
    id: 4,
  },
  {
    img: MekaApeExample,
    name: "Ape #9393",
    level: 1,
    status: "unstaked",
    id: 5,
  },
  {
    img: RoboOogaExample,
    name: "Ape #1123",
    level: 0,
    status: "staked",
    id: 6,
  },
  {
    img: MekaApeExample,
    name: "Ape #8828",
    level: 0,
    status: "staked",
    id: 7,
  },
  {
    img: MekaApeExample,
    name: "Ape #838",
    level: 1,
    status: "unstaked",
    id: 8,
  },
  {
    img: RoboOogaExample,
    name: "Ape #1231",
    level: 0,
    status: "staked",
    id: 92,
  },
  {
    img: MekaApeExample,
    name: "Ape #111",
    level: 1,
    status: "staked",
    id: 212,
  },
  {
    img: RoboOogaExample,
    name: "Ape #989",
    level: 0,
    status: "staked",
    id: 13,
  },
  {
    img: MekaApeExample,
    name: "Ape #642",
    level: 0,
    status: "staked",
    id: 11,
  },
  {
    img: RoboOogaExample,
    name: "Ape #100",
    level: 0,
    status: "staked",
    id: 120,
  },
];
// TODO: filter the list of unstake and level 0 meka apes

const Merging = () => {
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
          <img src={PlaceholderApe} alt="ape" />
          <span>Select</span>
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
          <img src={PlaceholderApe} alt="ape" />
          <span>Select</span>
        </>
      );
    }
  };

  const handleClickMerge = async () => {
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
            <h4>Become a Mega Meka!</h4>
            <h6>
              Select two MekaApes you want to merge. The MekaApe on the left
              will receive a random Mega Level. The MekaApe on the right will
              get burned. With the Mega Level, MekaApes get a bigger share of
              the $OG tax and also gain the ability to be gifted new mints.
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
