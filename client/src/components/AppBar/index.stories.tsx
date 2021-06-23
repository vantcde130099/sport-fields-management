import React from 'react'
import { Story, Meta } from '@storybook/react'

import { AppBar, AppBarProps } from '.'

export default {
  title: 'Header',
  component: AppBar
} as Meta

const Template: Story<AppBarProps> = (args) => <AppBar {...args} />

export const HeaderLogin = Template.bind({})
HeaderLogin.args = {
  user: {
    name: 'Minh',
    img: 'https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-1-480x600.jpg',
    tel: '0923174331'
  }
}

export const HeaderLogout = Template.bind({})
HeaderLogout.args = {}
