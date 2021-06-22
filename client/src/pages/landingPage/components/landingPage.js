import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Image from './image/imageLandingPage.png'
import Typography from '@material-ui/core/Typography'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#FCFCFC'
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    color: '#000000'
  },
  paper1: {
    padding: theme.spacing(0),
    textAlign: 'right',
    color: '#000000',
    background: '#FCFCFC'
  },
  paper2: {
    padding: theme.spacing('30%', 0, 0, 0),
    textAlign: 'right',
    color: '#000000',
    background: '#FCFCFC'
  },
  paper3: {
    padding: theme.spacing(0, 0, 0, 0),
    textAlign: 'right',
    color: '#000000',
    background: '#FCFCFC',
    paddingTop: '35px'
  }
}))

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      'Fira Sans Extra Condensed'
    ].join(','),
    h4: {
      fontFamily: '"Segoe UI"',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '45px'
    },
    h5: {
      fontFamily: '"Segoe UI"',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '30px'
    },
    button: {
      fontFamily: '"Segoe UI"',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '25px',
      padding: '5px 20px 5px 20px'
    }
  }
})

export function LandingPage() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container boxShadow={0}>
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
              <Button variant="contained" color="secondary">
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
