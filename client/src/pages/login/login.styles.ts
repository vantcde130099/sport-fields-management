import React from 'react'
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider
} from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

export const useStyles = makeStyles((theme) => ({
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
    height: '100%',
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

export const theme = createMuiTheme({
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
