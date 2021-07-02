import { makeStyles, createMuiTheme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  contain: {
    width: 600,
    flexGrow: 1,
  },

  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));


export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F94949'
    }
  }
});