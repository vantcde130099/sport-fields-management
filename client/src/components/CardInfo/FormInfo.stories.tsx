import React from 'react'

import { Story, Meta } from '@storybook/react'

import { FormInfo, Props } from './FormInfo'

export default {
  title: 'CardInfo/FormInfo',
  component: FormInfo,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta

const Template: Story<Props> = (args) => <FormInfo {...args} />

export const CardField = Template.bind({})

CardField.args = {
  itemField: [
    {
      id: 1,
      name: 'sân 5c',
      type: 'sân 7 người',
      price: '500.000 VNĐ'
    },
    {
      id: 1,
      name: 'sân 6c',
      type: 'sân 9 người',
      price: '700.000 VNĐ'
    },
    {
      id: 1,
      name: 'sân 7c',
      type: 'sân 11 người',
      price: '900.000 VNĐ'
    },
  ],
  name: "Sân Chuyên Nghiệp"
  ,
  description:
    'Sân rộng rãi , đẹp đẽ thoáng mát , có phòng xông hơi , massages sau buổi tập , phòng livestream hút cần,.....',
  images: [
    "https://htsport.vn/wp-content/uploads/2020/06/anh-bia-danh-sach-san-bong-o-quan-binh-tan.jpg"
    , "https://top10tphcm.com/wp-content/uploads/2020/12/San-bong-da-o-thu-duc-650x358.jpg"

  ],
  point: 4.6
  ,
  type: 'field'
}

export const CardHLV = Template.bind({})

CardHLV.args = {
  name: "Mèo Con Đi Lạc"
  ,
  description:
    'Đã Cùng với đội tuyển Việt Nam Vô địch worldcup năm 2024 .',
  images: [
    "https://i.pinimg.com/736x/7d/e9/99/7de9996cfc1d9f1092258d83ce0326bf.jpg"
    , "https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-1-480x600.jpg"

  ],
  priceHLV: '500.000 VNĐ',
  point: 4.6,
  type: "coach"
}