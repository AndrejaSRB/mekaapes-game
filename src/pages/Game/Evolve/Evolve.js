import { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
// ******** Components ********
import { message } from "antd";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Loading from "../../../components/Modals/Loading/Loading";
// ******** HOC ********
import withConnect from "../../../hoc/withConnect";
// ******** Hooks ********
import useWindowDimenstions from "../../../hooks/useWindowDimensions";
// ******** Images ********
import PlaceholderApe from "../../../assets/placeholder_ape.png";
import EvolveAnimation from "../../../assets/level_up.gif";
// ******** Demo Images ********
import BabyImageOne from '../../../assets/Demo/Evolve/Booga1.png';
import BabyImageTwo from '../../../assets/Demo/Evolve/Booga2.png';
import BabyImageThree from '../../../assets/Demo/Evolve/Booga3.png';
import BabyImageFour from '../../../assets/Demo/Evolve/Booga4.png';
import BabyImageFive from '../../../assets/Demo/Evolve/Booga5.png';
import BabyImageSix from '../../../assets/Demo/Evolve/Booga6.png';
import BabyImageSeven from '../../../assets/Demo/Evolve/Booga7.png';
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
  ButtonBox,
  HelperText,
  ApesBox,
  Ape,
  ApeImage,
  SubtitleBox,
  CustomCheckbox,
  Box,
  LeftSide,
  RightSide,
  Animation,
} from "./Evolve.styles";

const EXAMPLE_DATA = [
  {
    img: BabyImageOne,
    name: "Ape",
    id: 1,
  },
  {
    img: BabyImageTwo,
    name: "Ape",
    id: 2,
  },
  {
    img: BabyImageThree,
    name: "Ape",
    id: 3,
  },
  {
    img: BabyImageFour,
    name: "Ape",
    id: 4,
  },
  {
    img: BabyImageFive,
    name: "Ape",
    id: 5,
  },
  {
    img: BabyImageSix,
    name: "Ape",
    id: 6,
  },
  {
    img: BabyImageSeven,
    name: "Ape",
    id: 7,
  },
];

const PRE_SALE_AMOUNT = 10000;

const Evolve = () => {
  const { width } = useWindowDimenstions();
  const { totalMintedTokens } = useContext(MintedContext);
  const [selectAll, setSelectAll] = useState(false);
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState([]);
  const [isActive, setIsActive] = useState(null);
  const [minElementNumber, setMinElementNumber] = useState(16);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    let length = EXAMPLE_DATA.length;
    let babies = [...EXAMPLE_DATA];
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
      babies = [...EXAMPLE_DATA, ...placeholderArray];
    }
    setData(babies);
  }, [minElementNumber]);

  useEffect(() => {
    if (width < 388) {
      setMinElementNumber(8);
    } else if (width < 1200) {
      setMinElementNumber(12);
    } else {
      setMinElementNumber(12);
    }
  }, [width]);

  const hadnleChangeCheckbox = (e) => {
    if (EXAMPLE_DATA && EXAMPLE_DATA.length > 0) {
      if (!e.target.checked) {
        setSelected([]);
      } else {
        setSelected([...data]);
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
    if (data && data.length > 0) {
      return data.map((ape) => (
        <Ape key={ape.id} onClick={handleClickApe(ape, ape.placeholder)}>
          <ApeImage
            selected={!ape.placeholder && getIfSelected(ape.id)}
            // active={Boolean(ape.placeholder) ? true : getActive(ape.id)}
            active={true}
            src={ape.img}
            alt={ape.name}
          />
        </Ape>
      ));
    }
  };

  const getLength = () => {
    if (data) {
      let length = data.length;
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
    if (data && data.length > 0) {
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

  const handleClickEvolve = async () => {
    if (totalMintedTokens > PRE_SALE_AMOUNT) {
      if (selected && selected.length > 0) {
        setIsActive(true);
        // TODO: get the list of clicked apes - probably token_id
        const tokenIds = [];
        selected.forEach((token) => tokenIds.push(token.id));

        try {
          // TODO: fix the hardcoded number add tokenIds
          let tsx = await contract.evolveBabyOogas([2221]);
          setLoader(true);
          tsx.wait().then(() => {
            setLoader(false);
          });
          // TODO: get the  fresh list of baby oogas, or kick the selected one
        } catch (error) {
          console.log(error);
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
            Every Baby Ooga can claim a MekaApe. You are only paying for gas and
            also keep the Baby Ooga. It won't get burned.
          </HelperText>
        </MainBox>
      </Content>
      <Footer page="game" />
      <Loading open={loader} />
    </Wrapper>
  );
};

export default withConnect(Evolve, "/game/evolve");
