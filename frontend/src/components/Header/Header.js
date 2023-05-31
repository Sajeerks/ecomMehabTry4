import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { red } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Avatar, Drawer, List } from "@mui/material";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../actions/userActions";
import { toast } from "react-hot-toast";















const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  borderRadius: 60,

  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header({ setcolor, color,setquery,query,isAuthenticated,user, userMessage }) {
  const theme = useTheme();
const dispatch = useDispatch()
  // console.log({color})
  const changeColor = () => {
    // setcolor((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
    setcolor(!color);
    handleMobileMenuClose();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [emailMenuOpen, setEmailMenuOpen] = React.useState(null);
  const [emailMoreAnchorEl, setEmailMoreAnchorEl] = React.useState(null);

// const [keyword, setKeyword] = React.useState("")
// console.log({keyword})

const navigate= useNavigate()
const changeTOseach =(e)=>{
  setquery((e.target.value).trim())
  // Navigate("/products")
  navigate("/products")
}






  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isEmailMenuOpen = Boolean(emailMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    // console.log({anchorEl})
  };

  const handleLoginClose =()=>{
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate("/loginsignup")
  }
  
  const handleLogoutClose =()=>{
    setAnchorEl(null);
    handleMobileMenuClose();
  dispatch(logoutAction())
    navigate("/loginsignup")
  }


  const handleEmailMenuClose = () => {
    setEmailMoreAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleEmailMenuOpen = (event) => {
    setEmailMoreAnchorEl(event.currentTarget);
  };

  React.useEffect(() => {
   if(userMessage){
    toast.success(userMessage)
    dispatch({type:"clearErrors"})
   }
  }, [userMessage])
  

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isAuthenticated  ?  ( 
 <MenuItem onClick={handleMenuClose}>Profile</MenuItem>  
      ) :( <MenuItem onClick={handleLoginClose}>Login</MenuItem>  ) }
           {isAuthenticated  &&  ( 
  <MenuItem onClick={handleMenuClose}>My account</MenuItem> 
      ) }
         {isAuthenticated  &&  ( 
  <MenuItem onClick={handleLogoutClose}>Logout</MenuItem> 
      ) }
  
    </Menu>
  );

  const emailMenu = (
    <Menu
      anchorEl={emailMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isEmailMenuOpen}
      onClose={handleEmailMenuClose}
    >
      <MenuItem onClick={handleEmailMenuClose}>Email LISt</MenuItem>
      <MenuItem onClick={handleEmailMenuClose}>list of actvities</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={changeColor}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          {/* <Badge badgeContent={"theme"} color="error"> */}
          {/* <Brightness7Icon onClick={changeColor} /> */}

          {theme.palette.mode === "dark" ? <WbSunnyIcon /> : <DarkModeIcon />}
          {/* </Badge> */}
        </IconButton>
        <p>Mode</p>
      </MenuItem>
      <MenuItem onClick={handleEmailMenuOpen}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
         {isAuthenticated ? <Avatar src={user.avatar.url} />:<AccountCircle />}           
         </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  









  const [state, setState] = React.useState(false);
  const [drawerOpner, setdrawerOpner] = React.useState(false)

  const toggleDrawer = (anchor, open) => (event) => {
    // console.log("event in header is ", event)

    // console.log("anchoe in header is ", anchor)
    //       if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //   return;
    // }
    setdrawerOpner(open)
    setState(open);
  };


  function TempDrawer(){
    // console.log("ehrererer")
    const list = (anchor) => (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {['products', '', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={()=>{navigate(`/${text}`)}}>
                <ListItemIcon  >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text===""?"home":text} />
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
      </Box>
    );
  
    return(
      <Drawer
      anchor={"left"}
      open={drawerOpner}
      onClose={toggleDrawer("left", false)}
    >
      {list("left")}
    </Drawer>
    )

}

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <Link to="/"> */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 ,color:"white"}}
              onClick={toggleDrawer("left", true)}
            >
              
              <MenuIcon />
            </IconButton>
          {/* </Link> */}
          <Link to="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                color: theme.palette.text.primary,
                mx:.5,
                color:"white"
              }}
            >
              ECOMMM
            </Typography>
          </Link>

        
          <Link to="/products"> 
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                color: theme.palette.text.primary,
                mx:.5,color:"white",
              }}
            >
              PRODUCTS
            </Typography>
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
               onChange={(e)=>{changeTOseach(e)}}
               value={query}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={changeColor}
            >
              {/* <Badge badgeContent={"theme"} color="error"> */}
              {/* <WbSunnyIcon onClick={changeColor} /> */}

              {theme.palette.mode === "dark" ? (
                <WbSunnyIcon />
              ) : (
                <DarkModeIcon />
              )}
              {/* </Badge> */}
            </IconButton>

            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={handleEmailMenuOpen}
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              
               {isAuthenticated? <Avatar src={user.avatar.url}/> :  <AccountCircle />}    
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {emailMenu}
       {  <TempDrawer/>}
    </Box>
  );
}
