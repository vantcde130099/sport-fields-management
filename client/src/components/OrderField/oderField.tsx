import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import fieldimg from './img/orderField.png'
import Button from '@material-ui/core/Button'
import { useStyles } from './oderField.style'

export const OderField = () => {
  const classes = useStyles()
  return (
    <Container>
      <Grid container>
        <Grid xs={1}></Grid>
        <Grid
          xs={10}
          container
          style={{ boxShadow: '5px 5px 5px 1px #888888', borderRadius: '5px' }}
        >
          {/* <Grid xs={1}></Grid> */}
          <Grid xs={3}>
            <img
              src={fieldimg}
              style={{ width: '150px', height: '110px', marginLeft: '20%' }}
            />
          </Grid>
          <Grid xs={7} container style={{ paddingRight: '10px' }}>
            <Grid xs={6}>
              <Typography variant="h5">Sân 5c</Typography>
            </Grid>
            <Grid xs={6} className={classes.paper}>
              <Typography variant="h6" style={{ color: '#F94949' }}>
                Hoàn thành
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Typography variant="h6" className={classes.paper1}>
                150 Trần Hưng đạo , Quận Thanh Khuê , Đà nẵng
              </Typography>
            </Grid>
            <Grid xs={6}>
              <Typography variant="h6" style={{ color: '#F2994A' }}>
                Bạn chưa đánh giá
              </Typography>
            </Grid>
            <Grid xs={6}>
              <Typography variant="h6" className={classes.paper}>
                19 /5 /2021
              </Typography>
            </Grid>
          </Grid>
          <Grid xs={2} className={classes.paper2}>
            <div className={classes.paper3}>
              <Button className={classes.button}>Đặt lại</Button>
              <Button className={classes.button1}>Đánh giá</Button>
            </div>
          </Grid>
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
    </Container>
  )
}
