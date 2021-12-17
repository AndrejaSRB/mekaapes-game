// ******** Components ********
import { NavLink } from "react-router-dom";
// ******** Styles ********
import { DrawerWrapper, Title, NavList } from "./Drawer.styles";
import { CloseOutlined } from "@ant-design/icons";

const MobileMenu = ({
  open,
  handleClose,
  connected,
  page,
  reduceAddress,
  address,
}) => {
  const landingNavigationList = (
    <NavList>
      <div>
        <a href="https://oogaverse.com/" target="_blank" rel="noreferrer">
          OogaVerse
        </a>
      </div>
      <div>
        <NavLink
          to="/whitepaper"
          className={({ isActive }) => (isActive ? "active" : "")}>
          Whitepaper
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/terms"
          className={({ isActive }) => (isActive ? "active" : "")}>
          Terms of Services
        </NavLink>
      </div>
    </NavList>
  );

  const gameNavigationList = (
    <NavList>
      <div>
        <NavLink
          to="/game/factory"
          className={({ isActive }) => (isActive ? "active" : "")}>
          Factory
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/game/crafting"
          className={({ isActive }) => (isActive ? "active" : "")}>
          Crafting
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/game/merging"
          className={({ isActive }) => (isActive ? "active" : "")}>
          Merging
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/game/upgrade"
          className={({ isActive }) => (isActive ? "active" : "")}>
          Upgrade
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/game/evolve"
          className={({ isActive }) => (isActive ? "active" : "")}>
          Evolve
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/game/statistics"
          className={({ isActive }) => (isActive ? "active" : "")}>
          Game Statistics
        </NavLink>
      </div>
    </NavList>
  );

  const renderNavigation = (page) => {
    switch (page) {
      case "landing":
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
    <DrawerWrapper
      placement="right"
      closable={false}
      width={281}
      onClose={handleClose}
      visible={open}>
      <Title>
        <div>
          {connected && (
            <>
              <span>Account:</span> {reduceAddress(address)}
            </>
          )}
        </div>
        <span>
          <CloseOutlined onClick={handleClose} />
        </span>
      </Title>
      {renderNavigation(page)}
    </DrawerWrapper>
  );
};

export default MobileMenu;
