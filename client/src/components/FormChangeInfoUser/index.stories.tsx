import React from 'react'

import { Story, Meta } from '@storybook/react'

import { FormChangeInfoUser, Props } from './index'

export default {
  title: 'FormChangeInfoUser',
  component: FormChangeInfoUser
} as Meta

const Template: Story<Props> = (args) => <FormChangeInfoUser {...args} />

export const Form = Template.bind({})

Form.args = {
  email : 'minhnhde130140@fpt.edu.vn',
  firstName : 'Hoang' , 
  lastName : 'Minh' ,
  phoneNumber : '0923174331',
  city :'Da Nang',
  district : 'Hai Chau',
  ward : '24 Nguyen Dinh Chieu'
}
