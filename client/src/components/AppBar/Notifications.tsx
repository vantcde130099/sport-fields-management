import React from 'react'

// Material=UI
import {
  Typography,
  ListItemText,
  ListItemAvatar,
  ListItem,
  MenuItem,
  Menu,
  Divider,
  Avatar
} from '@material-ui/core'

export interface Props {
  anchorEl: Element | ((element: Element) => Element) | null | undefined
  image: string
  isMenuOpen: boolean
  listItem: NotificationItem[]
  onClose: () => void
}

interface NotificationItem {
  id: string
  title: string
  description: string
}

export const Notifications = ({
  anchorEl,
  image,
  isMenuOpen,
  listItem,
  onClose
}: Props) => (
  <Menu
    keepMounted
    open={isMenuOpen}
    anchorEl={anchorEl}
    id="notification-item"
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    style={{ maxHeight: 340 }}
    onClose={onClose}
  >
    {/* <List> */}
    {listItem.map((item, index) => (
      <div key={index}>
        {index != 0 ? <Divider variant="inset" component="li" /> : ''}
        <MenuItem onClick={onClose}>
          <ListItem style={{ padding: 0 }} component="div">
            <ListItemAvatar>
              <Avatar src={image}></Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography style={{ fontSize: 12 }}>{item.title}</Typography>
              }
              secondary={
                <Typography style={{ fontSize: 10 }} noWrap>
                  {item.description}
                </Typography>
              }
              style={{ width: 150 }}
            />
          </ListItem>
        </MenuItem>
      </div>
    ))}
  </Menu>
)
