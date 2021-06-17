import { makeStyles } from '@material-ui/core/styles'

import { Props } from './Button'

export const useStyles = makeStyles({
  root: (props: Props) => {
    return {
      backgroundColor: props.backgroundColor,
      color: 'white',
      '&:hover': {
        backgroundColor: 'rgb(7, 177, 77, 0.42)'
      }
    }
  },
  outlined: {
    color: '#F94949',
    fontWeight: 700,
    borderColor: '#F94949'
  }
})
