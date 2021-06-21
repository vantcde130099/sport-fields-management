import { makeStyles } from '@material-ui/core/styles'


export const useStyles = makeStyles((theme)=>({
    container: {
        display: 'flex',
        maxWidth : 500 , 
        justifyContent : "space-between"
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
