import {makeStyles} from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        paper: {
          padding: theme.spacing(1),
          margin: 'auto',
          maxWidth: 400,
          width : '100%',
          minWidth: 320,
          borderRadius : 10,
        },
        container: {
          width: 128,
          height: 100,
        },
        selected : {
          backgroundColor : '#e0e0e0'
        },
        img: {
          margin: 'auto',
          display: 'block',
          maxWidth: '100%',
          maxHeight: '100%',
        },
}))
