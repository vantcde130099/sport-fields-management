import { Coupon as CouponComponent } from './Coupon'

export default {
  title: 'ListCoupon',
  component: CouponComponent
}

const Template = (args) => <CouponComponent {...args}></CouponComponent>

export const Coupon = Template.bind({})
Coupon.args = {
  coupon: {
    id: 'VC1010155',
    code: '50 Daily',
    dateClose: '11/5/1999',
    discount: 40
  }
}
