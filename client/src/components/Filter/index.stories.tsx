import React from 'react'
import { Story, Meta } from '@storybook/react'

import { SearchFilter, Props } from '.'

export default {
  title: 'CommonComponent/Search',
  component: SearchFilter,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta

const Template: Story<Props> = (args) => <SearchFilter {...args} />

export const SearchFilter1 = Template.bind({})

SearchFilter1.args = {

}


