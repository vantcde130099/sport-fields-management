import React from 'react'
import { Story, Meta } from '@storybook/react'

import { FormComment, Props } from './index'

export default {
  title: 'CommentComponent/FormComment',
  component: FormComment,
} as Meta

const Template: Story<Props> = (args) => <FormComment {...args} />

export const Form = Template.bind({})

Form.args = {
  image : 'https://keomoi.com/wp-content/uploads/2019/05/gai-xinh-tap-gym-bikini.jpg'
  ,name : 'Nguyễn Hoàng Minh',
  id : 'C827755',
  instructions : [
    'Sản phẩm tuyệt cú mèo !' , " Ngon bỗ rẻ !" , "Dịch vụ đa dạng !"
  ]
}
