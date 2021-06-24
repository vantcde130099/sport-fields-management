import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useStyles, theme } from './footer.styles'
import logo from './img/buksan.png'
import Button from '@material-ui/core/Button'
import { ThemeProvider } from '@material-ui/core/styles'

export const Footer = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container style={{ borderRadius: '0px' }}>
        <Grid item xs={12} sm={4} className={classes.paper1}>
          <img src={logo} />
          <Typography variant="h6">
            Buksan là ứng dụng đặt sân thể thao và các dịch vụ đi kèm trên nền
            tảng website.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2} className={classes.paper2}>
          <Typography
            variant="h5"
            style={{ marginBottom: '10px', fontWeight: 'bold' }}
          >
            Các loại sân
          </Typography>
          <Typography variant="h6">Bóng đá</Typography>
          <Typography variant="h6">Bóng rổ</Typography>
          <Typography variant="h6">Bóng chuyền</Typography>
          <Typography variant="h6">Bóng bàn</Typography>
        </Grid>
        <Grid item xs={12} sm={2} className={classes.paper2}>
          <Typography
            variant="h5"
            style={{ marginBottom: '10px', fontWeight: 'bold' }}
          >
            Hỗ trợ
          </Typography>
          <Typography variant="h6">Liên hệ</Typography>
          <Typography variant="h6">Về chúng tôi</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          className={classes.paper1}
          style={{ marginTop: '50px' }}
        >
          <ThemeProvider theme={theme}>
            <Button>Đặt sân ngay</Button>
          </ThemeProvider>
        </Grid>
        <Grid item xs={12} className={classes.paper}>
          <Typography variant="h6">2021 | No copyright</Typography>
          <Typography variant="h6">Power by NerdGang</Typography>
        </Grid>
      </Grid>
    </div>
  )
}
