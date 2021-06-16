import React from 'react';
import { Story, Meta } from '@storybook/react';
import {ListItemNotificationUser,ListItemNotificationUserProps} from './ListItemNotificationUser'
export default {
  title: 'CommonComponent/Notification/ListItemCart',
  component: ListItemNotificationUser,
//   argTypes: {
//     backgroundColor: { control: 'color' }
//   }
} as Meta;

const Template: Story<ListItemNotificationUserProps> = args => <ListItemNotificationUser {...args} />;

export const ItemUser = Template.bind({});
ItemUser.args = {
    isMenuOpen : true,
};


