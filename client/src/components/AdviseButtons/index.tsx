import React from 'react'

//material-ui
import { Button } from '@material-ui/core';

//slyles
import { useStyles } from './index.styles'

export interface Props {
  /**
   * Is this the principal call to action on the page?
   */
  instructions?: []
}

/**
 * Primary UI component for user interaction
 */
export const AdviseButtons: React.FC<Props> = ({
  instructions
}) => {
  const classes = useStyles()
  const [button, setButton] = React.useState([] as any);
  const toggleButton = (event: any, index: number) => {
    console.log(index);
    console.log(button);
    let array = []
    if (!button.includes(index)) {
      array = [...button, index]
      setButton(array)
    }
    else {
      array = button.filter((x: any) => x != index)
      setButton(array)
    }

  }
  return (
    <>
      {instructions?.map(
        (instruction, index) => (
          <Button id={`${index}`} variant="outlined" onClick={(e: any) => toggleButton(e, index)} color="secondary" className={`${classes.button} ${button.indexOf(index) > -1 ? classes.activeButton : ''}`}>
            {instruction}
          </Button>
        )
      )}
    </>
  )
}
