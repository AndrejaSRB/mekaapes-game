import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
// ******** Components ********
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Loading from "../../../components/Modals/Loading/Loading";
import SuccessModal from "../../../components/Modals/SuccessModal/SuccessModal";
// ******** HOC ********
import withConnect from "../../../hoc/withConnect";
// ******** Hooks ********
import useWindowDimenstions from "../../../hooks/useWindowDimensions";
// ******** Images ********
import PlaceholderApe from "../../../assets/placeholder_ape.png";
import MekaApeExample from "../../../assets/meka-ape-landing.png";
import RoboOogaExample from "../../../assets/landing-image.png";
// ******** Services ********
import contract from "../../../services/contract";
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
} from "./Evolve.styles";

const EXAMPLE_DATA = [
  {
    img: RoboOogaExample,
    name: "Ape",
    id: 1,
  },
  {
    img: MekaApeExample,
    name: "Ape",
    id: 2,
  },
  {
    img: RoboOogaExample,
    name: "Ape",
    id: 3,
  },
  {
    img: RoboOogaExample,
    name: "Ape",
    id: 4,
  },
  {
    img: MekaApeExample,
    name: "Ape",
    id: 5,
  },
  {
    img: RoboOogaExample,
    name: "Ape",
    id: 6,
  },
  {
    img: MekaApeExample,
    name: "Ape",
    id: 7,
  },
  {
    img: MekaApeExample,
    name: "Ape",
    id: 8,
  },
  {
    img: RoboOogaExample,
    name: "Ape",
    id: 9,
  },
  //   {
  //     img: MekaApeExample,
  //     name: "Ape",
  //     id: 10,
  //   },
  //   {
  //     img: RoboOogaExample,
  //     name: "Ape",
  //     id: 11,
  //   },
  //   {
  //     img: MekaApeExample,
  //     name: "Ape",
  //     id: 12,
  //   },
  //   {
  //     img: RoboOogaExample,
  //     name: "Ape",
  //     id: 13,
  //   }
];

const Evolve = () => {
  const { width } = useWindowDimenstions();
  const [selectAll, setSelectAll] = useState(false);
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState([]);
  const [isActive, setIsActive] = useState(null);
  const [minElementNumber, setMinElementNumber] = useState(16);
  const [loader, setLoader] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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
      setMinElementNumber(16);
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
    if (selected && selected.length > 0) {
      setIsActive(true);
      // TODO: get the list of clicked apes - probably token_id
      const tokenIds = [];
      selected.forEach((token) => tokenIds.push(token.id));

      try {
        // TODO: fix the hardcoded number add tokenIds
        let tsx = await contract.evolveBabyOoga(2851);
        setLoader(true);
        tsx.wait().then(() => {
          setLoader(false);
          setIsSuccessModalOpen(true);
        });
        // TODO: get the  fresh list of baby oogas, or kick the selected one
      } catch (error) {
        console.log(error);
      }
      setSelected([]);
      setIsActive(false);
    }
  };

  return (
    <Wrapper>
      <Header page="game" />
      <Content>
        <Title>
          Evolve Your <span>Baby Oogas</span>
        </Title>
        <MainBox>
          <TitleBox>
            <h4>Evolve Baby Oogas</h4>
          </TitleBox>
          <SubtitleBox>
            <p>Guarding the Factory:</p>
            <CustomCheckbox onChange={hadnleChangeCheckbox} checked={selectAll}>
              Select All:
            </CustomCheckbox>
          </SubtitleBox>
          <ApesBox length={getLength()}>{handleRenderBabyOogas()}</ApesBox>
          <ButtonBox>
            <button disabled={getIfDisabled()} onClick={handleClickEvolve}>
              Evolve
            </button>
          </ButtonBox>
          <HelperText>
            Every Baby Ooga can claim one MekaApe (Only one!)
          </HelperText>
        </MainBox>
      </Content>
      <Footer page="game" />
      <Loading open={loader} />
      <SuccessModal
        open={isSuccessModalOpen}
        title="And here’s what heppend..."
        text="The new MekaApe has evolved."
        handleClose={() => setIsSuccessModalOpen(false)}
      />
    </Wrapper>
  );
};

export default withConnect(Evolve, "/game/evolve");
