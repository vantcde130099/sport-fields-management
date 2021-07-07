import React from 'react'

//component
import { Coupon } from './Coupon'

//material-ui
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Grid,
  Button
} from '@material-ui/core'

//styles
import { useStyles } from './index.styles'

export interface Props {
  listCoupon: []
}

/**
 * Primary UI component for user interaction
 */
export const ListCoupon: React.FC<Props> = ({ listCoupon }) => {
  const classes = useStyles()

  const [selected, setSelected] = React.useState(-1)
  const onSelectCoupon = (e: any, index: number) => {
    setSelected(index)
  }

  return (
    <Paper className={classes.root} style={{ backgroundColor: '#f3f0f0' }}>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <Typography variant="h5" gutterBottom style={{ marginTop: 16 }}>
          Chọn Coupon
        </Typography>
        <List component="nav">
          {listCoupon?.map((coupon, index) => (
            <ListItem className={classes.listItem}>
              <ListItemText onClick={(e) => onSelectCoupon(e, index)}>
                <Coupon
                  coupon={coupon}
                  selected={index === selected ? true : false}
                ></Coupon>
              </ListItemText>
            </ListItem>
          ))}
        </List>
        <Button variant="contained" color="secondary">
          Áp dụng
        </Button>
      </Grid>
    </Paper>
  )
}
