import React from 'react'

//Components
import CardField from '../CardField'

//Material-ui
import { Container, Grid } from '@material-ui/core'

//Styles
import { useStyles } from './index.styles'

export interface Props {
  listItem?: []
}

export const ListCard: React.FC<Props> = ({ listItem = [] }) => {
  const [spacing, setSpacing] = React.useState(2)
  const classes = useStyles()

  const handleChange = (event: any) => {
    setSpacing(Number(event.target.value))
  }

  return (
      <Grid container className={classes.root} spacing={5}>
        {listItem.map((item) => (
          <Grid item xs={4}>
            <CardField item={item} />
          </Grid>
        ))}
      </Grid>
  )
}
