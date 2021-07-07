import React from 'react'

//material-ui Component
import {
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  FormControl,
  Select,
  Paper,
  TextField,
  Input,
  MenuItem
} from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'

//styles
import { useStyles } from './index.styles'

export interface Props {
  onSubmitSearch?: (value?: string) => void
  onChangeRegion?: (value?: number) => void
  onChangeDistrict?: (value?: number) => void
  onChangeDateTime?: (value?: string) => void
  onChangeTypeField?: (value?: number) => void
  listCity?: string[]
  listDistrict?: string[]
}

/**
 * Primary UI component for user interaction
 */
export const SearchFilter: React.FC<Props> = ({
  listCity,
  listDistrict,
  ...props
}) => {
  const classes = useStyles()

  //state
  const [typeField, setTypeField] = React.useState(7)
  const [region, setRegion] = React.useState(0)
  const [district, setDistrict] = React.useState(0)
  const [searchValue, setSearchValue] = React.useState('')
  const [selectedDate, setSelectedDate] = React.useState(new Date())

  //function
  const handleChange = (event: any) => {
    setTypeField(event.target.value)
    props.onChangeTypeField?.(event.target.value)
  }
  const handleChangeRegion = (event: any) => {
    setRegion(event.target.value)
    props.onChangeRegion?.(event.target.value)
  }
  const handleChangeDistrict = (event: any) => {
    setDistrict(event.target.value)
    props.onChangeDistrict?.(event.target.value)
  }
  const handleDateChange = (event: any) => {
    setSelectedDate(event.target.value)
    props.onChangeDateTime?.(event.target.value)
  }
  const onChangeSearch = (event: any) => {
    setSearchValue(event.target.value)
  }

  //use for 'enter' key to search
  const onKeySearch = (event: any) => {
    if (event.charCode == 13) {
      props.onSubmitSearch?.(event.target.value)
    }
  }
  //use for click search icon button
  const handleClickSearch = () => {
    props.onSubmitSearch?.(searchValue)
  }

  //render
  return (
    <Paper className={classes.container}>
      <Grid container className={classes.root} spacing={2}>
        <Grid
          item
          xs={12}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="standard-adornment-search">
              Tên Sân Bóng
            </InputLabel>
            <Input
              id="standard-adornment-search"
              type="text"
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
        <Grid
          item
          xs={12}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">Trong</InputLabel>
            <Select
              native
              value={region}
              onChange={handleChangeRegion}
              label="Trong"
              inputProps={{
                name: 'region',
                id: 'outlined-region-native-simple'
              }}
            >
              {listCity?.map((city, index) => (
                <MenuItem value={index}>{city}</MenuItem>
              ))}
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
                id: 'outlined-district-native-simple'
              }}
            >
              {listDistrict?.map((district, index) => (
                <option value={index}>{district}</option>
              ))}
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
                shrink: true
              }}
              inputProps={{
                // only needs the first 16 characters in the date string
                min: new Date().toISOString().slice(0, 16),
                max: new Date(Date.now() + 12096e5).toISOString().slice(0, 16)
              }}
            />
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Loại Sân
            </InputLabel>
            <Select
              native
              value={typeField}
              onKeyDown={handleChange}
              label="Loại Sân"
              inputProps={{
                name: 'typeField',
                id: 'outlined-typeField-native-simple'
              }}
            >
              <MenuItem value={7}>7 người</MenuItem>
              <MenuItem value={9}>9 người</MenuItem>
              <MenuItem value={11}>11 người</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  )
}
