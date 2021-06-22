import { makeStyles } from '@material-ui/core/styles'


export const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 650,
  },
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}))
