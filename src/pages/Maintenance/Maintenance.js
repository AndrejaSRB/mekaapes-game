// ******** Images ********
import Logo from "../../assets/logo.svg";
// ******** Styles ********
import { Wrapper, Box, Image, Title, Text } from "./Maintenance.styles";

const Maintenance = () => {
  return (
    <Wrapper>
      <Box>
        <Image>
          <img src={Logo} alt="logo" />
        </Image>
        <Title>MekaApes Game is under maintenance</Title>
        <Text>
          We are currently improving your gaming experience.
          <span>We will be back shortly. Thank you for your patience.</span>
        </Text>
      </Box>
    </Wrapper>
  );
};

export default Maintenance;
