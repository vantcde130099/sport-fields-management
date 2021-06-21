import React from 'react';
import { Story, Meta } from '@storybook/react';

import { AppBarHeader, AppBarHeaderProps } from './AppBarHeader';

export default {
  title: 'CommonComponent/Header',
  component: AppBarHeader,
} as Meta;

const Template: Story<AppBarHeaderProps> = (args) => <AppBarHeader {...args} />;

export const HeaderLogin = Template.bind({});
HeaderLogin.args = {
    user: {
      name : "Minh",
      img : "https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-1-480x600.jpg"
      ,tel : "0923174331"
    }
};
 
export const HeaderLogout = Template.bind({});
HeaderLogout.args = {
};
