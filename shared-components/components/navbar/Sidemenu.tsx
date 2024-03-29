import { IconButton, ListItemButton, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "shared-components/services/auth-context";

const Sidemenu = () => {
  const [sidemenuClick, setSidemenuClick] = useState<boolean>(false);
  const { user, login, logOut } = useAuth();
  function navbarIsClicked() {
    if (sidemenuClick) {
      setSidemenuClick(false);
    } else {
      setSidemenuClick(true);
    }
  }
  return (
    <div className="sideMenuButtonToOpen">
      <IconButton
        size="large"
        aria-label="closeSidemenu"
        color="primary"
        component="label"
        className="sidemenu-button"
        onClick={navbarIsClicked}
      >
        <MenuIcon />
      </IconButton>
      {sidemenuClick ? (
        <div className="sidemenu-content">
          <IconButton
            size="large"
            aria-label="sidemenu"
            color="primary"
            component="label"
            className="sidemenu-button"
            onClick={navbarIsClicked}
          >
            <CloseIcon />
          </IconButton>
          {user.email ? (
            <div>
              <ListItemButton
                className="sidemenu-content-items"
                component="a"
                href="/landingpage"
              >
                <ListItemText primary="Landing Page" />
              </ListItemButton>

              <ListItemButton
                className="sidemenu-content-items"
                component="a"
                href="/home"
              >
                <ListItemText primary="Home" />
              </ListItemButton>
              <ListItemButton
                className="sidemenu-content-items"
                component="a"
                href="/xr-paint"
              >
                <ListItemText primary="XR Test" />
              </ListItemButton>
              <ListItemButton
                className="sidemenu-content-items"
                component="a"
                href="/landingpage"
                onClick={logOut}
              >
                <ListItemText primary="Logout" />
              </ListItemButton>
            </div>
          ) : (
            <div>
              <ListItemButton
                className="sidemenu-content-items"
                component="a"
                href="/landingpage"
              >
                <ListItemText primary="Landing Page" />
              </ListItemButton>
              <ListItemButton
                className="sidemenu-content-items"
                component="a"
                href="/login"
              >
                <ListItemText primary="Login" />
              </ListItemButton>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Sidemenu;
