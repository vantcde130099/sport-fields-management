import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { useStyles } from './hourTicket.style'
import CardActionArea from '@material-ui/core/CardActionArea'

export const HourTicket = () => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent style={{ padding: 10 }}>
          <Typography>19:00 - 20:00</Typography>
          <Typography>Sẵn sàng</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
