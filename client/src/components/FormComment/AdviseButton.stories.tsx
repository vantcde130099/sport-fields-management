import React from 'react'
import { Story, Meta } from '@storybook/react'

import { AdviseButtons, Props } from './AdviseButton'

export default {
  title: 'FormComment',
  component: AdviseButtons,
} as Meta

const Template: Story<Props> = (args) => <AdviseButtons {...args} />

export const ListButtonAdvise = Template.bind({})

ListButtonAdvise.args = {
  instructions : [
    'Sản phẩm tuyệt cú mèo !' , " Ngon bỗ rẻ !" , "Dịch vụ đa dạng !"
  ]
}
