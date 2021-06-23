import React, { Component, useState } from 'react'

// Material-ui
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Typography,
  Paper
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'

// Styles
import { useStyles } from './index.styles'

export interface Props {
  item?: {
    image?: string
    nameField?: String
    discount?: String
    description?: String
    price?: String
    address?: String
    point?: number
  }
  onClick?: () => void
}

export const CardField: React.FC<Props> = ({item}) => {
  
  const classes = useStyles()
  
  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.hoverShowAll}>
        <CardMedia
          className={classes.media}
          image={item?.image}
          title="Select To Card"
        >
          <Paper className={classes.contentMedia}>
            <Typography
              variant="body2"
              component="p"
              className={`${classes.typographyDescription} ${classes.customBox}`}
              style={{ fontSize: 13 }}
            >
              Mô tả : {item?.description}
            </Typography>
          </Paper>
        </CardMedia>
      </CardActionArea>
      <CardContent className={`${classes.content} ${classes.hoverDisabled}`}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={classes.typographyContent}
          noWrap
        >
          {item?.nameField}
          <div>
            <Button
              className={`${classes.typographyDescription} , ${classes.hoverDisabled}`}
              style={{ fontSize: 9, backgroundColor: '#F94949' }}
              variant="contained"
              size="small"
              color="secondary"
            >
              {item?.discount}
            </Button>
          </div>
        </Typography>
        <Typography
          variant="body2"
          style={{ fontSize: 12 }}
          color="textSecondary"
          component="div"
          className={`${classes.typographyDescription}`}
          noWrap
        >
          {item?.address}
        </Typography>
      </CardContent>

      <CardActions>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Button
            size="small"
            className={classes.costsButton}
            style={{
              borderColor: '#F94949',
              fontSize: 10
            }}
            variant="outlined"
            color="secondary"
          >
            {item?.price}
          </Button>
          <Rating
            name="half-rating-read"
            defaultValue={item?.point}
            precision={0.1}
            readOnly
          />
        </Grid>
      </CardActions>
    </Card>
  )
}

export default CardField
