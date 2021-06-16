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
    user: {}
};

export const HeaderLogout = Template.bind({});
HeaderLogout.args = {
};
