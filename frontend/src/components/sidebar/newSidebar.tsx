import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokenContext } from '../../InfoProvider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutIcon from "@mui/icons-material/Logout";

export default function BasicMenu() {
    const [ , setToken] = useContext(tokenContext);
    const navigate = useNavigate();
    const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [theme, setTheme] = useState(defaultDark ? "dark" : "light");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const goToDash= () => {
    navigate("/");
    handleClose();
  };

  const goToWG= () => {
    navigate("/wg-details");
    handleClose();
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function doLogout() {
    setAnchorEl(null);
    setToken("");
    navigate("/login");
  }


  return (
    <div style={{ position: 'absolute', top: 0, left: 0, margin: '16px' }}>
      <button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={goToDash}><DashboardIcon/> Dashboard</MenuItem>
        <MenuItem onClick={goToWG}><Diversity1Icon/> WG Details</MenuItem>
        <MenuItem onClick={switchTheme}>
        {theme === "light" ? <Brightness7Icon /> : <Brightness4Icon />}
        {theme === "light" ? "Light" : "Dark"} Mode</MenuItem>
        <MenuItem onClick={() => doLogout()}><LogoutIcon/>Logout</MenuItem>
      </Menu>
    </div>
  );
}
