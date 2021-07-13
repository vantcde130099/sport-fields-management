import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Material-ui
import { Grid } from '@material-ui/core'

// Redux
import { RootState } from '../../redux/store'
import { decrement, increment, incrementByAmount } from '../../redux/counter'

interface Props {}

export const Counter: React.FC<Props> = () => {
  const count = useSelector((state: RootState) => state.counter.count)
  const dispatch = useDispatch()

  return (
    <Grid>
      <Grid>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(incrementByAmount(33))}
        >
          Increment By 33
        </button>
      </Grid>
    </Grid>
  )
}
