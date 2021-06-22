import CardField from '.'
import { Story, Meta } from '@storybook/react'

export default {
  title: 'CommonComponent/CardFields',
  component: CardField
}

const Template = (args) => <CardField {...args}></CardField>

export const CardField1 = Template.bind({})
CardField1.args = {
  image:
    'https://htsport.vn/wp-content/uploads/2020/06/anh-bia-danh-sach-san-bong-o-quan-binh-tan.jpg',
  nameField: 'Sân Chuyên Nghiệp1',
  description:
    'Sân rộng rãi , đẹp đẽ thoáng mát , có phòng xông hơi , massages sau buổi tập , phòng livestream hút cần,.....',
  discount: 'GIẢM 30%',
  price: '300.000 VNĐ',
  address: '123 Phạm Ngũ Lão , Q. Ngũ Hành Sơn'
}
