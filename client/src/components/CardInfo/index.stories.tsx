import React from 'react'

import { Story, Meta } from '@storybook/react'

import { CardInfo, Props } from './index'

export default {
  title: 'CardInfo',
  component: CardInfo,
} as Meta

const Template: Story<Props> = (args) => <CardInfo {...args} />

export const CardField = Template.bind({})

CardField.args = {
  itemFields: [
    {
      id: 1,
      name: 'sân 5c',
      type: 'sân 7 người',
      price: '500.000 VNĐ',
      images: [
        'https://htsport.vn/wp-content/uploads/2020/06/anh-bia-danh-sach-san-bong-o-quan-binh-tan.jpg',
        'https://top10tphcm.com/wp-content/uploads/2020/12/San-bong-da-o-thu-duc-650x358.jpg'
      ]
    },
    {
      id: 1,
      name: 'sân 6c',
      type: 'sân 9 người',
      price: '700.000 VNĐ',
      images: [
        'https://htsport.vn/wp-content/uploads/2020/06/anh-bia-danh-sach-san-bong-o-quan-binh-tan.jpg',
        'https://top10tphcm.com/wp-content/uploads/2020/12/San-bong-da-o-thu-duc-650x358.jpg'
      ]
    },
    {
      id: 1,
      name: 'sân 7c',
      type: 'sân 11 người',
      price: '900.000 VNĐ',
      images: [
        'https://htsport.vn/wp-content/uploads/2020/06/anh-bia-danh-sach-san-bong-o-quan-binh-tan.jpg',
        'https://top10tphcm.com/wp-content/uploads/2020/12/San-bong-da-o-thu-duc-650x358.jpg',
        'https://i.pinimg.com/736x/7d/e9/99/7de9996cfc1d9f1092258d83ce0326bf.jpg'
      ]
    }
  ],
  name: 'Sân Chuyên Nghiệp',
  description:
    'Sân rộng rãi , đẹp đẽ thoáng mát , có phòng xông hơi , massages sau buổi tập , phòng livestream hút cần,.....',

  point: 4.6,
  type: 'field'
}

export const CardCoach = Template.bind({})

CardCoach.args = {
  name: 'Mèo Con Đi Lạc',
  description: 'Đã Cùng với đội tuyển Việt Nam Vô địch worldcup năm 2024 .',
  imagesCoach: [
    'https://i.pinimg.com/736x/7d/e9/99/7de9996cfc1d9f1092258d83ce0326bf.jpg',
    'https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-1-480x600.jpg'
  ],
  priceCoach: '500.000 VNĐ',
  point: 4.6,
  type: 'coach'
}
