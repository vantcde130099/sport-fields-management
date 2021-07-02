import React from 'react'

//Material-UI
import {
  Container,
  Grid,
  Typography,
  AppBar,
  Tabs,
  Tab,
  useTheme
} from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'

//Components
import { Bill } from './components/Bill/bill'
import { TabPanel } from './components/TabPanel/TabPanel'
import { HourTicket } from './components/HourTicket/hourTicket'
import { ItemCard } from './components/ItemCard/itemCard'

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}

export const PickField = () => {
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index: number) => {
    setValue(index)
  }

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} style={{ padding: '20px 0' }}>
          <Typography
            style={{
              textAlign: 'center',
              fontSize: '2rem',
              fontWeight: 'bold'
            }}
          >
            Title flow tab
          </Typography>
        </Grid>
        <Grid item xs={9}>
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
                label="Giờ Sân"
                style={{
                  fontSize: '22px',
                  fontFamily: '"Segoe UI"',
                  fontStyle: 'normal',
                  fontWeight: 600
                }}
                {...a11yProps(0)}
              />
              <Tab
                label="Huấn Luyên Viên"
                style={{
                  fontSize: '22px',
                  fontFamily: '"Segoe UI"',
                  fontStyle: 'normal',
                  fontWeight: 600
                }}
                {...a11yProps(1)}
              />
              <Tab
                label="Vật dụng cần thiết"
                style={{
                  fontSize: '22px',
                  fontFamily: '"Segoe UI"',
                  fontStyle: 'normal',
                  fontWeight: 600
                }}
                {...a11yProps(2)}
              />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <HourTicket />
              <HourTicket />
              <HourTicket />
              <HourTicket />
              <HourTicket />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
            </TabPanel>
          </SwipeableViews>
        </Grid>
        <Grid item xs={3}>
          <Bill />
        </Grid>
      </Grid>
    </Container>
  )
}
