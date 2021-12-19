// ******** Components ********
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// ******** Images ********
import RoboImage from "../../assets/landing-image.png";
import CoinImage from "../../assets/coin-landing.png";
// ******** Styles ********
import {
  Wrapper,
  Title,
  Content,
  MainBox,
  TitleBox,
  WhitepaperContent,
  BoxLeft,
  Image,
  BoxText,
  BoxSubText,
  BoxRight,
  AnimationBox,
} from "./Whitepaper.styles";

const Whitepaper = () => (
  <Wrapper>
    <Header page="whitepaper" />
    <Content>
      <Title>Whitepaper</Title>
      <MainBox>
        <TitleBox>
          <h4>Welcome to MekaApes!</h4>
        </TitleBox>
        <WhitepaperContent>
          <p>
            Faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Et
            leo duis ut diam. Tellus integer feugiat scelerisque varius morbi
            enim nunc faucibus a. Nec ullamcorper sit amet risus nullam eget
            felis. Senectus et netus et malesuada fames ac turpis egestas.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui nunc
            mattis enim ut tellus elementum. Nunc aliquet bibendum enim
            facilisis gravida neque convallis a. Orci dapibus ultrices in
            iaculis nunc sed augue lacus viverra. Sodales ut etiam sit amet nisl
            purus in mollis. Vitae congue mauris rhoncus aenean vel. Ultricies
            leo integer malesuada nunc vel.
          </p>
          <p>
            Vitae congue mauris rhoncus aenean vel. Ultricies leo integer
            malesuada nunc vel.
          </p>
          <p>---------------</p>
          <p>
            Maecenas ultricies mi eget mauris pharetra et. Vestibulum lorem sed
            risus ultricies. Tincidunt augue interdum velit euismod. Convallis a
            cras semper auctor neque vitae. Interdum velit euismod in
            pellentesque massa placerat duis ultricies lacus. Fermentum iaculis
            eu non diam phasellus vestibulum. Cras sed felis eget velit aliquet
            sagittis id.
          </p>
          <h4>Contract Addresses</h4>
          <ul>
            <li>
              Sheep / Wolf NFT: 0xEB834ae72B30866af20a6ce5440Fa598BfAd3a42
            </li>
            <li>
              Barn / Gang Staking: 0x29205f257F9E3B78bcb27e253D0f3Fad9D7522a2
            </li>
            <li> $WOOL Token: 0x8355dbe8b0e275abad27eb843f3eaf3fc855e525</li>
          </ul>
          <BoxLeft>
            <Image>
              <img src={RoboImage} alt="robo" />
            </Image>
            <BoxText>
              <h4>Minting</h4>
              <p className="box">
                <span>Token ID Minting Cost</span>
                <br />1 to 10,000 (Gen 0) 0.069420 ETH
                <br />
                10,001 to 20,000 20,000 $WOOL
                <br />
                20,001 to 40,000 40,000 $WOOL
                <br />
                40,001 to 50,000 80,000 $WOOL
                <br />
                The total cost to mint all of the Sheep and Wolves in existence
                will be 1,800,000,000 $WOOL.
              </p>
            </BoxText>
          </BoxLeft>
          <h4>Lorem Ipsum</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui nunc
            mattis enim ut tellus elementum. Nunc aliquet bibendum enim
            facilisis gravida neque convallis a. Orci dapibus ultrices in
            iaculis nunc sed augue lacus viverra. Sodales ut etiam sit amet nisl
            purus in mollis. Vitae congue mauris rhoncus aenean vel. Ultricies
            leo integer malesuada nunc vel. Eleifend quam adipiscing vitae proin
            sagittis nisl rhoncus. Aliquam sem fringilla ut morbi tincidunt
            augue interdum. Praesent semper feugiat nibh sed pulvinar. Quis
            ipsum suspendisse ultrices gravida dictum fusce.
          </p>
          <h4>Lorem Ipsum</h4>
          <p>
            Massa sed elementum tempus egestas sed sed risus. Vitae tempus quam
            pellentesque nec nam. Tristique senectus et netus et malesuada fames
            ac turpis egestas. Ultricies mi eget mauris pharetra et ultrices
            neque ornare aenean. Urna condimentum mattis pellentesque id.
            Vestibulum lectus mauris ultrices eros in cursus turpis. Faucibus
            pulvinar elementum integer enim neque. Neque gravida in fermentum et
            sollicitudin ac. Mauris sit amet massa vitae tortor condimentum. Eu
            mi bibendum neque egestas congue quisque egestas diam. Amet aliquam
            id diam maecenas. Arcu bibendum at varius vel pharetra vel turpis.
            Faucibus et molestie ac feugiat. Malesuada fames ac turpis egestas
            sed tempus urna et.
          </p>
          <h4>Cras adipiscing enim</h4>
          <p>Ac turpis egestas maecenas pharetra convallis posuere morbi. </p>
          <BoxLeft>
            <Image>
              <img src={CoinImage} alt="coin" />
            </Image>
            <BoxText>
              <h4>Fringilla urna</h4>
              <BoxSubText>
                <p>
                  Ac turpis egestas maecenas pharetra convallis posuere morbi.
                </p>
                <p>
                  Ac turpis egestas maecenas pharetra convallis posuere morbi.
                  Ut tortor pretium viverra suspendisse potenti nullam. Mauris
                  sit amet massa vitae tortor condimentum lacinia quis vel.
                  Ultrices in iaculis nunc sed augue lacus.
                </p>
              </BoxSubText>
              <p className="box">
                <span>Risk lacinia quis</span>
                <br />
                Cras adipiscing enim eu turpis egestas pretium aenean. Id neque
                aliquam vestibulum morbi blandit. Aliquet porttitor lacus luctus
                accumsan tortor posuere. Scelerisque eu ultrices vitae auctor eu
                augue. Vitae justo eget magna fermentum iaculis eu non. Id
                consectetur purus ut faucibus pulvinar. Sit amet est placerat in
                egestas erat imperdiet sed. Adipiscing bibendum est ultricies
                integer.
              </p>
            </BoxText>
          </BoxLeft>
          <h4>Lorem Ipsum</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui nunc
            mattis enim ut tellus elementum. Nunc aliquet bibendum enim
            facilisis gravida neque convallis a. Orci dapibus ultrices in
            iaculis nunc sed augue lacus viverra. Sodales ut etiam sit amet nisl
            purus in mollis. Vitae congue mauris rhoncus aenean vel. Ultricies
            leo integer malesuada nunc vel. Eleifend quam adipiscing vitae proin
            sagittis nisl rhoncus. Aliquam sem fringilla ut morbi tincidunt
            augue interdum. Praesent semper feugiat nibh sed pulvinar. Quis
            ipsum suspendisse ultrices gravida dictum fusce.
          </p>
          <BoxRight>
            <div className="text">
              <h4>Quis auctor elit</h4>
              <p>
                Ornare lectus sit amet est placerat in. Tortor posuere ac ut
                consequat semper viverra. Felis imperdiet proin fermentum leo
                vel.
                <br /> Sit amet justo donec enim diam vulputate ut pharetra sit.
                Pellentesque habitant morbi tristique senectus et netus.
                <br /> Mauris ultrices eros in cursus turpis massa tincidunt.
                Luctus venenatis lectus magna fringilla urna porttitor.
                <br /> Non sodales neque sodales ut.
              </p>
            </div>
            <div className="image">
              <img src={RoboImage} alt="robo" />
            </div>
          </BoxRight>
          <h4>Lorem Ipsum</h4>
          <p>
            Massa sed elementum tempus egestas sed sed risus. Vitae tempus quam
            pellentesque nec nam. Tristique senectus et netus et malesuada fames
            ac turpis egestas. Ultricies mi eget mauris pharetra et ultrices
            neque ornare aenean. Urna condimentum mattis pellentesque id.
            Vestibulum lectus mauris ultrices eros in cursus turpis. Faucibus
            pulvinar elementum integer enim neque. Neque gravida in fermentum et
            sollicitudin ac. Mauris sit amet massa vitae tortor condimentum. Eu
            mi bibendum neque egestas congue quisque egestas diam. Amet aliquam
            id diam maecenas. Arcu bibendum at varius vel pharetra vel turpis.
            Faucibus et molestie ac feugiat. Malesuada fames ac turpis egestas
            sed tempus urna et.
          </p>
          <h4>Cras adipiscing enim</h4>
          <p>Ac turpis egestas maecenas pharetra convallis posuere morbi. </p>
          <AnimationBox>
            <img src={RoboImage} alt="robo" />
            <p>Enjoy it, play it!</p>
          </AnimationBox>
        </WhitepaperContent>
      </MainBox>
    </Content>
    <Footer page="whitepaper" />
  </Wrapper>
);

export default Whitepaper;
