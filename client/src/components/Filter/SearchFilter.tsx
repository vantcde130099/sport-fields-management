import React from 'react'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useStyles } from './SearchFilter.styles'
import { TextField } from '@material-ui/core';

export interface Props {
  onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const SearchFilter: React.FC<Props> = ({
}) => {
    const classes = useStyles();
    const [typeField, setTypeField] = React.useState(0);
    const [timing, setTiming] = React.useState('');
    const handleChange = (event : any) => {
        setTypeField(event.target.value);
      };
      const handleChangeTiming = (event : any) => {
        setTiming(event.target.value);
      };
  return (
    <form className={classes.container} noValidate>
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
</form>

  )
}
