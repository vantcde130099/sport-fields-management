import React from 'react'

//material-ui
import { Grid, Paper, Typography, ButtonBase, Avatar } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';

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
                <Grid container direction='row' justify='space-between' alignItems="center">
                  <Typography gutterBottom variant="subtitle1">
                    {name}
                  </Typography>
                  <Grid
                    style={{ color: '#ffb837', width: 'auto', marginBottom: 5.6 }}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <Typography gutterBottom style={{ margin: 0 }} variant="subtitle1">
                      {point}
                    </Typography> <Rating name="size-small" defaultValue={point} size="small" precision={0.5} readOnly />
                  </Grid>
                </Grid >
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
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
