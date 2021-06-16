import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Button, ButtonProps } from './Button'

export default {
  title: 'CommonComponent/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Contained1 = Template.bind({})
Contained1.args = {
  variant: 'contained',
  label: 'Button',
  backgroundColor: '#F94949'
}
export const Contained2 = Template.bind({})
Contained2.args = {
  variant: 'contained',
  label: 'Button',
  backgroundColor: '#F2994A'
}
export const Outline = Template.bind({})
Outline.args = {
  variant: 'outlined',
  label: 'Button',
  backgroundColor: '#F94949'
}
export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}
export const SmallSize = Template.bind({})
SmallSize.args = {
  variant: 'outlined',
  size: 'small'
}
export const MediumSize = Template.bind({})
MediumSize.args = {
  variant: 'outlined',
  size: 'medium'
}
export const LargeSize = Template.bind({})
LargeSize.args = {
  variant: 'outlined',
  size: 'large'
}
