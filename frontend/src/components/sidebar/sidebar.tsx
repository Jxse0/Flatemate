import React, { useContext, useEffect, useState } from 'react';
import { Box, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HouseIcon from '@mui/icons-material/House';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './SidebarLeft.css';
import { Link, useNavigate } from 'react-router-dom';
import BallotIcon from '@mui/icons-material/Ballot';
import { tokenContext } from '../../AuthProvider';
import ChatIcon from '@mui/icons-material/Chat';
import { Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
const drawerWidth = 240;

const SidebarLeft = () => {
  const [, setToken] = useContext(tokenContext);
  const navigate = useNavigate();
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useState(defaultDark ? 'dark' : 'light');
  const [collapsed, setCollapsed] = useState(false);

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function doLogout() {
    setToken('');
    navigate('/login');
  }

  const items = [
    { text: 'SignUp', icon: <InboxIcon />, path: '/signup' },
    { text: 'Dashboard', icon: <HouseIcon />, path: '/dashboard' },
    { text: 'Shopping List', icon: <BallotIcon />, path: '/cart' },
    { text: 'Chat', icon: <ChatIcon />, path: '/chat' },
    { text: 'WG-Details', icon: <AccountCircleIcon />, path: '/wg-details' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: collapsed ? 60 : drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: collapsed ? 60 : drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'var(--sidebar-color)',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div
          style={{
            backgroundImage: 'url(/abstract2.jpg)',
            backgroundPosition: 'left',
            padding: '10px',
            textAlign: 'center',
          }}
          className="sidebar-top"
        >
          {collapsed ? (
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              <Typography sx={{ fontSize: '1.2rem', color: 'var(--textColor)' }}>{"<"}</Typography>
            </IconButton>
          ) : (
            <>
              <Link to="/account">
                <ListItemButton>
                  <ListItemIcon>  
                    <AccountCircleIcon fontSize="large" />
                  </ListItemIcon>
                  <ListItemText primary="Account" />
                </ListItemButton>
              </Link>
              <IconButton onClick={() => setCollapsed(!collapsed)}>
                <Typography sx={{ fontSize: '1.2rem', color: 'var(--textColor)' }}>{">"}</Typography>
              </IconButton>
            </>
          )}
        </div>
        <Divider />
        <List>
          {items.map((item) => (
            <Link to={item.path} key={item.text}>
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {collapsed ? null : <ListItemText primary={item.text} />}
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <ListItem
          disablePadding
          sx={{ flexDirection: 'column', alignItems: 'flex-start', marginTop: 'auto', width: '100%' }}
        >
          <ListItemButton onClick={() => doLogout()} sx={{ width: '100%' }}>
            <ListItemIcon>
              <LogoutIcon/>
            </ListItemIcon>
            {collapsed ? null: "Logout"}
          </ListItemButton>
          <ListItemButton onClick={switchTheme} sx={{ width: '100%' }}>
            <ListItemIcon>
                {theme === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
            </ListItemIcon>
            {collapsed ? null : <ListItemText>{theme === 'light' ? 'Light' : 'Dark'} Mode</ListItemText>}
          </ListItemButton>
        </ListItem>
      </Drawer>
    </Box>
  );
};

export default SidebarLeft;
