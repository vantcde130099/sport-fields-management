import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SwipeableViews from 'react-swipeable-views'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import GoogleButton from 'react-google-button'
import Button from '@material-ui/core/Button'
import FacebookIcon from '@material-ui/icons/Facebook'
import TextField from '@material-ui/core/TextField'
import { red } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#151B26',
    height: '85vh',
    borderStyle: 'solid',
    borderWidth: '45px 0px',
    borderColor: '#1A222E'
  },
  paper: {
    padding: theme.spacing('10%', 0, 0, 0),
    textAlign: 'center',
    color: '#000000',
    backgroundColor: '#FCFCFC'
  },
  paper1: {
    margin: theme.spacing('18%', 0, 0, 0),
    textAlign: 'left',
    color: '#000000',
    background: '#FCFCFC'
  },
  paper2: {
    padding: theme.spacing('20%', 0, 0, '20%'),
    textAlign: 'left',
    color: '#FCFCFC',
    background: 'none'
  },
  node: {
    backgroundColor: '#FCFCFC',
    height: '86vh',
    borderRadius: '25px 0 0 25px'
  },
  root1: {
    width: '100%'
  },
  root3: {
    margin: theme.spacing(1),
    width: '90%',
    marginLeft: '5%'
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
    h3: {
      fontFamily: '"Segoe UI"',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '42px',
      textAlign: 'left'
    },
    h5: {
      fontFamily: '"Segoe UI"',
      fontStyle: 'normal',
      fontWeight: 400,
      paddingTop: '20px'
    }
  },
  palette: {
    primary: red
  }
})

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}

export function LoginUser() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={1} style={{ backgroundColor: '#1A222E' }}></Grid>
        <Grid item xs={10} container style={{ backgroundColor: '#1A222E' }}>
          <Grid item xs={4} className={classes.node}>
            <Grid item xs={12}>
              <ThemeProvider theme={theme}>
                <Paper className={classes.paper1} style={{ boxShadow: 'none' }}>
                  <Typography
                    style={{
                      fontFamily: '"Segoe UI"',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      fontSize: '45px',
                      textAlign: 'center',
                      color: '#F94949'
                    }}
                  >
                    BUKSAN
                  </Typography>
                </Paper>
              </ThemeProvider>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper1} style={{ boxShadow: 'none' }}>
                <Typography>
                  <div className={classes.root1}>
                    <AppBar
                      position="static"
                      style={{
                        background: 'none',
                        color: '#000000',
                        boxShadow: 'none'
                      }}
                    >
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        TabIndicatorProps={{
                          style: {
                            backgroundColor: '#F94949'
                          }
                        }}
                        aria-label="full width tabs example"
                        centered
                        wrapped
                      >
                        <Tab
                          label="Khách"
                          style={{
                            fontSize: '25px',
                            fontFamily: '"Segoe UI"',
                            fontStyle: 'normal',
                            fontWeight: 600
                          }}
                          {...a11yProps(0)}
                        />
                        <Tab
                          label="Chủ Sân/HLV"
                          style={{
                            fontSize: '25px',
                            fontFamily: '"Segoe UI"',
                            fontStyle: 'normal',
                            fontWeight: 600
                          }}
                          {...a11yProps(1)}
                        />
                      </Tabs>
                    </AppBar>
                    <SwipeableViews
                      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                      index={value}
                      onChangeIndex={handleChangeIndex}
                    >
                      <TabPanel value={value} index={0} dir={theme.direction}>
                        <Paper
                          className={classes.paper}
                          style={{ boxShadow: 'none' }}
                        >
                          <GoogleButton
                            style={{
                              display: 'inline-block',
                              boxShadow: 'none'
                            }}
                          ></GoogleButton>
                          <Button
                            style={{
                              height: '50px',
                              width: '240px',
                              borderRadius: '0',
                              backgroundColor: '#1976d2',
                              textTransform: 'none',
                              color: 'white',
                              fontSize: '1rem',
                              marginTop: '30px'
                            }}
                          >
                            <FacebookIcon
                              style={{
                                width: '35px',
                                height: '35px',
                                marginRight: '20px '
                              }}
                            ></FacebookIcon>
                            Login with Facebook
                          </Button>
                        </Paper>
                      </TabPanel>
                      <TabPanel value={value} index={1} dir={theme.direction}>
                        <form>
                          <ThemeProvider theme={theme}>
                            <TextField
                              className={classes.root3}
                              id="outlined-userName-input"
                              label="Số Điện Thoại"
                              type="password"
                              autoComplete="current-password"
                              variant="outlined"
                            />
                          </ThemeProvider>
                          <ThemeProvider theme={theme}>
                            <TextField
                              className={classes.root3}
                              id="outlined-password-input"
                              label="Mật Khẩu"
                              type="password"
                              autoComplete="current-password"
                              variant="outlined"
                            />
                          </ThemeProvider>
                          <Paper
                            className={classes.paper}
                            style={{ boxShadow: 'none' }}
                          >
                            <Button
                              style={{
                                height: '40px',
                                width: '200px',
                                borderRadius: '20px',
                                backgroundColor: '#1976d2',
                                textTransform: 'none',
                                color: 'white',
                                fontSize: '1.2rem',
                                backgroundColor: '#F94949'
                              }}
                            >
                              ĐĂNG NHẬP
                            </Button>
                          </Paper>
                        </form>
                      </TabPanel>
                    </SwipeableViews>
                  </div>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid
            item
            xs={8}
            style={{
              backgroundColor: '#151B26',
              borderRadius: '0 25px 25px 0'
            }}
          >
            <Grid item xs={12}>
              <ThemeProvider theme={theme}>
                <Paper className={classes.paper2} style={{ boxShadow: 'none' }}>
                  <Typography
                    variant="h3"
                    style={{
                      fontWeight: 600,
                      fontSize: '42px'
                    }}
                  >
                    What is sport ?
                  </Typography>
                  <Typography
                    variant="h3"
                    style={{
                      fontWeight: 'bold',
                      fontWeight: 600,
                      fontSize: '42px'
                    }}
                  >
                    Sport is what buksan can do
                  </Typography>
                  <Typography variant="h5">
                    Làm Hết sức, chơi hết sức
                  </Typography>
                </Paper>
              </ThemeProvider>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1} style={{ backgroundColor: '#1A222E' }}></Grid>
      </Grid>
    </div>
  )
}
