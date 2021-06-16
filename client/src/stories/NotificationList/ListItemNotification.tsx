import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
export interface ListItemNotificationProps {
  image ?: any , 
  typeList ?: 'cart' | 'notification'
  isMenuOpen ?: boolean

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
export  function ListItemNotification({typeList = 'cart',isMenuOpen = true,image = "https://i.pinimg.com/280x280_RS/7b/f4/9c/7bf49cc8e519bcea2fdd87b00df971aa.jpg",listItem = [{title :  'mã đơn hàng : BK10001', description : 'Bạn đã đặt thành công',cardState : 'success'},{title :  'mã đơn hàng : BK10001', description : 'Bạn đã đặt thành công',cardState : 'success'},{title :  'mã đơn hàng : BK10001', description : 'Bạn đã đặt thành công',cardState : 'success'},{title :  'mã đơn hàng : BK10001', description : 'Bạn đã đặt thành công',cardState : 'wait'},{title :  'mã đơn hàng : BK10001', description : 'Bạn đã đặt thành công',cardState : ''}],...props}) {
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
        getContentAnchorEl={null}
        id={props.menuId}
        keepMounted
        open={isMenuOpen}
        onClose={props.handleMenuClose}
      >
        {listItem.map((item) => {
           return(
            <MenuItem onClick={props.handleMenuClose} style ={{height : 40 , padding : 0, marginBottom : 10 }}>
            <ListItem >
              {typeList=='cart'&&item.cardState =='success' &&<ListItemAvatar><ShoppingCartIcon color = 'secondary'></ShoppingCartIcon></ListItemAvatar>}       
              {typeList=='cart'&&item.cardState =='wait' &&<ListItemAvatar><ShoppingCartIcon color = 'primary'></ShoppingCartIcon></ListItemAvatar>}
              {typeList=='cart'&&item.cardState !='wait' && item.cardState != 'success' &&<ListItemAvatar><ShoppingCartIcon></ShoppingCartIcon></ListItemAvatar>}  
              {typeList=='notification'&&<img src ={image} style = {{width: 50 , height : 50}}></img>}
            <ListItemText primary={<Typography style={{ color: '#000000' , fontSize : 14}}>{item.title}</Typography>} secondary={<Typography style ={{fontSize : 10}}noWrap>{item.description}</Typography>} style = {{width : 150}}            />
            </ListItem>
            </MenuItem>
           )
        })}
      </Menu>

    )
}
