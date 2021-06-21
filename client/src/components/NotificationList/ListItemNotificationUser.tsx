import React from 'react'
import {
  Menu,
  MenuItem,
  Divider,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core'
import {
  AccountBoxRounded as AccountBoxRoundedIcon,
  ExitToAppOutlined as ExitToAppOutlinedIcon
} from '@material-ui/icons'
export interface ListItemNotificationUserProps {
  isMenuOpen?: boolean
  image?: any 
  name?: any
  img?: any
  tel?: any
}

export function ListItemNotificationUser({
  isMenuOpen = true,
  name = '',
  img = '',
  tel = '',
  ...props
}) {
  return (
    <Menu
      style={{ maxHeight: 340 }}
      anchorEl={props.anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      id={props.menuId}
      keepMounted
      open={isMenuOpen}
      getContentAnchorEl={null}
      onClose={props.handleMenuClose}
    >
      <ListItem style={{ padding: 0, paddingLeft: 16 }} component="div">
        <ListItemAvatar>
          <Avatar src={img} alt="avatar">
            {name.charAt(0)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={tel} />
      </ListItem>
      <Divider component="div" />
      <MenuItem onClick={props.handleMenuClose} style={{ fontSize: 12 }}>
        <Avatar
          style={{ marginRight: 15, fontSize: 10, height: 30, width: 30 }}
        >
          <AccountBoxRoundedIcon
            style={{ fontSize: 20 }}
          ></AccountBoxRoundedIcon>
        </Avatar>
        Thông tin cá nhân
      </MenuItem>
      <MenuItem onClick={props.handleMenuClose} style={{ fontSize: 12 }}>
        <Avatar
          style={{ marginRight: 15, fontSize: 10, height: 30, width: 30 }}
        >
          <ExitToAppOutlinedIcon
            style={{ fontSize: 20 }}
          ></ExitToAppOutlinedIcon>
        </Avatar>
        Đăng Xuất
      </MenuItem>
    </Menu>
  )
}
