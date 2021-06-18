import React from 'react'
import {  makeStyles } from '@material-ui/core/styles';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
export interface ListItemNotificationUserProps {
    isMenuOpen ?: boolean  
    image ?: any
  }

export  function ListItemNotificationUser({image = "https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-1-480x600.jpg" , isMenuOpen=true,...props}) {
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
