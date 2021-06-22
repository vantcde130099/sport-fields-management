import React from 'react'
import {InputLabel,FormControl,Select,Paper,TextField} from '@material-ui/core'
import { useStyles } from './SearchFilter.styles'

export interface Props {
  onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const SearchFilter: React.FC<Props> = ({
}) => {
    const classes = useStyles();
    const [typeField, setTypeField] = React.useState(7);
    const [region, setRegion] = React.useState(1);
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const today = new Date();
    const handleChange = (event : any) => {
        setTypeField(event.target.value);
      };
      const handleChangeRegion = (event : any) => {
        setRegion(event.target.value);
      };
      const handleDateChange = (date : any) => {
        setSelectedDate(date);
      };
      return (
      <>
      
      <Paper className = {classes.container}>
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
          <option aria-label="None" value="" />
          <option value={1}>Đà Nẵng</option>
          <option value={2}>Sài Gòn</option>
          <option value={3}>Hà Nội</option>

        </Select>
      </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
    <TextField
    id="datetime-local"
    label="Ngày Giờ"
    type="datetime-local"
    value = {selectedDate}
    defaultValue = {selectedDate.toString()}
    variant = "outlined"
    onChange={handleDateChange}
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
    </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Loại Sân</InputLabel>
        <Select
          native
          value={typeField}
          onChange={handleChange}
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
      </Paper>
    </>
  )
}
