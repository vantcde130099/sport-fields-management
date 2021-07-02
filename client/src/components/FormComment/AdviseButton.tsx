import React from 'react'

//material-ui
import { Button } from '@material-ui/core'

//slyles
import { useStyles } from './AdviseButton.styles'

export interface Props {
  /**
   * Is this the principal call to action on the page?
   */
  instructions?: []
}

/**
 * Primary UI component for user interaction
 */
export const AdviseButtons: React.FC<Props> = ({ instructions }) => {
  const classes = useStyles()
  const [button, setButton] = React.useState<Array<number>>([])
  const toggleButton = (event: any, index: number) => {
    let array = []
    if (!button.includes(index)) {
      array = [...button, index]
      setButton(array)
    } else {
      array = button.filter((x: number) => x != index)
      setButton(array)
    }
  }
  return (
    <>
      {instructions?.map((instruction, index) => (
        <Button
          id={`${index}`}
          variant="outlined"
          onClick={(e: any) => toggleButton(e, index)}
          color="secondary"
          className={`${classes.button} ${
            button.indexOf(index) > -1 ? classes.activeButton : ''
          }`}
        >
          {instruction}
        </Button>
      ))}
    </>
  )
}
