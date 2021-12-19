import { useState } from "react";
// ******** Components ********
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import MergeMekaApesModal from "../../../components/Modals/MergeMekaApes/MergeMekaApes";
// ******** HOC ********
import withConnect from "../../../hoc/withConnect";
// ******** Images ********
import PlaceholderApe from "../../../assets/placeholder_ape.png";
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

// TODO
// Only unstaked and level 0 mekaapes

const Merging = () => {
  const [isApeModalOpen, setIsApeModalOpen] = useState(false);

  const handleOpenApeModal = () => {
    setIsApeModalOpen(true);
  };

  const handleCloseApeModal = () => {
    setIsApeModalOpen(false);
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
            <Box onClick={handleOpenApeModal}>
              <img src={PlaceholderApe} alt="ape" />
              <span>1.</span>
              <p>Keep</p>
            </Box>
            <img src={MergingArrow} alt="arrow" />
            <Box onClick={handleOpenApeModal}>
              <img src={PlaceholderApe} alt="ape" />
              <span>2.</span>
              <p>Burn</p>
            </Box>
          </MergingBox>
          <ButtonBox>
            <button disabled>Merge your MekaApes</button>
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
        />
      )}
    </Wrapper>
  );
};

export default withConnect(Merging, "/game/merging");
