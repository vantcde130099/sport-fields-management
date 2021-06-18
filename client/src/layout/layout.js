import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export function Layout() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>Header</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}></Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}></Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>Footer</Paper>
                </Grid>
            </Grid>
        </div>
    );
}