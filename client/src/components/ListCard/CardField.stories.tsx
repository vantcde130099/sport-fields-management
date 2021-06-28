import CardField from './CardField'

export default {
  title : 'CardList',
  component: CardField
}

const Template = (args) => <CardField {...args}></CardField>

export const Card = Template.bind({})
Card.args = {
  item : {
  image:
    'https://htsport.vn/wp-content/uploads/2020/06/anh-bia-danh-sach-san-bong-o-quan-binh-tan.jpg',
  nameField: 'Sân Chuyên Nghiệp',
  description:
    'Sân rộng rãi , đẹp đẽ thoáng mát , có phòng xông hơi , massages sau buổi tập , phòng livestream hút cần,.....',
  discount: 30,
  price: '300.000 VNĐ',
  address: '123 Phạm Ngũ Lão , Q. Ngũ Hành Sơn',
  point : 3.6
}
}