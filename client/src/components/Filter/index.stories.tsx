import React from 'react'
import { Story, Meta } from '@storybook/react'
import { SearchFilter as Search, Props } from '.'

export default {
  title: 'Search',
  component: Search,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta

const Template: Story<Props> = (args) => <Search {...args} />

export const SearchFilter = Template.bind({})

SearchFilter.args = {
  listCity: ['Đà Nẵng', 'Sài Gòn', 'Hà Nội'],
  listDistrict: ['Quận Hải Châu', 'Quận Cẩm Lệ' , 'Quận 12']
}
