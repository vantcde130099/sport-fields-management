import React from 'react'
import { Story, Meta } from '@storybook/react'

import { AppBar, Props } from '.'

export default {
  title: 'Header/AppBar',
  component: AppBar
} as Meta

const Template: Story<Props> = (args) => <AppBar {...args} />

export const Login = Template.bind({})
Login.args = {
  user: {
    name: 'Minh',
    img: 'https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-1-480x600.jpg',
    tel: '0923174331'
  }
}

export const Logout = Template.bind({})
Logout.args = {}
