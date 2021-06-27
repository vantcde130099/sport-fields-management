import React from 'react'
import { Story, Meta } from '@storybook/react'

import { AdviseButtons, Props } from './index'

export default {
  title: 'CommentComponent/AdviseButton',
  component: AdviseButtons,
} as Meta

const Template: Story<Props> = (args) => <AdviseButtons {...args} />

export const Advise = Template.bind({})

Advise.args = {
  instructions : [
    'Sản phẩm tuyệt cú mèo !' , " Ngon bỗ rẻ !" , "Dịch vụ đa dạng !"
  ]
}
