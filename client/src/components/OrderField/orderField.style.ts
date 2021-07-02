import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#333333',
      color: '#FCFCFC',
      height: '160px',
      borderRadius: '0 0 20px 20px'
    },
    paper: {
      textAlign: 'right'
    },
    paper1: {
      padding: theme.spacing(0, 0, 0, 0),
      textAlign: 'center'
    },
    paper2: {
      textAlign: 'center'
    },
    paper3: {
      borderLeft: '2px solid #747070',
      marginLeft: '3px',
      margin: '5px',
      padding: '5px'
    },
    button: {
      background: '#F94949',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 40,
      width: '90%',
      padding: '0 30px',
      '&:hover': {
        backgroundColor: '#F94949'
      }
    },
    button1: {
      background: '#F2994A',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 40,
      width: '90%',
      padding: '0 30px',
      marginTop: '10px',
      '&:hover': {
        backgroundColor: '#F2994A'
      }
    }
  })
)
