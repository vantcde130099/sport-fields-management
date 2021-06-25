import React from 'react'
import { Story, Meta } from '@storybook/react'

import { CarouselMUI, Props } from './index'

export default {
  title: 'CommonComponent/Carousel',
  component: CarouselMUI,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta

const Template: Story<Props> = (args) => <CarouselMUI {...args} />

export const CarouselMUI1 = Template.bind({})

CarouselMUI1.args = {
  images: [
    "https://htsport.vn/wp-content/uploads/2020/06/anh-bia-danh-sach-san-bong-o-quan-binh-tan.jpg"
    , "https://top10tphcm.com/wp-content/uploads/2020/12/San-bong-da-o-thu-duc-650x358.jpg"
  ],
  width: '400px', height: '300px'
}
