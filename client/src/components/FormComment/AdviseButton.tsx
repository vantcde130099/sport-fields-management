import React from 'react'

//material-ui
import { Button } from '@material-ui/core'

//slyles
import { useStyles } from './AdviseButton.styles'

export interface Props {
  /**
   * Is this the principal call to action on the page?
   */
  instructions?: string[]
}

/**
 * Primary UI component for user interaction
 */
export const AdviseButtons: React.FC<Props> = ({ instructions }:Props) => {

  const classes = useStyles()

  const [listButtonActive, setListButtonActive] = React.useState<Array<number>>([])

  const toggleButton = (event: any, index: number) => {
    let array = []
    if (!listButtonActive.includes(index)) {
      array = [...listButtonActive, index]
      setListButtonActive(array)
    } else {
      array = listButtonActive.filter((x: number) => x != index)
      setListButtonActive(array)
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
            listButtonActive.indexOf(index) > -1 ? classes.activeButton : ''
          }`}
        >
          {instruction}
        </Button>
      ))}
    </>
  )
}
