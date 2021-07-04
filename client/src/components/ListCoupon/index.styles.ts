import { makeStyles } from '@material-ui/core/styles'


export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxHeight: 400,
    maxWidth: 380,
    overflow : 'scroll',
    backgroundColor: theme.palette.background.paper,
  },
}))
