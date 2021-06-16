import React from 'react';
import { Story, Meta } from '@storybook/react';

// import { Button, ButtonProps } from './Button';
import {ListItemNotification,ListItemNotificationProps} from './ListItemNotification'
export default {
  title: 'CommonComponent/Notification/ListItemCart',
  component: ListItemNotification,
//   argTypes: {
//     backgroundColor: { control: 'color' }
//   }
} as Meta;

const Template: Story<ListItemNotificationProps> = args => <ListItemNotification {...args} />;

export const ItemCart = Template.bind({});
ItemCart.args = {
    typeList : 'cart',
    isMenuOpen : true,
};
export const ItemBell = Template.bind({});
ItemBell.args = {
    typeList : 'notification',
    isMenuOpen : true,
};

