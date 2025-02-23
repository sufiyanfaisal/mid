import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FaceIcon from '@mui/icons-material/Face';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../FirebaseConfig';
import { Button } from '@mui/material';

const drawerWidth = 240;

function DashboardScreen(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [openMenus, setOpenMenus] = React.useState({});
  const navigate = useNavigate();

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logout successful!");
      navigate("/login");
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  const handleMenuToggle = (menuName) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menuName]: !prevState[menuName],
    }));
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  // Flattened pages structure
  const pages = [
    {
      name: 'Profile',
      icon: <FaceIcon />,
      route: '/admindashboard/profile',
    },
    {
      name: 'Rooms',
      icon: <FaceIcon />,
      route: '/admindashboard/rooms',
    },
    {
      name: 'Create Rooms',
      icon: <FaceIcon />,
      route: '/admindashboard/createroom',
    },
    {
      name: 'Packages',
      icon: <FaceIcon />,
      route: '/admindashboard/packages',
    },
    {
      name: 'Create Packages',
      icon: <FaceIcon />,
      route: '/admindashboard/createpackages',
    },
    {
      name: 'Notifications',
      icon: <FaceIcon />,
      route: '/admindashboard/notifications',
    },
  ];

  const drawer = (  
    <div sx={{backgroundColor: "#D3D8DE"}}>
      <Toolbar />
      <Divider />
      <List>
        {pages.map((e, i) => (
          <React.Fragment key={i}>
            <ListItem disablePadding>
              {/* If there are subPages, use toggle logic; otherwise, navigate directly */}
              {e.subPages ? (
                <ListItemButton onClick={() => handleMenuToggle(e.name)}>
                  <ListItemIcon>{e.icon}</ListItemIcon>
                  <ListItemText primary={e.name} />
                  {openMenus[e.name] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
              ) : (
                <ListItemButton component={Link} to={e.route}>
                  <ListItemIcon>{e.icon}</ListItemIcon>
                  <ListItemText primary={e.name} />
                </ListItemButton>
              )}
            </ListItem>
            {e.subPages && (
              <Collapse in={openMenus[e.name]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {e.subPages.map((sub, idx) => (
                    <ListItem key={idx} disablePadding>
                      <ListItemButton sx={{ pl: 4 }} component={Link} to={sub.route}>
                        <ListItemText primary={sub.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', backgroundColor: "" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#D3D8DE", // Set the toolbar to a cream color
          color: 'black' // Adjust text color for contrast if needed
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontSize: { xs: '16px', md: '26px' }, display: 'flex', alignItems: 'center', gap: 1 }}>
                <SupervisorAccountIcon /> Admin Panel
              </Typography>
              <Button variant="contained" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: "#D3D8DE", color: "black" },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: "#D3D8DE", color: "black" },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {/* Selected component's data will render below the navbar */}
        <Outlet />
      </Box>
    </Box>
  );
}

DashboardScreen.propTypes = {
  window: PropTypes.func,
};

export default DashboardScreen;