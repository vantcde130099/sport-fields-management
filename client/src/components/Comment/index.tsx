import React from 'react'

//material-ui
import { Grid, Paper, Typography, ButtonBase, Avatar } from '@material-ui/core'

//material-ui icons
import StarIcon from '@material-ui/icons/Star';

//styles
import { useStyles } from './index.styles'

export interface Props {
  img?: string
  date?: any
  name?: string
  comment?: string
  point?: number
}

/**
 * Primary UI component for user interaction
 */
export const Comment: React.FC<Props> = ({
  img, name, comment, date, point
}) => {
  const classes = useStyles({
  })

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar src={img} >{name?.charAt(0)}</Avatar>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {comment}
                </Typography>

              </Grid>
              <Grid item>
                <Typography variant="body2" color="textSecondary">
                  Ngày : {date}
                </Typography>
              </Grid>
            </Grid>
            <Grid item >
              <Grid
                style={{ color: '#ffb837' }}
                container
                direction="row"
                justify="center"
                alignItems="center">
                5 <StarIcon></StarIcon>
              </Grid >
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
