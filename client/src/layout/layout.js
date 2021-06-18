import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 0,
    },
    paper: {
        padding: theme.spacing(0),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export function Layout() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>Header</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper}></Paper>
                </Grid>
                <Grid item xs={10}>
                    <Paper className={classes.paper}>Body</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper}></Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>Footer</Paper>
                </Grid>
            </Grid>
        </div>
    );
}