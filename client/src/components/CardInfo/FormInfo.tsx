import React from 'react'

//Material-ui
import {
  Button,
  TextField,
  Typography,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'

//Styles
import { useStyles } from './index.styles'
interface ItemField {
  id: string
  name: string
  type: string
  price: string
}

enum type {
  Coach = 'coach',
  Field = 'field'
}

export interface Props {
  itemFields?: ItemField[]
  description?: string
  type?: type
  name?: string
  point?: number
  priceCoach?: string
  onChangeName?: (value: number) => void
}
/**
 * Primary UI component for user interaction
 */
export const FormInfo: React.FC<Props> = ({
  itemFields,
  description,
  name,
  point,
  type,
  priceCoach,
  onChangeName
}) => {
  const [fieldCount, setFieldCount] = React.useState(0)

  const handleChange = (event: any) => {
    setFieldCount(event.target.value)
    if (itemFields) {
      onChangeName?.(event.target.value)
    }
  }
  const classes = useStyles()
  return (
    <Grid style={{ maxWidth: 300 }} className={classes.paper}>
      <Typography
        variant="h5"
        className={classes.formControl}
        style={{ textAlign: 'center' }}
        gutterBottom
      >
        Thông Tin
      </Typography>
      <FormControl
        variant="filled"
        className={classes.formControl}
        color="secondary"
      >
        <InputLabel id="demo-simple-select-filled-label">
          {type == 'field' ? 'Tên Sân' : 'Tên HLV'}
        </InputLabel>
        <Select
          disabled={type == 'field' ? false : true}
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={fieldCount}
          onChange={handleChange}
        >
          {type == 'field' &&
            itemFields?.map((field, index) => (
              <MenuItem value={index}>{field['name']}</MenuItem>
            ))}
          {type != 'field' && <MenuItem value={0}>{name}</MenuItem>}
        </Select>
      </FormControl>
      <br></br>
      {type == 'field' && (
        <FormControl className={classes.formControl}>
          <TextField
            color="secondary"
            id="outlined-basic"
            label="Loại Sân"
            variant="outlined"
            InputProps={{
              readOnly: true
            }}
            value={itemFields
              ?.map((field, index) =>
                index == fieldCount ? field['type'] : ''
              )
              .join('')}
          ></TextField>
        </FormControl>
      )}
      <br></br>
      <FormControl className={classes.formControl}>
        <TextField
          color="secondary"
          id="outlined-basic"
          label="Giá/Giờ ( VNĐ )"
          variant="outlined"
          InputProps={{
            readOnly: true
          }}
          value={
            type == 'field'
              ? itemFields
                  ?.map((field, index) =>
                    index == fieldCount ? field['price'] : null
                  )
                  .join('')
              : priceCoach
          }
        ></TextField>
      </FormControl>
      <Typography
        variant="subtitle1"
        gutterBottom
        className={`${classes.formControl} ${classes.customBox}`}
      >
        {description}
      </Typography>
      <Rating
        style={{ marginLeft: 8 }}
        name="half-rating-read"
        defaultValue={point}
        precision={0.1}
        readOnly
      />

      <Button
        variant="contained"
        color="secondary"
        className={classes.formControl}
      >
        {type == 'field' ? 'Bắt Đầu !' : 'Đặt HLV'}
      </Button>
    </Grid>
  )
}
