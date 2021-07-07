import React from 'react'

// Material-ui
import { ButtonBase, Grid, Paper, Typography } from '@material-ui/core'

// Styles
import { useStyles } from './Coupon.styles'

interface Coupon {
  id?: string
  code?: string
  discount?: number
  dateClose?: string
}

export interface Props {
  coupon?: Coupon
  selected: boolean
}

export const Coupon: React.FC<Props> = ({ coupon, selected }) => {

  const classes = useStyles()
  
  return (
    <ButtonBase style={{ borderRadius: 10 }}>
      <Paper
        onClick={() => {}}
        className={
          `${classes.paper}` + ` ${selected == true ? classes.selected : ''}`
        }
      >
        <Grid container spacing={2}>
          <Grid item className={classes.container}>
            <Grid
              item
              xs
              container
              direction="column"
              style={{ width: '100%', height: '100%' }}
              alignItems="flex-start"
              justify="space-between"
            >
              <Grid
                item
                container
                direction="column"
                style={{ width: '100%' }}
                alignItems="flex-start"
                justify="space-between"
              >
                <Typography
                  variant="subtitle1"
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    width: '100%',
                    textAlign: 'left',
                    color: '#F94949'
                  }}
                  noWrap
                >
                  {coupon?.id}
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  style={{ fontWeight: 700, color: '#F94949' }}
                >
                  {coupon?.code}
                </Typography>
              </Grid>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ fontSize: 10 }}
              >
                HSD: {coupon?.dateClose}
              </Typography>
            </Grid>
          </Grid>
          <Grid item sm container>
            <Grid
              item
              xs
              container
              direction="column"
              alignItems="flex-start"
              spacing={2}
            >
              <Grid item xs style={{ display: 'flex', width: '100%' }}>
                <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                  Giảm
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: 700, color: '#F94949', marginLeft: 8 }}
                >
                  {coupon?.discount}%
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item spacing={2} style={{ marginLeft: 8 }}>
            <Grid
              item
              xs
              container
              direction="column"
              style={{ width: '100%', height: '100%' }}
              alignItems="flex-end"
              justify="space-between"
            >
              <Typography
                variant="subtitle1"
                style={{ fontWeight: 500, fontSize: 10, color: '#f94949' }}
                gutterBottom
              >
                Có thể sử dụng
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                style={{
                  fontWeight: 500,
                  fontSize: 10,
                  color: '#f94949',
                  margin: 0
                }}
              >
                Điều kiện
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </ButtonBase>
  )
}
