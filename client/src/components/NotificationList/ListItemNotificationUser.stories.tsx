import React from 'react'
import { Story, Meta } from '@storybook/react'
import {
  ListItemNotificationUser,
  ListItemNotificationUserProps
} from './ListItemNotificationUser'
export default {
  title: 'Notification/ListItemCart',
  component: ListItemNotificationUser
} as Meta

const Template: Story<ListItemNotificationUserProps> = (args) => (
  <ListItemNotificationUser {...args} />
)

export const ItemUser = Template.bind({})
ItemUser.args = {
  isMenuOpen: true,
  name: 'Minh',
  img: 'https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-1-480x600.jpg',
  tel: '0923174331'
}
