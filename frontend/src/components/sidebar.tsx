import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import './SidebarLeft.css';
import { IconButton } from '@mui/material';
import useLocalStorage from 'use-local-storage';
import { useEffect } from 'react';

const drawerWidth = 240;
const SidebarLeft = () => {
  
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);


    const items = [
        { text: 'Inbox', icon: <InboxIcon /> },
        { text: 'Starred', icon: <MailIcon /> },
        { text: 'Send email', icon: <CalendarMonthIcon /> },
        { text: 'Drafts', icon: <AccountCircleIcon /> },
      ];
    
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer 
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'var(--sidebar-color)',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        
        <div style={{backgroundImage: 'url(/abstract2.jpg)',  backgroundPosition: 'left'}} className='sidebar-top'>
            <ListItemButton>
              <ListItemIcon>
              <AccountCircleIcon fontSize='large' />
              </ListItemIcon>
            <ListItemText primary="Account"/>
            </ListItemButton>
            
        </div>
        <Divider />
        <List>
      {items.map((item, index) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider/>
        <ListItemButton onClick={switchTheme} sx={{ position: 'absolute', bottom: 0 ,width:'100%'}}>
          <ListItemIcon>
          <IconButton>
          {theme === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
          </ListItemIcon>
          <ListItemText>
          {theme === "light" ? "Light" : "Dark" } Mode
          </ListItemText>
        </ListItemButton>
      </Drawer>
    </Box>
  );
};

export default SidebarLeft;
