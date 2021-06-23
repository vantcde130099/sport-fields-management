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
      textAlign: 'center',
      padding: theme.spacing(1, 0, 1, 0)
    },
    paper1: {
      padding: theme.spacing(0, 0, 0, 6)
    }
  })
)
