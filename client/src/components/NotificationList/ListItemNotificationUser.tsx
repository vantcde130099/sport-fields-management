import React from 'react'
import List from '@material-ui/core/List';
import {  makeStyles } from '@material-ui/core/styles';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
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
        <MenuItem onClick={props.handleMenuClose}><Avatar style = {{marginRight : 15}}><AccountBoxRoundedIcon></AccountBoxRoundedIcon></Avatar>Thông tin cá nhân</MenuItem>
        <MenuItem onClick={props.handleMenuClose}><Avatar style = {{marginRight : 15}}><ExitToAppOutlinedIcon ></ExitToAppOutlinedIcon></Avatar>Đăng Xuất</MenuItem>
      </Menu>

    )
}
