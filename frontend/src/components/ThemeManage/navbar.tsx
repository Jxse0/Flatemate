import React, { useState } from "react";
import {
  Button,
  Collapse,
  IconButton,
  InputAdornment,
  InputBase,
  Toolbar,
  AppBar,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CssBaseline,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { ThemeColorContext } from "./ThemeContext";

interface NavbarProps {
  sidebarOpened: boolean;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const [collapseOpen, setCollapseOpen] = useState(false);

  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };

  return (
    <ThemeColorContext.Consumer>
      {({ color }) => (
        <AppBar
          position="sticky"
          className={`navbar-absolute ${color === "white" ? "bg-white" : ""}`}
        >
          <Container>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={toggleCollapse}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
              <div className="navbar-brand">
                <img
                  style={{ width: "5%" }}
                  src=""
                  alt=""
                />
                Demo App
              </div>
              <IconButton
                color="inherit"
                edge="end"
                onClick={() => console.log("Search clicked")} // Add your search logic here
              >
                <SearchIcon />
              </IconButton>
              <IconButton
                color="inherit"
                edge="end"
                onClick={() => console.log("Account clicked")} // Add your account logic here
              >
                <AccountCircleIcon />
              </IconButton>
            </Toolbar>
          </Container>
          <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
            <Drawer variant="temporary" anchor="left" open={collapseOpen}>
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  <ListItemText primary="Search" />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log Out" />
                </ListItem>
              </List>
            </Drawer>
          </Collapse>
        </AppBar>
      )}
    </ThemeColorContext.Consumer>
  );
};

export default Navbar;
