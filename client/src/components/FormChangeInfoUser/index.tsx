import {
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox
} from '@material-ui/core'
import React from 'react'
import { useStyles } from './index.styles'

export interface Props {
  firstName?: string
  lastName?: string
  email?: string
  phoneNumber?: string
  ward?: string
  city?: string
  district?: string
}

/**
 * Primary UI component for user interaction
 */
export const FormChangeInfoUser: React.FC<Props> = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  ward,
  district,
  city
}: Props) => {
  const classes = useStyles()

  const [allowChangePhone, setAllowChangePhone] = React.useState(false)

  return (
    <>
      <form className={classes.form} noValidate>
        <Typography variant="h6" gutterBottom>
          Tài Khoản
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              value={email}
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              value={firstName}
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              value={lastName}
              label="Last name"
              fullWidth
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              label="Số Điện Thoại"
              disabled={!allowChangePhone}
              fullWidth
              autoComplete="tel"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  name="saveAddress"
                  value="yes"
                  onChange={(e) => {
                    setAllowChangePhone(!allowChangePhone)
                  }}
                />
              }
              label="Thay Đổi Số Điện Thoại"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="ward"
              name="ward"
              value={ward}
              label="Địa chỉ"
              fullWidth
              autoComplete="address"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              value={city}
              label="Thành Phố"
              fullWidth
              autoComplete="city"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="district"
              name="district"
              label="Quận"
              value={district}
              fullWidth
            />
          </Grid>
        </Grid>
      </form>
    </>
  )
}
