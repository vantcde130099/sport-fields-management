import React from 'react'

import { Story, Meta } from '@storybook/react'

import { Carousel, Props } from './Carousel'

export default {
  title: 'CardInfo/Carousel',
  component: Carousel,
} as Meta

const Template: Story<Props> = (args) => <Carousel {...args} />

export const CarouselField = Template.bind({})

CarouselField.args = {
  images: [
    'https://htsport.vn/wp-content/uploads/2020/06/anh-bia-danh-sach-san-bong-o-quan-binh-tan.jpg',
    'https://top10tphcm.com/wp-content/uploads/2020/12/San-bong-da-o-thu-duc-650x358.jpg'
  ]
}
