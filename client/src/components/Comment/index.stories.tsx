import React from 'react'

import { Story, Meta } from '@storybook/react'

import { Comment, Props } from './index'

export default {
  title: 'Comment',
  component: Comment
} as Meta

const Template: Story<Props> = (args) => <Comment {...args} />

export const CommentUser = Template.bind({})

CommentUser.args = {
  img: 'https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-1-480x600.jpg',
  comment:
    'Sân xịn đẹp đẽ , Chuyên nghiệp ,Sân xịn đẹp đẽ , Sân xịn đẹp đẽ , Sân xịn đẹp đẽ , ',
  name: 'Nguyễn Hoàng Minh',
  date: '11/5/1999',
  point: 4.5
}
