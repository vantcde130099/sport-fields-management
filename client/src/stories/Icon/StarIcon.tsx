import React from 'react'
import Grade from '@material-ui/icons/Grade';
import { makeStyles ,ThemeProvider , createMuiTheme } from '@material-ui/core/styles';
export interface StarProp {
    point : number 
}
const useStyles = makeStyles({
    button: {
        color : "#FFFF00",
        // backgroundColor: "#F2C94C",
    },
    Content :{
        display : "flex" ,
        fontWeight : 600,
        color : "#FFFF00",
        alignItems : "center"
    }
})
export const StarIcon : React.FC<StarProp>= ({point})=> {
    const classes  = useStyles();
    return (
        <div className = {classes.Content}>
            {point}<Grade className ={classes.button} ></Grade>
        </div>
        )
}

export default StarIcon;