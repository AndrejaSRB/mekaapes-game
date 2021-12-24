import { useContext, useState } from "react";
import PropTypes from "prop-types";
// ******** Components ********
import Disconnect from "../Modals/Disconnect/Disconnect";
import MobileMenu from "../Drawer/Drawer";
import { NavLink, Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
// ******** Stores ********
import { UserContext } from "../../store/user-context";
// ******** Images ********
import WalletIcon from "../../assets/wallet_icon.svg";
// ******** Styles ********
import {
  Wrapper,
  Logo,
  Account,
  Content,
  NavList,
  AccountMobile,
  Menu,
} from "./Header.styles";

const Header = ({ page }) => {
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userMetaMaskToken } = useContext(UserContext);

  const reduceAddress = (address) => {
    if (address && typeof address === 'string') {
      let string = address;
      let userAddress = address;
      let firstSix = userAddress.slice(0, 6);
      let lastFour = userAddress.slice(-4);
      string = `${firstSix}...${lastFour}`;
      return string;
    }
  };

  const handleOpenDisconnectModal = () => {
    setIsDisconnectModalOpen(true);
  };

  const handleCloseDisconnectModal = () => {
    setIsDisconnectModalOpen(false);
  };

  const handleOpenMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const renderAccountData = (address) => {
    if (address) {
      return (
        <div onClick={handleOpenDisconnectModal}>
          <span>Account:</span>
          {reduceAddress(address)} <img src={WalletIcon} alt="wallet icon" />
        </div>
      );
    } else {
      return <div />;
    }
  };

  const landingNavigationList = (
    <NavList>
      <a href="https://oogaverse.com/" target="_blank" rel="noreferrer">
        OogaVerse
      </a>
      <NavLink
        to="/whitepaper"
        className={({ isActive }) => (isActive ? "active" : "")}>
        Whitepaper
      </NavLink>
      <NavLink
        to="/terms"
        className={({ isActive }) => (isActive ? "active" : "")}>
        Terms of Use
      </NavLink>
    </NavList>
  );

  const gameNavigationList = (
    <NavList>
      <NavLink
        to="/game/factory"
        className={({ isActive }) => (isActive ? "active" : "")}>
        Factory
      </NavLink>
      <NavLink
        to="/game/crafting"
        className={({ isActive }) => (isActive ? "active" : "")}>
        Crafting
      </NavLink>
      <NavLink
        to="/game/merging"
        className={({ isActive }) => (isActive ? "active" : "")}>
        Merging
      </NavLink>
      <NavLink
        to="/game/upgrade"
        className={({ isActive }) => (isActive ? "active" : "")}>
        Upgrade
      </NavLink>
      <NavLink
        to="/game/evolve"
        className={({ isActive }) => (isActive ? "active" : "")}>
        Evolve
      </NavLink>
      <NavLink
        to="/game/statistics"
        className={({ isActive }) => (isActive ? "active" : "")}>
        Game Statistics
      </NavLink>
    </NavList>
  );

  const renderNavigation = (page) => {
    switch (page) {
      case "landing":
        return landingNavigationList;
      case "terms":
        return landingNavigationList;
      case "whitepaper":
        return landingNavigationList;
      case "minting":
        return landingNavigationList;
      case "game":
        return gameNavigationList;
      default:
        break;
    }
  };

  return (
    <>
      <Wrapper>
        <Content>
          {page !== "landing" && (
            <AccountMobile>
              {renderAccountData(userMetaMaskToken)}
            </AccountMobile>
          )}
          <Logo>
            <Link to="/">MekaApes</Link>
          </Logo>
          {renderNavigation(page)}
          <Menu>
            <MenuOutlined onClick={handleOpenMobileMenu} />
          </Menu>
        </Content>
        {page !== "landing" && (
          <Account>{renderAccountData(userMetaMaskToken)}</Account>
        )}
      </Wrapper>
      {userMetaMaskToken && isDisconnectModalOpen && (
        <Disconnect
          open={isDisconnectModalOpen}
          handleCloseModal={handleCloseDisconnectModal}
          reduceAddress={reduceAddress}
        />
      )}
      <MobileMenu
        open={isMobileMenuOpen}
        handleClose={handleCloseMobileMenu}
        connected={userMetaMaskToken}
        page={page}
        reduceAddress={reduceAddress}
        address={userMetaMaskToken}
        handleOpenDisconnectModal={handleOpenDisconnectModal}
      />
    </>
  );
};

export default Header;

Header.propTypes = {
  page: PropTypes.string.isRequired,
};
