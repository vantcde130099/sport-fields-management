import React from 'react'
import { Story, Meta } from '@storybook/react'
import {
  ListItemNotification,
  ListItemNotificationProps
} from './ListItemNotification'
export default {
  title: 'Notification/NotificationBell',
  component: ListItemNotification
} as Meta

const Template: Story<ListItemNotificationProps> = (args) => (
  <ListItemNotification {...args} />
)

export const ItemBell = Template.bind({})
ItemBell.args = {
  isMenuOpen: true
}
