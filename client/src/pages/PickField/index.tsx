import React from 'react'
import {
  Container,
  Grid,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Theme,
  useTheme
} from '@material-ui/core'
import { Bill } from './components/Bill/bill'
import SwipeableViews from 'react-swipeable-views'
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
        <Grid item xs={12}>
          <Typography>Title flow tab</Typography>
        </Grid>
        <Grid item xs={9}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Giờ Sân" {...a11yProps(0)} />
              <Tab label="Huấn Luyên Viên" {...a11yProps(1)} />
              <Tab label="Vật dụng cần thiết" {...a11yProps(2)} />
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
