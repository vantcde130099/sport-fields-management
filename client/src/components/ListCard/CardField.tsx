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
import { useStyles } from './CardField.styles'

export interface Props {
  item?: {
    image?: string
    nameField?: string
    discount?: number
    description?: string
    price?: string
    address?: string
    point?: number
  }
  onClick?: () => void
}

export const CardField: React.FC<Props> = ({ item }) => {
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
        <CardContent className={`${classes.content} ${classes.hoverDisabled}`}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.typographyContent}
              noWrap
            >
              {item?.nameField}
            </Typography>
            <Paper
              className={`${classes.typographyDescription} , ${classes.hoverDisabled}`}
              style={{
                marginBottom: 6.3,
                fontSize: 9,
                backgroundColor: '#F94949',
                maxWidth: 64,
                display: 'inline-block',
                color: '#fff',
                padding: '4px 10px'
              }}
              color="secondary"
            >
              Giảm {item?.discount}%
            </Paper>
          </Grid>
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
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            style={{ marginTop: 8 }}
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
              size="small"
            />
          </Grid>
        </CardContent>

        <CardActions></CardActions>
      </CardActionArea>
    </Card>
  )
}

export default CardField
