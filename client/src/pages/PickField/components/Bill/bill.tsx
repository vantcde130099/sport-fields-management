import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { useStyles } from './bill.style'

export const Bill = () => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent style={{ padding: '10px' }}>
        <Typography
          variant="h4"
          style={{ textAlign: 'center', margin: '15px 0px' }}
        >
          Hóa Đơn
        </Typography>
        <Grid container>
          <Grid item xs={9}>
            <Typography variant="h6" style={{ color: '#F94949' }}>
              Sân
            </Typography>
          </Grid>
          <Grid item xs={3} className={classes.root1}>
            <Typography variant="h6" style={{ color: '#F94949' }}>
              Giá
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={9}>
            <Typography variant="h6" style={{ color: '#F94949' }}>
              HLV
            </Typography>
          </Grid>
          <Grid item xs={3} className={classes.root1}>
            <Typography variant="h6" style={{ color: '#F94949' }}>
              Giá
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={5}>
            <Typography variant="h6" style={{ color: '#F94949' }}>
              Gọi thêm
            </Typography>
          </Grid>
          <Grid item xs={4} className={classes.root1}>
            <Typography variant="h6" style={{ color: '#F94949' }}>
              Số Lượng
            </Typography>
          </Grid>
          <Grid item xs={3} className={classes.root1}>
            <Typography variant="h6" style={{ color: '#F94949' }}>
              Giá
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={9}>
            <Typography variant="h6" style={{ color: '#F94949' }}>
              Tổng cộng
            </Typography>
          </Grid>
          <Grid item xs={3} className={classes.root1}>
            <Typography variant="h6" style={{ color: '#F94949' }}>
              Giá
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.root2}>
        <Button className={classes.button}>Sử dụng Voucher</Button>
        <Button className={classes.button}>Thanh toán</Button>
      </CardActions>
    </Card>
  )
}
