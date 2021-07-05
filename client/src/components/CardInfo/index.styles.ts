import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width : 250,
    minWidth: 120,
  },
  paper: {
    padding: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  customBox: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 2,
    wordBreak: 'break-all',
    overflow: 'hidden'
  },
}));
