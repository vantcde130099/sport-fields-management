import React from 'react';
import { Story, Meta } from '@storybook/react';

import { TextInputField , TextInputFieldProps } from './TextInputField';

export default {
  title: 'CommonComponent/TextInputField',
  component: TextInputField,
  // argTypes: {
  //   name: { control: 'ti' }
  // }
} as Meta;

const Template: Story<TextInputFieldProps> = args => <TextInputField {...args} />;

export const TextInput = Template.bind({});
TextInput.args = {
    variant : 'outlined',
    name : "SelectField"
};



