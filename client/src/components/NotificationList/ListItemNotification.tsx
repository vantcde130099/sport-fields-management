import React from 'react'
import Typography from '@material-ui/core/Typography'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItem from '@material-ui/core/ListItem'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'


export interface ListItemNotificationProps {
  image?: any
  isMenuOpen?: boolean
  listItem ?: []
}

export function ListItemNotification({
  isMenuOpen = true,
  image = 'https://scontent.fhan2-3.fna.fbcdn.net/v/t1.15752-9/186166767_873508483198315_7845554615604546962_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=ae9488&_nc_ohc=iGf1uc_PN2sAX_zaAOx&_nc_ht=scontent.fhan2-3.fna&oh=2e3b8c4de9e6f772016ed6b51205be05&oe=60D0A454',
  listItem = [
    {
      title: 'mã đơn hàng : BK10001',
      description: 'Bạn đã đặt thành công',
    },
    {
      title: 'mã đơn hàng : BK10001',
      description: 'Bạn đã đặt thành công',
    },
    {
      title: 'mã đơn hàng : BK10001',
      description: 'Bạn đã đặt thành công',
    },
    {
      title: 'mã đơn hàng : BK10001',
      description: 'Bạn đã đặt thành công',
      cardState: 'wait'
    },
    {
      title: 'mã đơn hàng : BK10001',
      description: 'Bạn đã đặt thành công',
      cardState: ''
    },
    {
      title: 'mã đơn hàng : BK10001',
      description: 'Bạn đã đặt thành công',
    },
    {
      title: 'mã đơn hàng : BK10001',
      description: 'Bạn đã đặt thành công',
    },
    {
      title: 'mã đơn hàng : BK10001',
      description: 'Bạn đã đặt thành công',
    },
    {
      title: 'mã đơn hàng : BK10001',
      description: 'Bạn đã đặt thành công',
    },
    {
      title: 'mã đơn hàng : BK10001',
      description: 'Bạn đã đặt thành công',
    }
  ],
  ...props
}) {
  return (
    <Menu
      style={{ maxHeight: 340 }}
      anchorEl={props.anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      getContentAnchorEl={null}
      id={props.menuId}
      keepMounted
      open={isMenuOpen}
      onClose={props.handleMenuClose}
    >
      {/* <List> */}
      {listItem.map((item, index) => {
        return (
          <div>
            {index != 0 ? <Divider variant="inset" component="li" /> : ''}
            <MenuItem onClick={props.handleMenuClose}>
              <ListItem style={{ padding: 0 }}>
                <ListItemAvatar>
                  <Avatar src={image}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography style={{ fontSize: 12 }}>
                      {item.title}
                    </Typography>
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
        )
      })}
      {/* </List> */}
    </Menu>
  )
}
