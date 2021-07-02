import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 130,
      backgroundColor: '#F94949',
      color: 'white',
      textAlign: 'center',
      boxShadow: '3px 3px 10px 0px #888888',
      display: 'inline-block',
      margin: '0 5px'
    }
  })
)
