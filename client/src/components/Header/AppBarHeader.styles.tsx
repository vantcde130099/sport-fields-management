import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
      backgroundColor: "#f7f7f9",
      
    },
    root: {
      width: '100%',
      maxWidth: '36ch',
      margin : 0 ,
      padding : 0 ,
      backgroundColor: theme.palette.background.paper,
      fontWeight : 500,
    },
    inline: {
      display: 'inline',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
  
      marginRight: theme.spacing(2),
  
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    dropdowncolor : {
      color : "#ff0056"
    }
    ,
    link : {
      '&:hover': {
        color: 'rgb(255, 255, 255, 1)!important' as any, 
        display : 'flex',
        // borderBottom : "1px solid",
      },
    },
    linkActive : {
      color: 'rgb(255, 255, 255, 1)!important' as any, 
      paddingBottom : 10,
      paddingTop : 10,
      display : 'flex',
      borderBottom : "1px solid",
    }
  }));
  