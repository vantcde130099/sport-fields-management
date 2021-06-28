import React from 'react'

// Material-UI
import {
  Menu,
  MenuItem,
  Divider,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core'
import { AccountBoxRounded, ExitToAppOutlined } from '@material-ui/icons'

export interface Props {
  anchorEl: Element | ((element: Element) => Element) | null | undefined
  isMenuOpen?: boolean
  name: string
  image: string
  tel: string
  onClose: () => void
}

export const UserSettings = ({
  name = '',
  image = '',
  tel = '',
  anchorEl,
  isMenuOpen = true,
  onClose
}: Props) => (
  <Menu
    keepMounted
    open={isMenuOpen}
    id="notification-list"
    anchorEl={anchorEl}
    getContentAnchorEl={null}
    style={{ maxHeight: 340 }}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    onClose={onClose}
  >
    <ListItem style={{ padding: 0, paddingLeft: 16 }} component="div">
      <ListItemAvatar>
        <Avatar src={image} alt="avatar">
          {name.charAt(0)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={tel} />
    </ListItem>
    <Divider component="div" />
    <MenuItem onClick={onClose} style={{ fontSize: 12 }}>
      <Avatar style={{ marginRight: 15, fontSize: 10, height: 30, width: 30 }}>
        <AccountBoxRounded style={{ fontSize: 20 }}></AccountBoxRounded>
      </Avatar>
      Thông tin cá nhân
    </MenuItem>
    <MenuItem onClick={onClose} style={{ fontSize: 12 }}>
      <Avatar style={{ marginRight: 15, fontSize: 10, height: 30, width: 30 }}>
        <ExitToAppOutlined style={{ fontSize: 20 }}></ExitToAppOutlined>
      </Avatar>
      Đăng Xuất
    </MenuItem>
  </Menu>
)
