import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import CardField  from '../card/CardField'
import { Container } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));
export default function ListCard() {
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();
  
    const handleChange = (event : any) => {
      setSpacing(Number(event.target.value));
    };
  
    return (
        <Container maxWidth="md">
      <Grid container className={classes.root} spacing={5}>
        <Grid item xs={4}>
            <CardField/>
        </Grid> 
        <Grid item xs={4}>
            <CardField/>
        </Grid> 
        <Grid item xs={4}>
            <CardField/>
        </Grid>        
        <Grid item xs={4}>
            <CardField/>
        </Grid> 
      </Grid>
      </Container>
      )
}
