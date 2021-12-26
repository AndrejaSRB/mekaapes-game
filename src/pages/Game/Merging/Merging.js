import { useState } from "react";
// ******** Components ********
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import MergeMekaApesModal from "../../../components/Modals/MergeMekaApes/MergeMekaApes";
// ******** HOC ********
import withConnect from "../../../hoc/withConnect";
// ******** Images ********
import PlaceholderApe from "../../../assets/placeholder_ape.png";
import MekaApeExample from "../../../assets/meka-ape-landing.png";
import RoboOogaExample from "../../../assets/landing-image.png";
import MergingArrow from "../../../assets/merging_arrow.svg";
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

const Merging = () => {
  const [isApeModalOpen, setIsApeModalOpen] = useState(false);
  const [keepMeka, setKeepMeka] = useState(null);
  const [burnMeka, setBurnMeka] = useState(null);
  const [selectedApe, setSelectedApe] = useState(null);
  const [type, setType] = useState(null);

  const handleOpenApeModal = (type) => () => {
    if (type === "keep") {
      setType("keep");
      setSelectedApe(keepMeka);
    } else {
      setType("burn");
      setSelectedApe(burnMeka);
    }
    setIsApeModalOpen(true);
  };

  const handleCloseApeModal = () => {
    setIsApeModalOpen(false);
    setSelectedApe(null);
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
          <span>1.</span>
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
          <span>2.</span>
        </>
      );
    }
  };

  return (
    <Wrapper>
      <Header page="game" />
      <Content>
        <Title>
          Mekaapes <span>Merging</span>
        </Title>
        <MainBox>
          <TitleBox>
            <h4>MekaApes Merging</h4>
            <h6>
              You will always save Meka from 1 box and for 2 box it will get
              burn.
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
            <button disabled={!(Boolean(keepMeka) && Boolean(burnMeka))}>
              Merge your MekaApes
            </button>
          </ButtonBox>
          <HelperText>
            Player can merge 2 MekaApes
            <span>
              (Burn one and keep the other one) to receive a Mega trait level
            </span>
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
        />
      )}
    </Wrapper>
  );
};

export default withConnect(Merging, "/game/merging");
