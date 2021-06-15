import React from 'react';
import './button.css';
import Button1 from '@material-ui/core/Button';
import { makeStyles  , createMuiTheme } from '@material-ui/core/styles';
import { DefaultTheme } from '@material-ui/styles';

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  variant ?: 'contained' | 'outlined'
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  disabled ?: boolean ;
  onClick?: () => void;
}


const useStyles = makeStyles(({
  root: (props :ButtonProps) => {
      return {
      backgroundColor : props.backgroundColor ,
      color : "white",
        "&:hover": {
          backgroundColor: 'rgb(7, 177, 77, 0.42)'
        }
      }
   },
   outlined : {
      color: '#F94949',
      fontWeight : 700,
      borderColor : '#F94949',
 },
}
));

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  size = 'medium',
  backgroundColor="#F94949",
  label="Button",
  disabled = false ,
  ...props
}) => {
  const classes = useStyles({  variant : variant ,
  size : size,
  backgroundColor : backgroundColor,
  label : label,});
  return (
    <Button1
      variant = {variant}
      size = {size}
      className = {variant==="contained"?classes.root:classes.outlined}
      disabled ={disabled}>
      {label}
    </Button1>
  );
};
