import { useState, useEffect, useContext } from "react";
import { useLazyQuery } from "@apollo/client";
// ******** Components ********
import Ape from "./Ape";
import CrewModal from "../../../components/Modals/CrewModal/CrewModal";
import Loading from "../../../components/Modals/Loading/Loading";
// ******** Stores ********
import { UserContext } from "../../../store/user-context";
// ******** Queires ********
import {
  GET_MEKA_MERGE_TOKENS_STAKED,
  GET_ROBO_OOGAS_STAKED_UPGRADE_TOKENS,
} from "../../../queries";
// ******** Icons ********
import { PlusOutlined } from "@ant-design/icons";
// ******** Placeholder ********
import MekaImage from "../../../assets/mekaape_landing.png";
import RoboImage from "../../../assets/robo-ooga-landing.png";
// ******** Styles ********
import {
  Wrapper,
  MainBox,
  TitleBox,
  Boxes,
  Box,
  Icon,
  Actions,
  Button,
  HelperText,
  RewardAmount,
  BoxText,
  CustomCheckbox,
  PlaceholderBox,
  Headline,
  AddCrewButton,
  EditButton,
  BoxWrapper,
  ButtonPlaceholder,
} from "./Crew.styles";

const fakeData = [
  {
    id: 1,
    tokenIds: [
      {
        img: MekaImage,
        oogaType: 1,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
    ],
  },
  {
    id: 2,
    tokenIds: [
      {
        img: MekaImage,
        oogaType: 1,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
    ],
  },
  {
    id: 3,
    tokenIds: [
      {
        img: MekaImage,
        oogaType: 1,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
    ],
  },
  {
    id: 4,
    tokenIds: [
      {
        img: MekaImage,
        oogaType: 1,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
    ],
  },
  {
    id: 5,
    tokenIds: [
      {
        img: MekaImage,
        oogaType: 1,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
    ],
  },
  {
    id: 6,
    tokenIds: [
      {
        img: MekaImage,
        oogaType: 1,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
    ],
  },
  {
    id: 7,
    tokenIds: [
      {
        img: MekaImage,
        oogaType: 1,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
    ],
  },
  {
    id: 8,
    tokenIds: [
      {
        img: MekaImage,
        oogaType: 1,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
    ],
  },
  {
    id: 9,
    tokenIds: [
      {
        img: MekaImage,
        oogaType: 1,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
    ],
  },
  {
    id: 10,
    tokenIds: [
      {
        img: MekaImage,
        oogaType: 1,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
    ],
  },
  {
    id: 11,
    tokenIds: [
      {
        img: MekaImage,
        oogaType: 1,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
    ],
  },
  {
    id: 12,
    tokenIds: [
      {
        img: MekaImage,
        oogaType: 1,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
      {
        img: RoboImage,
        oogaType: 0,
      },
    ],
  },
];

// TODO replace fake data
// TODO add event listener and loading message
// TODO check update version and forbid editing meka

const Crew = () => {
  const { userMetaMaskToken } = useContext(UserContext);
  const [clickedCrews, setClickedCrews] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  // Lists
  const [mekaList, setMekaList] = useState(null);
  const [roboList, setRoboList] = useState(null);
  // Meka Apes
  const [getMekas, { loading: mekaLoading, data: mekaApesData }] = useLazyQuery(
    GET_MEKA_MERGE_TOKENS_STAKED
  );
  const [getRobos, { loading: roboLoading, data: roboOogasData }] =
    useLazyQuery(GET_ROBO_OOGAS_STAKED_UPGRADE_TOKENS, {
      fetchPolicy: "no-cache",
    });

  useEffect(() => {
    if (mekaLoading || roboLoading) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  }, [mekaLoading, roboLoading]);

  useEffect(() => {
    if (userMetaMaskToken) {
      getMekas({
        variables: {
          owner: userMetaMaskToken,
        },
      });
      getRobos({
        variables: {
          owner: userMetaMaskToken,
        },
      });
    }
  }, [userMetaMaskToken, getMekas, getRobos]);

  useEffect(() => {
    if (mekaApesData !== undefined && mekaApesData !== null) {
      if (mekaApesData.spaceOogas?.length > 0) {
        setMekaList(mekaApesData.spaceOogas);
      } else {
        setMekaList(null);
      }
    }
  }, [mekaApesData]);

  useEffect(() => {
    if (roboOogasData !== undefined && roboOogasData !== null) {
      if (roboOogasData.spaceOogas?.length > 0) {
        setRoboList(roboOogasData.spaceOogas);
      } else {
        setRoboList(null);
      }
    }
  }, [roboOogasData]);

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleChangeSelectAll = (e) => {
    if (fakeData && fakeData.length > 0) {
      if (!e.target.checked) {
        setClickedCrews([]);
      } else {
        setClickedCrews([...fakeData]);
      }
    }
    setSelectAll(e.target.checked);
  };

  const handleClickCrew = (item) => () => {
    if (clickedCrews?.length > 0) {
      let allCrews = [...clickedCrews];
      let index = null;
      clickedCrews.forEach((crew, i) => {
        if (crew.id === item.id) {
          index = i;
        }
      });
      if (index !== null) {
        allCrews.splice(index, 1);
        setClickedCrews(allCrews);
      } else {
        setClickedCrews([...clickedCrews, item]);
      }
    } else {
      setClickedCrews([...clickedCrews, item]);
    }
  };

  const getIfItsSelected = (id) => {
    if (clickedCrews?.length > 0) {
      return clickedCrews.find((crew) => crew.id === id);
    } else {
      return false;
    }
  };

  const handleRenderCrews = () => {
    if (fakeData?.length > 0) {
      return fakeData.map((crew, index) => {
        return (
          <BoxWrapper key={crew.id}>
            <Box
              onClick={handleClickCrew(crew)}
              active={getIfItsSelected(crew.id)}>
              {crew.tokenIds.map(
                (token, index) =>
                  index === 0 &&
                  token.oogaType === 1 && (
                    <Ape
                      key={`Meka #${crew.id} #${index}`}
                      ape={token}
                      type="meka"
                    />
                  )
              )}
              <RewardAmount>
                <span>Crew reward:</span>
                99,999,123,00
              </RewardAmount>
            </Box>
            <EditButton>
              <button>Edit Crew</button>
            </EditButton>
          </BoxWrapper>
        );
      });
    }
  };

  return (
    <Wrapper>
      <MainBox>
        <TitleBox>
          <h4>The Crew</h4>
          <h6>Pick your Meka and make your Meka crew!</h6>
        </TitleBox>
        <Headline>
          <CustomCheckbox onChange={handleChangeSelectAll} checked={selectAll}>
            Select All:
          </CustomCheckbox>
          <AddCrewButton onClick={handleOpenCreateModal}>
            Create Crew
          </AddCrewButton>
        </Headline>
        <Boxes>
          {handleRenderCrews()}
          <BoxWrapper>
            <PlaceholderBox onClick={handleOpenCreateModal}>
              <Icon>
                <PlusOutlined />
              </Icon>
              <BoxText>Create Crew</BoxText>
            </PlaceholderBox>
            <ButtonPlaceholder />
          </BoxWrapper>
        </Boxes>
        <Actions>
          <Button disabled={clickedCrews?.length === 0} claim>
            Claim 99,999,123,00 $OG
          </Button>
        </Actions>
        <HelperText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget velit
          aliquet sagittis id consectetur. Aenean vel elit scelerisque mauris.
          Commodo odio aenean sed adipiscing diam donec.
        </HelperText>
      </MainBox>
      {isCreateModalOpen && (
        <CrewModal
          open={isCreateModalOpen}
          handleCloseModal={handleCloseCreateModal}
          roboList={roboList}
          mekaList={mekaList}
        />
      )}
      {loader && <Loading open={loader} />}
    </Wrapper>
  );
};

export default Crew;
