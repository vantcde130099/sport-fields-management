import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { useStyles } from './itemCard.style'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

export const ItemCard = () => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.image}>ảnh</CardMedia>
      <div className={classes.details}>
        <CardContent className={classes.root1} style={{ padding: 0 }}>
          <Typography>tên sản phẩm</Typography>
          <Typography style={{ color: '#F94949' }}>giá sản phẩm</Typography>
        </CardContent>
        <CardActions className={classes.root2}>
          <IconButton className={classes.button} size="small">
            <RemoveIcon style={{ width: '0.6em', height: '0.6em' }} />
          </IconButton>
          <Typography>0</Typography>
          <IconButton className={classes.button} size="small">
            <AddIcon style={{ width: '0.6em', height: '0.6em' }} />
          </IconButton>
        </CardActions>
      </div>
    </Card>
  )
}
