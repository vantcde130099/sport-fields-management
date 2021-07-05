import React from 'react'

import { Button as MUIButton } from '@material-ui/core'

import { useStyles } from './index.styles'

export interface Props {
  /**
   * Is this the principal call to action on the page?
   */
  variant?: 'contained' | 'outlined'
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Button contents
   */
  label: string
  /**
   * Optional click handler
   */
  disabled?: boolean
  onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<Props> = ({
  variant = 'contained',
  size = 'medium',
  backgroundColor = '#F94949',
  label = 'Button',
  disabled = false
}) => {
  const classes = useStyles({
    variant: variant,
    size: size,
    backgroundColor: backgroundColor,
    label: label
  })

  return (
    <MUIButton
      variant={variant}
      size={size}
      className={variant === 'contained' ? classes.root : classes.outlined}
      disabled={disabled}
    >
      {label}
    </MUIButton>
  )
}
