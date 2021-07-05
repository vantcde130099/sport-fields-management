import React from 'react'

//Component
import { Carousel } from './Carousel'
import { FormInfo } from './FormInfo'

//Material-ui
import { Typography, Grid } from '@material-ui/core'

//Styles
import { useStyles } from './index.styles'

interface ItemField {
  id: string
  name: string
  type: string
  price: string
  images: string[]
}

enum type {
  Coach = 'coach',
  Field = 'field'
}

export interface Props {
  description?: string
  type?: type
  name?: string
  point?: number
  //only used for type = field
  itemFields?: ItemField[]
  //only used for type =  coach
  imagesCoach?: []
  priceCoach?: string
}
/**
 * Primary UI component for user interaction
 */
export const CardInfo: React.FC<Props> = ({
  itemFields,
  description,
  imagesCoach,
  name,
  point,
  type,
  priceCoach
}) => {
  //style
  const classes = useStyles()

  //state
  const [imagesCarousel, setImagesCarousel] = React.useState(
    type == 'field' ? itemFields?.[0]?.images : imagesCoach
  )

  //function when change field  ( only used for type = 'field' )
  const onChangeFieldImages = (value: number) => {
    const images = itemFields?.[value]?.images
    setImagesCarousel(images)
  }

  //render
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Typography
        variant="h5"
        className={classes.formControl}
        style={{ fontSize: 32, width: 'auto' }}
        gutterBottom
      >
        {type == 'field' ? name : 'Hồ Sơ HLV'}
      </Typography>
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid className={classes.paper}>
          <div style={{ marginTop: 32 }}>
            <Carousel images={imagesCarousel}></Carousel>
          </div>
        </Grid>
        <FormInfo
          onChangeName={onChangeFieldImages}
          itemFields={itemFields}
          description={description}
          type={type}
          name={name}
          point={point}
          priceCoach={priceCoach}
        ></FormInfo>
      </Grid>
    </Grid>
  )
}
