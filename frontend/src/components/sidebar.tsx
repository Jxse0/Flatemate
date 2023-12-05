import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Icon } from '@mui/material';
import './SidebarLeft.css';

const drawerWidth = 240;


const SidebarLeft = () => {
    const items = [
        { text: 'Inbox', icon: <InboxIcon /> },
        { text: 'Starred', icon: <MailIcon /> },
        { text: 'Send email', icon: <CalendarMonthIcon /> },
        { text: 'Drafts', icon: <AccountCircleIcon /> },
      ];
    
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer className='sidebar'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        
        <div style={{backgroundImage: 'url(/abstract2.jpg)',  backgroundPosition: 'left'}} className='sidebar-top'>
            <AccountCircleIcon className='profile-icon' fontSize='large'/>
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
      </Drawer>
    </Box>
  );
};

export default SidebarLeft;
