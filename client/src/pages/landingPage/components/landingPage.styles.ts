import { createMuiTheme, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
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
