import React from 'react'
import { Story, Meta } from '@storybook/react'

import { UserSettings, Props } from './UserSettings'

export default {
  title: 'Header/UserSettings',
  component: UserSettings
} as Meta

const Template: Story<Props> = (args) => <UserSettings {...args} />

export const Popup = Template.bind({})
Popup.args = {
  isMenuOpen: true,
  name: 'Minh',
  img: 'https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-1-480x600.jpg',
  tel: '0923174331'
}
