import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#4C4C4C',
      color: '#FCFCFC',
      borderRadius: '0 0 20px 20px',
      paddingTop: '30px'
    },
    paper: {
      textAlign: 'center',
      padding: theme.spacing(1, 0, 1, 0),
      color: '#FCFCFC',
      backgroundColor: '#333333',
      margin: theme.spacing(1, 0, 0, 0)
    },
    paper1: {
      padding: theme.spacing(0, 0, 0, 4),
      textAlign: 'center',
      color: '#FCFCFC'
    },
    paper2: {
      padding: theme.spacing(0, 0, 0, 8),
      textAlign: 'left',
      color: '#FCFCFC'
    },
    button: {
      '&:hover': {
        backgroundColor: 'none'
      }
    }
  })
)
