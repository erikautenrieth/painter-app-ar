import { IconButton, ListItemButton, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function Sidemenu() {
  const [sidemenuClick, setSidemenuClick] = useState<boolean>(true);
  let isOpened = false;
  function navbarIsClicked() {
    if (sidemenuClick) {
      setSidemenuClick(false);
    } else {
      setSidemenuClick(true);
    }
    console.log(sidemenuClick);
  }
  return (
    <div>
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
          <div>
            <ListItemButton
              className="sidemenu-content-items"
              component="a"
              href="#simple-list"
            >
              <ListItemText primary="Spam" />
            </ListItemButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}
