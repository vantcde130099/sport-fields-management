import React from 'react'

//Component
import { CarouselMUI } from '../Carousel'

//Material-ui
import { Button, TextField, Typography, Grid, InputLabel, MenuItem, FormHelperText, FormControl, Select, MuiThemeProvider, Paper } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'

//Styles
import { useStyles, theme } from './index.styles'


export interface Props {
  itemField?: [
  ]
  description?: string
  images?: []
  type?: 'coach' | 'field'
  name?: string
  point?: number
  priceHLV?: string
  onClick?: () => void
}
/**
 * Primary UI component for user interaction
 */
export const CardInfo: React.FC<Props> = ({
  itemField, description, images, name, point, type, priceHLV
}) => {
  const [age, setAge] = React.useState('');
  const [fieldCount, setFieldCount] = React.useState(0);

  const handleChange = (event: any) => {
    setFieldCount(event.target.value);

  };
  const classes = useStyles()
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography variant="h5" className={classes.formControl} style={{ fontSize: 32, width: 'auto' }} gutterBottom>
            {type == 'field' ? name : "Hồ Sơ HLV"}
          </Typography>
          <Grid container
            direction="row"
            justify="center"
            alignItems="flex-start">
            <Grid className={classes.paper} >
              {/* <Typography variant="h5" className={classes.formControl} gutterBottom>
                Hình Ảnh
              </Typography> */}
              <div style={{ marginTop: 32 }} >
                <CarouselMUI width={450} height={350} images={images}></CarouselMUI>
              </div>
            </Grid>
            <Grid style={{ width: 300 }} className={classes.paper}>
              <Typography variant="h5" className={classes.formControl} style={{ textAlign: 'center' }} gutterBottom>
                Thông Tin
              </Typography>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">{type == 'field' ? 'Tên Sân' : 'Tên HLV'}</InputLabel>
                <Select
                  disabled={type == 'field' ? false : true}
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={fieldCount}
                  onChange={handleChange}
                >
                  {type == 'field' && itemField?.map(
                    (field, index) => {
                      return (
                        <MenuItem value={index}>{field['name']}</MenuItem>
                      )
                    }
                  )}
                  {type != 'field' && <MenuItem value={0}>{name}</MenuItem>}
                </Select>
              </FormControl>
              <br></br>
              {type == 'field' &&
                <FormControl className={classes.formControl}>
                  <TextField id="filled-basic" label="Loại Sân  " variant="filled"
                    disabled
                    value={itemField?.map(
                      (field, index) => {
                        return (
                          index == fieldCount ? field['type'] : ""
                        )
                      }
                    ).join('')}
                  >
                  </TextField>
                </FormControl>
              }
              <br></br>
              <FormControl className={classes.formControl}>
                <TextField id="filled-basic" label="Giá/Giờ ( VNĐ )" variant="filled"
                  disabled
                  value={type == 'field' ? itemField?.map(
                    (field, index) => {
                      return (
                        index == fieldCount ? field['price'] : null
                      )
                    }
                  ).join('') : priceHLV
                  }
                >

                </TextField>
              </FormControl>
              <Typography variant="subtitle1" gutterBottom className={`${classes.formControl} ${classes.customBox}`}>
                {description}
              </Typography>
              <Rating
                style={{ marginLeft: 8 }}
                name="half-rating-read"
                defaultValue={point}
                precision={0.1}
                readOnly
              />

              <Button variant="contained" color="primary" className={classes.formControl}>
                {type == 'field' ? 'Bắt Đầu !' : 'Đặt HLV'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </>
  )
}
