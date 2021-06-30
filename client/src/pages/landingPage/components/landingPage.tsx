import { Button, Grid, Paper, Typography } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { useStyles, theme } from './landingPage.styles'
import React from 'react'
import Image from './image/imageLandingPage.png'

export function LandingPage() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
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
          <ThemeProvider theme={theme}>
            <Paper className={classes.paper2} style={{ boxShadow: 'none' }}>
              <Typography variant="h4">What is Sport?</Typography>
              <Typography variant="h4">Sport is What Buksan can do</Typography>
              <Typography variant="h5">Làm Hết sức, chơi hết sức</Typography>
            </Paper>
            <Paper className={classes.paper3} style={{ boxShadow: 'none' }}>
              <Button
                variant="contained"
                color="secondary"
                style={{ backgroundColor: '#F94949' }}
              >
                <Typography variant="button">Đặt Sân Ngay</Typography>
              </Button>
            </Paper>
          </ThemeProvider>
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
    </div>
  )
}
