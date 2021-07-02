import React from 'react'

//carousel-responsive
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as CarouselComponent } from 'react-responsive-carousel';

//material-ui
import { Paper } from '@material-ui/core'

export interface Props {

  images?: [],
}


export const Carousel: React.FC<Props> = ({
  images,
}) => {
  return (
    <Paper style={{ maxWidth: '400px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CarouselComponent showThumbs = {false}>
        {images?.map((item, index) => {
          return (
                    <img src= {item}  style = {{borderRadius : 5,width : '100%' , height : '350px',objectFit : 'cover'}}/>
          )
        })}
      </CarouselComponent>
    </Paper>

  )
}
