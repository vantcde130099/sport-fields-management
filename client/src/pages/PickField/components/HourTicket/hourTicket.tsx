import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  CardActionArea
} from '@material-ui/core'
import { useStyles } from './hourTicket.style'

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
