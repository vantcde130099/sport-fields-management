import React from 'react'

//Component
import { Carousel } from './Carousel'
import { FormInfo } from './FormInfo'

//Material-ui
import { Typography, Grid } from '@material-ui/core'

//Styles
import { useStyles } from './index.styles'

export interface Props {
  description?: string
  type?: 'coach' | 'field'
  name?: string
  point?: number
  //only used for type = field
  itemField?: [
    {
      id: string
      name: string
      type: string
      price: string
      images: []
    }
  ]
  //only used for type =  coach
  imagesHLV?: []
  priceHLV?: string
}
/**
 * Primary UI component for user interaction
 */
export const CardInfo: React.FC<Props> = ({
  itemField,
  description,
  imagesHLV,
  name,
  point,
  type,
  priceHLV
}) => {
  //style
  const classes = useStyles()

  //state
  const [imagesCarousel, setImagesCarousel] = React.useState(
    type == 'field' ? itemField?.[0]?.images : imagesHLV
  )

  //function when change field  ( only used for type = 'field' )
  const onChangeFieldImages = (value: number) => {
    const images = itemField?.[value]?.images
    setImagesCarousel(images)
  }

  //render
  return (
    <>
        <Grid container direction="row" justify="center" alignItems="center">
          <Typography
            variant="h5"
            className={classes.formControl}
            style={{ fontSize: 32, width: 'auto' }}
            gutterBottom
          >
            {type == 'field' ? name : 'Hồ Sơ HLV'}
          </Typography>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <Grid className={classes.paper}>
              <div style={{ marginTop: 32 }}>
                <Carousel images={imagesCarousel}></Carousel>
              </div>
            </Grid>
            <FormInfo
              onChangeName={onChangeFieldImages}
              itemField={itemField}
              description={description}
              type={type}
              name={name}
              point={point}
              priceHLV={priceHLV}
            ></FormInfo>
          </Grid>
        </Grid>
    </>
  )
}
