import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  root: {
    width: '350px',
    minHeight: '400px',
    padding: '0px',
    margin: '0px',
    border: '1px solid'
  },
  root1: {
    textAlign: 'center',
    display: 'block'
  },
  root2: {
    textAlign: 'center',
    display: 'block',
    margin: '10px 0px'
  },
  button: {
    color: '#FCFCFC',
    backgroundColor: '#F94949',
    '&:hover': {
      backgroundColor: '#F94949'
    },
    fontSize: '1rem'
  }
})
