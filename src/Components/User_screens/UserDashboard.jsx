  import * as React from 'react';
  import PropTypes from 'prop-types';
  import AppBar from '@mui/material/AppBar';
  import Box from '@mui/material/Box';
  import CssBaseline from '@mui/material/CssBaseline';
  import Divider from '@mui/material/Divider';
  import Drawer from '@mui/material/Drawer';
  import IconButton from '@mui/material/IconButton';
  import InboxIcon from '@mui/icons-material/MoveToInbox';
  import List from '@mui/material/List';
  import ListItem from '@mui/material/ListItem';
  import ListItemButton from '@mui/material/ListItemButton';
  import ListItemIcon from '@mui/material/ListItemIcon';
  import ListItemText from '@mui/material/ListItemText';
  import MailIcon from '@mui/icons-material/Mail';
  import MenuIcon from '@mui/icons-material/Menu';
  import Toolbar from '@mui/material/Toolbar';
  import Typography from '@mui/material/Typography';
  import FaceIcon from '@mui/icons-material/Face';
  import SchoolIcon from '@mui/icons-material/School';
  import ExpandLessIcon from '@mui/icons-material/ExpandLess';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  import Collapse from '@mui/material/Collapse';
  import { Link, useNavigate } from 'react-router-dom';
  import PersonIcon from '@mui/icons-material/Person';
  import { Button } from '@mui/material';
  import { signOut } from 'firebase/auth';
  import { auth } from '../../FirebaseConfig';



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
    const pages = [
      {
        name: 'UserProfile',
        icons: <FaceIcon />,
        route: '/userdashboard/userprofile',
      },
      {
        name: 'Offers',
        icons: <SchoolIcon />,
        route: '/userdashboard/offers',
      },
      {
        name: 'Packages',
        icons: <MailIcon />,
        route: '/userdashboard/userpackages',
      },
      {
        name: 'Services',
        icons: <InboxIcon />,
        route: '/userdashboard/services',
      },
      {
        name: 'Booking',
        icons: <InboxIcon />,
        route: '/userdashboard/booking',
      },
      {
        name: 'PackagePayment',
        icons: <InboxIcon />,
        route: '/userdashboard/packagespayment',
      },
      {
        name: 'RoomPayment',
        icons: <InboxIcon />,
        route: '/userdashboard/roompayment',
      },
    ]

    const drawer = (
      <div>
      <Toolbar />
      <Divider />
      <List>
        {pages.map((e, i) => (
          <React.Fragment key={i}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleMenuToggle(e.name)}>
                <ListItemIcon>{e.icons}</ListItemIcon>
                <ListItemText primary={e.name} />
                {e.subPages ? (
                  openMenus[e.name] ? <ExpandLessIcon /> : <ExpandMoreIcon />
                ) : null}
              </ListItemButton>
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


    
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
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
            <Typography variant="h5" noWrap component="div" sx={{textAlign:'center',width:'100%'}} >
            <Box sx={{display:'flex',justifyContent:'space-between'}}>
            <Typography variant='h4'><PersonIcon /> Users Panel</Typography>
            <Button variant='contained' color='error' onClick={handleLogout} >Logout</Button>
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
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
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
        </Box>
      </Box>
    );
  }

  DashboardScreen.propTypes = {
    window: PropTypes.func,
  };

  export default DashboardScreen;
