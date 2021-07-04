import React from 'react'

import { Story, Meta } from '@storybook/react'

import { ListCoupon as ListCouponComponent, Props } from './index'

export default {
  title: 'ListCoupon',
  component: ListCouponComponent,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta

const Template: Story<Props> = (args) => <ListCouponComponent {...args} />

export const ListCoupon = Template.bind({})

ListCoupon.args = {
  listCoupon: [
    {
      id: 'VC1010155',
      code: '50 Daily',
      dateClose: '11/5/1999',
      discount: 40
    },
    {
      id: 'VC1010155',
      code: '50 Daily',
      dateClose: '11/5/1999',
      discount: 40
    },
    {
      id: 'VC1010155',
      code: '50 Daily',
      dateClose: '11/5/1999',
      discount: 40
    }
  ]
}
