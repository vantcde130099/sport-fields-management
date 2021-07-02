import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  root: {
    maxWidth: '170px',
    height: '240px',
    padding: '0px',
    display: 'inline-block',
    margin: '10px 20px'
  },
  image: {
    width: '170px',
    height: '190px'
  },
  details: {
    display: 'flex',
    height: '50px',
    backgroundColor: '#333333'
  },
  root1: {
    marginLeft: '3px',
    width: '60%',
    color: '#F2F2F2'
  },
  root2: {
    width: '33%',
    margin: '14px 5px',
    backgroundColor: '#F94949',
    height: '20px',
    padding: '0px',
    borderRadius: '10px'
  },
  button: {
    padding: '0px'
  }
})
