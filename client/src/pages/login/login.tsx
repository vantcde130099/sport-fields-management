import React from 'react'

//Component
import { TabPanel } from './components/TabPanel'

//Material UI
import {
  AppBar,
  Button,
  Grid,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  ThemeProvider
} from '@material-ui/core'

//Icons
import FacebookIcon from '@material-ui/icons/Facebook'
import GoogleButton from 'react-google-button'
import SwipeableViews from 'react-swipeable-views'

//Styles
import { theme, useStyles } from './login.styles'

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}

export function LoginUser() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index: number) => {
    setValue(index)
  }

  const classes = useStyles()

  return (
    <Grid className={classes.root}>
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
                    >
                      <Tab
                        label="Khách"
                        style={{
                          fontSize: '22px',
                          fontFamily: '"Segoe UI"',
                          fontStyle: 'normal',
                          fontWeight: 600
                        }}
                        {...a11yProps(0)}
                      />
                      <Tab
                        label="Chủ Sân/HLV"
                        style={{
                          fontSize: '22px',
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
    </Grid>
  )
}
