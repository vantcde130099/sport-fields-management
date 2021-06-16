import React from 'react'
import List from '@material-ui/core/List';
import {  makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
export interface ListItemNotificationUserProps {
    isMenuOpen ?: boolean  
    image ?: any
  }

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    root: {
      width: '100%',
      maxWidth: '36ch',
      margin : 0 ,
      padding : 0 ,
      backgroundColor: theme.palette.background.paper,
      fontWeight : 500,
    },
    inline: {
        display: 'inline',
      },
}))
export  function ListItemNotificationUser({image = "https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-1-480x600.jpg" , isMenuOpen=true,...props}) {
    const classes = useStyles();
    return (
        <Menu
        anchorEl={props.anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        id={props.menuId}
        keepMounted
        open={isMenuOpen}
        getContentAnchorEl={null}
        onClose={props.handleMenuClose}
      >
        <MenuItem onClick={props.handleMenuClose}>
        <ListItem     className = {classes.root}      >
        <ListItemAvatar>
          <Avatar alt="Ảnh đại diện" src={image} />
        </ListItemAvatar>
        <ListItemText style ={{width : 150}}
          primary="Nguyễn Hoàng Minh"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Minh
              </Typography>
              {" — Cập nhật thông tin…" }
            </React.Fragment>
          }
        />
      </ListItem>
        </MenuItem>
        <MenuItem onClick={props.handleMenuClose} style ={{height : 40 , padding : 5 ,}}>
        <ListItem button >
        <ListItemIcon  style= {{width : 60 , minWidth : 50}}>
          <SportsSoccerIcon />
        </ListItemIcon>
        <ListItemText primary="Sân đã đặt" />
        </ListItem>
        </MenuItem>
        <MenuItem onClick={props.handleMenuClose} style ={{height : 40 , padding : 5  }}>
        <ListItem button >
        <ListItemIcon  style= {{width : 60 , minWidth : 50 ,}}>
          <NaturePeopleIcon />
        </ListItemIcon>
        <ListItemText primary="HLV đã đặt" />
        </ListItem>
        </MenuItem>
        <MenuItem onClick={props.handleMenuClose} style ={{height : 40 , padding : 5}}>
        <ListItem button >
        <ListItemIcon  style= {{width : 60 , minWidth : 50}}>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Đăng Xuất" />
        </ListItem>
        </MenuItem>
      </Menu>

    )
}
