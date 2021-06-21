import React, { Component, useState } from 'react'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Paper
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { useStyles } from './CardField.styles'

export interface CardProps {
  item?: {
    image?: any
    nameField?: String
    discount?: String
    description?: String
    price?: String
    address?: String
    point?: any
  }
  onClick?: () => void
}

export const CardField: React.FC<CardProps> = ({
  item = {
    image:
      'https://htsport.vn/wp-content/uploads/2020/06/anh-bia-danh-sach-san-bong-o-quan-binh-tan.jpg',
    nameField: 'Sân Chuyên Nghiệp',
    description:
      'Sân rộng rãi , đẹp đẽ thoáng mát , có phòng xông hơi , massages sau buổi tập , phòng livestream hút cần,.....',
    discount: 'GIẢM 30%',
    price: '300.000 VNĐ',
    address: '123 Phạm Ngũ Lão , Q. Ngũ Hành Sơn',
    point: 4.6
  }
}) => {
  const classes = useStyles()
  //   const [image, setImage] = useState("https://htsport.vn/wp-content/uploads/2020/06/anh-bia-danh-sach-san-bong-o-quan-binh-tan.jpg");
  //   const [nameField, setNameField] = useState("Sân Chuyên Nghiệp")
  //   const [description, setDescription] = useState("Sân rộng rãi , đẹp đẽ thoáng mát , có phòng xông hơi , massages sau buổi tập , phòng livestream hút cần,.....")
  //   const [discount, setDiscount] = useState("GIẢM 30%");
  //   const [price, setPrice] = useState("300.000 VNĐ");
  //   const [address, setAddress] = useState("123 Phạm Ngũ Lão , Q. Ngũ Hành Sơn");
  const { image, nameField, description, discount, price, address, point } =
    item

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.hoverShowAll}>
        <CardMedia
          className={classes.media}
          image={image}
          title="Select To Card"
        >
          <Paper className={classes.contentMedia}>
            <Typography
              variant="body2"
              component="p"
              className={classes.typographyDescription}
              noWrap
            >
              {nameField}
              <br></br>
              Đường : {address}
            </Typography>
          </Paper>
        </CardMedia>
      </CardActionArea>
      <CardContent className={`${classes.content} ${classes.hoverDisabled}`}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={classes.typographyContent}
          noWrap
        >
          {nameField}
          <div>
            <Button
              className={`${classes.typographyDescription} , ${classes.hoverDisabled}`}
              style={{ fontSize: 10 }}
              variant="contained"
              size="small"
              color="secondary"
            >
              {discount}
            </Button>
          </div>
        </Typography>
        <Typography
          variant="body2"
          style={{ fontSize: 12 }}
          color="textSecondary"
          component="div"
          className={`${classes.typographyDescription} , ${classes.customBox}`}
        >
          {description}
        </Typography>
      </CardContent>

      <CardActions>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <Button
            size="small"
            className={classes.costsButton}
            style={{ fontSize: 12 }}
            variant="outlined"
            color="secondary"
          >
            {price}
          </Button>
          <Rating
            name="half-rating-read"
            defaultValue={point}
            precision={0.01}
            readOnly
          />
        </div>
      </CardActions>
    </Card>
  )
}

export default CardField
