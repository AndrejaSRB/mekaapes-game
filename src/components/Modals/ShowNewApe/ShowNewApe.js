import PropTypes from "prop-types";
import { Carousel } from "antd";
// ******** Icons ********
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
// ******** Image ********
import Ape from "../../../assets/meka-ape-landing.png";
import ApeTwo from "../../../assets/robo-ooga-landing.png";
import ApeThree from "../../../assets/crafting_animation.gif";
import ApeFour from "../../../assets/coin-landing.png";
// ******** Styles ********
import {
  ModalWrapper,
  Slide,
  ImageHolder,
  ButtonWrapper,
} from "./ShowNewApe.styles";

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <LeftOutlined />
    </div>
  );
};

const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <RightOutlined />
    </div>
  );
};

const ShowNewApe = ({ open }) => {
  return (
    <ModalWrapper visible={open} centered width={744} maskClosable={false}>
      <div className="content">
        <Carousel
          arrows={true}
          prevArrow={<PrevArrow />}
          nextArrow={<NextArrow />}>
          <Slide>
            <ImageHolder>
              <img src={Ape} alt="ape" />
            </ImageHolder>
            <p>Robo Ooga #43 left the factory and you received 744.43 $OG.</p>
          </Slide>
          <Slide>
            <ImageHolder>
              <img src={ApeTwo} alt="ape" />
            </ImageHolder>
            <p>Robo Ooga #75 left the factory and you received 1744.43 $OG.</p>
          </Slide>
          <Slide>
            <ImageHolder>
              <img src={ApeThree} alt="ape" />
            </ImageHolder>
            <p>Robo Ooga #75 left the factory and you received 17144.43 $OG.</p>
          </Slide>
          <Slide>
            <ImageHolder>
              <img src={ApeFour} alt="ape" />
            </ImageHolder>
            <p>Robo Ooga #75 left the factory and you received 1744.43 $OG.</p>
          </Slide>
        </Carousel>
        <ButtonWrapper>
          <button>Close</button>
        </ButtonWrapper>
      </div>
    </ModalWrapper>
  );
};

export default ShowNewApe;

ShowNewApe.propTypes = {
  open: PropTypes.bool.isRequired,
};
