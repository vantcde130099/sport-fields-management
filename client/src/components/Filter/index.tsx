import React from 'react'
import { Grid, IconButton, InputAdornment, InputLabel, FormControl, Select, Paper, TextField, Input } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import { useStyles } from './index.styles'

export interface Props {
  onSubmitSearch?: (value?: any) => void
  onChangeRegion?: (value?: any) => void
  onChangeDistrict?: (value?: any) => void
  onChangeDateTime?: (value?: any) => void
  onChangeTypeField?: (value?: any) => void
}

/**
 * Primary UI component for user interaction
 */
export const SearchFilter: React.FC<Props> = ({ ...props
}) => {
  const classes = useStyles();
  const [typeField, setTypeField] = React.useState(7);
  const [region, setRegion] = React.useState(1);
  const [district, setDistrict] = React.useState(1)
  const [searchValue, setSearchValue] = React.useState("")
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleChange = (event: any) => {
    setTypeField(event.target.value);
    props.onChangeTypeField?.(event.target.value)
  };
  const handleChangeRegion = (event: any) => {
    setRegion(event.target.value);
    props.onChangeRegion?.(event.target.value)
  };
  const handleChangeDistrict = (event: any) => {
    setDistrict(event.target.value);
    props.onChangeDistrict?.(event.target.value)
  };
  const handleDateChange = (event: any) => {
    setSelectedDate(event.target.value);
    props.onChangeDateTime?.(event.target.value)
  };
  const onChangeSearch = (event: any) => {
    setSearchValue(event.target.value);
  }
  const onKeySearch = (event: any) => {
    if (event.charCode == 13) {
      console.log("click here");
      props.onSubmitSearch?.(event.target.value)
    }
  }
  const handleClickSearch = () => {
    props.onSubmitSearch?.(searchValue)
  }
  return (
    <>
      <Paper className={classes.container}>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <FormControl className={classes.formControl} >
              <InputLabel htmlFor="standard-adornment-search">Tên Sân Bóng</InputLabel>
              <Input
                id="standard-adornment-search"
                type='text'
                value={searchValue}
                onChange={onChangeSearch}
                onKeyPress={onKeySearch}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle search visibility"
                      onClick={handleClickSearch}
                    // onMouseDown={handleMouseDownsearch}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">Trong</InputLabel>
              <Select
                native
                value={region}
                onChange={handleChangeRegion}
                label="Trong"
                inputProps={{
                  name: 'region',
                  id: 'outlined-region-native-simple',
                }}
              >
                <option value={1}>Đà Nẵng</option>
                <option value={2}>Sài Gòn</option>
                <option value={3}>Hà Nội</option>

              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">Quận</InputLabel>
              <Select
                native
                value={district}
                onChange={handleChangeDistrict}
                label="Quận"
                inputProps={{
                  name: 'district',
                  id: 'outlined-district-native-simple',
                }}
              >
                <option value={1}>Sơn Trà</option>
                <option value={2}>Cẩm Lệ</option>
                <option value={3}>Hải Châu</option>

              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                id="datetime-local"
                label="Ngày Giờ"
                type="datetime-local"
                value={selectedDate}
                variant="outlined"
                onChange={handleDateChange}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  // only needs the first 16 characters in the date string
                  min: new Date().toISOString().slice(0, 16),
                  max: new Date(Date.now() + 12096e5).toISOString().slice(0, 16)
                }}
              />
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">Loại Sân</InputLabel>
              <Select
                native
                value={typeField}
                onKeyDown={handleChange}
                label="Loại Sân"
                inputProps={{
                  name: 'typeField',
                  id: 'outlined-typeField-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                <option value={7}>7 người</option>
                <option value={9}>9 người</option>
                <option value={11}>11 người</option>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}
