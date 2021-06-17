import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import {FormControlProps} from '@material-ui/core/FormControl';
import { TextField } from '@material-ui/core';

export interface TextInputFieldProps{
    name ?: String , 
    variant ?: 'filled'
    | 'outlined'
    | 'standard'
    ,
    colorType ?: 'secondary' | 'primary'
}

const useStyles = makeStyles((theme) => ({
  text : {
    color : "#ffffff"
  }
  }));

export const TextInputField: React.FC<TextInputFieldProps> = ({colorType = "secondary",name="Age",variant = "outlined",...props }) => {
    const classes = useStyles();

    return (
      <TextField className = {classes.text}></TextField>
    );
    
}
