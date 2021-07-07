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

enum Type {
  Coach = 'coach',
  Field = 'field'
}

export interface Props {
  description?: string
  type?: Type
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
}: Props) => {
  //style
  const classes = useStyles()

  //state
  const [imagesCarousel, setImagesCarousel] = React.useState(
    type === Type.Field ? itemFields?.[0]?.images : imagesCoach
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
        {type === Type.Field ? name : 'Hồ Sơ HLV'}
      </Typography>
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid className={classes.paper}>
          <Grid style={{ marginTop: 32 }}>
            <Carousel images={imagesCarousel} />
          </Grid>
        </Grid>
        <FormInfo
          onChangeName={onChangeFieldImages}
          itemFields={itemFields}
          description={description}
          type={type}
          name={name}
          point={point}
          priceCoach={priceCoach}
        />
      </Grid>
    </Grid>
  )
}
