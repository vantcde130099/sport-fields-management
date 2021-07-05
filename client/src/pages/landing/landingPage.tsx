import React from 'react'

//Material-UI
import { Button, Grid, Paper, Typography } from '@material-ui/core'

//Styles
import { useStyles } from './landingPage.styles'

//Image
import Image from '../../images/imageLanding.png'

export const LandingPage = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      <Grid container style={{ boxShadow: '0' }}>
        <Grid item xs={12} style={{ boxShadow: 'none' }}>
          <Paper className={classes.paper}>Header</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper2}>
            <Typography className={classes.title3}>What is Sport?</Typography>
            <Typography className={classes.title3}>
              Sport is What Buksan can do
            </Typography>
            <Typography className={classes.title2}>
              Làm hết sức, chơi hết sức
            </Typography>
          </Paper>
          <Paper className={classes.paper3}>
            <Button
              variant="contained"
              color="secondary"
              style={{ backgroundColor: '#F94949' }}
            >
              <Typography className={classes.title}>Đặt Sân Ngay</Typography>
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper1}>
            <img
              src={Image}
              style={{ width: 330, height: 575, borderRadius: 10 }}
            ></img>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}></Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}
