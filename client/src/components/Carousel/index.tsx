import React from 'react'

//material-ui-carousel
import Carousel from 'react-material-ui-carousel'

//material-ui
import { Paper, Button } from '@material-ui/core'
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';

export interface Props {
  /**
   * Is this the principal call to action on the page?
   */
  images?: [],
  width?: any,
  height?: any,
  onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const CarouselMUI: React.FC<Props> = ({
  images,
  width, height
}) => {
  return (
    <div style={{ width: width, height: height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Carousel
        PrevIcon={<ArrowBackIos />}
        NextIcon={<ArrowForwardIos />}>
        {images?.map((item, index) => {
          return (
            <Paper style={{ width: width, height: height, borderRadius: '5px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundImage: `url('${item}')` }}>
            </Paper>
          )
        })}
      </Carousel>
    </div>

  )
}
