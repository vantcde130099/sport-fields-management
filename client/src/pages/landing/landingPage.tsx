import { Button, Grid, Paper, Typography } from '@material-ui/core'
import { useStyles } from './landingPage.styles'
import React from 'react'
import Image from '../../images/imageLandingPage.png'

export const LandingPage = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      <Grid container style={{ boxShadow: '0' }}>
        <Grid item xs={12} style={{ boxShadow: 'none' }}>
          <Paper className={classes.paper} style={{ boxShadow: 'none' }}>
            Header
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper2} style={{ boxShadow: 'none' }}>
            <Typography
              style={{
                fontFamily: '"Segoe UI"',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '45px'
              }}
            >
              What is Sport?
            </Typography>
            <Typography
              style={{
                fontFamily: '"Segoe UI"',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '45px'
              }}
            >
              Sport is What Buksan can do
            </Typography>
            <Typography
              style={{
                fontFamily: '"Segoe UI"',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '30px'
              }}
            >
              Làm Hết sức, chơi hết sức
            </Typography>
          </Paper>
          <Paper className={classes.paper3} style={{ boxShadow: 'none' }}>
            <Button
              variant="contained"
              color="secondary"
              style={{ backgroundColor: '#F94949' }}
            >
              <Typography
                variant="button"
                style={{
                  fontFamily: '"Segoe UI"',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: '25px',
                  padding: '5px 20px 5px 20px'
                }}
              >
                Đặt Sân Ngay
              </Typography>
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper1} style={{ boxShadow: 'none' }}>
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
