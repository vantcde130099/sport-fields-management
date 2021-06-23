import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useStyles } from './footer.styles'

export const Footer = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container style={{ borderRadius: '0px' }}>
        <Grid item xs={12} className={classes.paper}>
          <Typography variant="h5">Well Come To BUKSAN</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.paper1}>
          <Typography variant="h6">
            Sports teach teamwork and problem-solving skills
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.paper1}>
          <Typography variant="h6">Sports boost self-esteem</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.paper1}>
          <Typography variant="h6">
            Reduce pressure and stress with sports
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.paper1}></Grid>
        <Grid item xs={12} className={classes.paper}>
          <Typography variant="h5">Sport is what buksan can do</Typography>
        </Grid>
      </Grid>
    </div>
  )
}
