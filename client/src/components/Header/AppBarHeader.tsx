import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { ListItemNotification } from '../NotificationList/ListItemNotification'
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ListItemNotificationUser } from '../NotificationList/ListItemNotificationUser';
import { Avatar } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { useStyles } from './AppBarHeader.styles';

export interface AppBarHeaderProps {
  user?: {};
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

export  const AppBarHeader : React.FC<AppBarHeaderProps> = ({ user , onLogin, onLogout, onCreateAccount }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null)
  const isNotificationOpen = Boolean(notificationAnchorEl);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [isActive, setIsActive] = React.useState(1);
  const handleProfileMenuOpen = (event : any) => {
    setAnchorEl(event.currentTarget);
  };
 
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event : any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
    handleMenuClose();
  };
  const handleIsActive = (oldValue : number) => {
    setIsActive(oldValue)
  }
  const handleNotificationMenuOpen = (event : any) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <ListItemNotificationUser anchorEl = {anchorEl} isMenuOpen ={isMenuOpen} handleMenuClose = {handleMenuClose}/>
  );
  const renderNotification =(
    <ListItemNotification  anchorEl = {notificationAnchorEl} isMenuOpen ={isNotificationOpen} handleMenuClose = {handleNotificationClose} typeList = 'notification'/>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleNotificationMenuOpen}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" style = {{  backgroundColor: "#2c2c2c" }}>
        <Toolbar>
          <img src = "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.15752-9/186166767_873508483198315_7845554615604546962_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=ae9488&_nc_ohc=iGf1uc_PN2sAX_zaAOx&_nc_ht=scontent.fhan2-3.fna&oh=2e3b8c4de9e6f772016ed6b51205be05&oe=60D0A454" style ={{width : 64 , height : 64 , marginRight : 15}}></img>
          {/* <Typography className={classes.title} variant="h6" noWrap>
            Buksan
          </Typography> */}
          <div className={`${classes.search} `}>
          <Link
                    className = {`${classes.link} ${isActive==1?classes.linkActive:""}`}
          onClick = {()=>(handleIsActive(1))}
                             style = {{color : "rgb(255, 255, 255, 0.6  )" , textDecoration : 'none'}}
  component="button"
  variant="body2"
>
Trang chủ
</Link>
          </div>
          <div className={classes.search}>
          <Link
                              className = {`${classes.link} ${isActive==2?classes.linkActive:""}`}
                    onClick = {()=>(handleIsActive(2))}
                   style = {{color : "rgb(255, 255, 255, 0.6  )" , textDecoration : 'none'}}  
                   component="button"
  variant="body2"
>
Sân Bóng
</Link>
          </div>
          <div className={classes.search}>
          <Link
                            className = {`${classes.link} ${isActive==3?classes.linkActive:""}`}
                    onClick = {()=>(handleIsActive(3))}
                    style = {{color : "rgb(255, 255, 255, 0.6 )" , textDecoration : 'none'}}
  component="button"
  variant="body2"
>
Bình Luận
</Link>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          {user? (
            <>
            <IconButton aria-label="show 17 new notifications" 
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleNotificationMenuOpen}
            color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar src = "https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-1-480x600.jpg" />
              <ArrowDropDown className = {isMenuOpen ? classes.dropdowncolor:""}></ArrowDropDown>
            </IconButton>
            </>
          ):(
            <>
            {/* <Button color="inherit">Đăng Ký</Button> */}
            <Button color="inherit">Đăng Nhập</Button>
            </>
          )}
        </div>
          <div className={classes.sectionMobile}>
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotification}
    </div>
  );
}