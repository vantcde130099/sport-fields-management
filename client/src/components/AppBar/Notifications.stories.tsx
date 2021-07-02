import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Notifications, Props } from './Notifications'

export default {
  title: 'Header/Notifications',
  component: Notifications
} as Meta

const Template: Story<Props> = (args) => <Notifications {...args} />

export const Popup = Template.bind({})
Popup.args = {
  isMenuOpen: true,
  image:
    'https://scontent.fhan2-3.fna.fbcdn.net/v/t1.15752-9/186166767_873508483198315_7845554615604546962_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=ae9488&_nc_ohc=iGf1uc_PN2sAX_zaAOx&_nc_ht=scontent.fhan2-3.fna&oh=2e3b8c4de9e6f772016ed6b51205be05&oe=60D0A454',
  listItem: [
    {
      id: '1',
      title: 'mã đơn hàng : BK10001',
      description: 'Bạn đã đặt thành công'
    },
    {
      id: '1',
      title: 'mã đơn hàng : BK10001',
      description: 'Bạn đã đặt thành công'
    },
    {
      id: '1',
      title: 'mã đơn hàng : BK10001',
      description: 'Bạn đã đặt thành công'
    },
    {
      id: '1',
      title: 'mã đơn hàng : BK10001',
      description: 'Bạn đã đặt thành công',
      cardState: 'wait'
    },
    {
      id: '1',
      title: 'mã đơn hàng : BK10001',
      description: 'Bạn đã đặt thành công',
      cardState: ''
    },
    {
      id: '1',
      title: 'mã đơn hàng : BK10001',
      description: 'Bạn đã đặt thành công'
    },
    {
      id: '1',
      title: 'mã đơn hàng : BK10001',
      description: 'Bạn đã đặt thành công'
    },
    {
      id: '1',
      title: 'mã đơn hàng : BK10001',
      description: 'Bạn đã đặt thành công'
    },
    {
      id: '1',
      title: 'mã đơn hàng : BK10001',
      description: 'Bạn đã đặt thành công'
    },
    {
      id: '1',
      title: 'mã đơn hàng : BK10001',
      description: 'Bạn đã đặt thành công'
    }
  ]
}
