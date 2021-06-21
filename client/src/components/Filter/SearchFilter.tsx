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
    const [timing, setTiming] = React.useState(1);
    const handleChange = (event : any) => {
        setTypeField(event.target.value);
      };
      const handleChangeTiming = (event : any) => {
        setTiming(event.target.value);
      };
  return (
      <>
      <Paper className = {classes.container}>
            <FormControl variant="outlined" className={classes.formControl}>
    <TextField
    id="datetime-local"
    label="Ngày Giờ"
    type="datetime-local"
    defaultValue="2017-05-24T10:30"
    variant = "outlined"
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
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Trong</InputLabel>
        <Select
          native
          value={timing}
          onChange={handleChangeTiming}
          label="Trong"
          inputProps={{
            name: 'timing',
            id: 'outlined-timing-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={1}>1 Tiếng</option>
          <option value={2}>1 Tiếng rưỡi</option>
          <option value={3}>2 Tiếng</option>
        </Select>
      </FormControl>
      </Paper>
    </>
  )
}
