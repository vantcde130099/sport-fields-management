import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  activeButton: {
    backgroundColor: 'rgba(249, 73, 73, 0.2)'
  },
  button: {
    margin: theme.spacing(1),
    borderRadius: 20
  }
}))
