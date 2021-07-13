import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#FCFCFC'
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    color: '#000000',
    boxShadow: 'none'
  },
  paper1: {
    padding: theme.spacing(0),
    textAlign: 'right',
    color: '#000000',
    background: '#FCFCFC',
    boxShadow: 'none'
  },
  paper2: {
    padding: theme.spacing('30%', 0, 0, 0),
    textAlign: 'right',
    color: '#000000',
    background: '#FCFCFC',
    boxShadow: 'none'
  },
  paper3: {
    padding: theme.spacing(0, 0, 0, 0),
    textAlign: 'right',
    color: '#000000',
    background: '#FCFCFC',
    paddingTop: '35px',
    boxShadow: 'none'
  },
  title: {
    fontFamily: '"Segoe UI"',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '25px',
    padding: '5px 20px 5px 20px'
  },
  title2: {
    fontFamily: '"Segoe UI"',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '30px'
  },
  title3: {
    fontFamily: '"Segoe UI"',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '45px'
  }
}))
