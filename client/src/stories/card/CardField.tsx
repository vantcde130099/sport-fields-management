import React, { Component, useState } from 'react'
import { makeStyles ,ThemeProvider , createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {StarIcon} from '../Icon/StarIcon'
import Box from '@material-ui/core/Box';

export interface CardProps {
  image : String,
  nameField : String,
  description : String,
  discount : String,
  price : String,
  address : String,
  point : number , 
  onClick?: () => void;
}

const useStyles = makeStyles({
  "@global": {
    "@keyframes fadeIn": {
      "0%": {
        opacity: 0,
      },
      "100%": {
        opacity: 1,
      }
    }
  },
  selector: {
    animation: "fadeIn .5s ease-in-out" // --> this works
  },
  root: {
    maxWidth: 280,
    borderRadius : 9,
  },
  hoverShowAll:{

  },
  customBox: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    wordBreak: "break-all",
    overflow: "hidden"
  },
  media: {
    '&:hover':{
      "& $contentMedia" : {
        animation: "$fadeIn .6s ease-in-out",
        display : "block",
      },
    },
    position :"relative",
    height: 190,
  },
  hoverDisabled :{
  },
  contentMedia :{
    display : "none",
    boxSizing : "border-box",
    padding : 5,
    position : "absolute",
    bottom : 0 ,
    left : 0,
    width : '100%',
    backgroundColor :'rgba(0, 0, 0, 0.3)',
    color :"white", 
  }
  ,
  content:{
    height : 90,
    fontWeight : 100,
  },
  button: {
    fontSize : 8,
    color : 'white',
    backgroundColor : "#F94949",
    // fontSize : "12px"
  },
  starIcon:{
    position : "absolute"
    ,top : 0 
    , right : 0
  },
  costsButton : {
    color: '#F94949',
    fontWeight : 400,
    borderColor : '#F94949'
  },
  flexInline : {
    display : "flex"
  },
  typographyContent :{
    fontWeight : 450,
    fontSize : 22
  },
  typographyDescription :{
    position : "relative",
    fontWeight: 300 ,
  },
});

export const CardField : React.FC<CardProps> = ({image = "https://htsport.vn/wp-content/uploads/2020/06/anh-bia-danh-sach-san-bong-o-quan-binh-tan.jpg",
nameField = "Sân Chuyên Nghiệp",
description = "Sân rộng rãi , đẹp đẽ thoáng mát , có phòng xông hơi , massages sau buổi tập , phòng livestream hút cần,.....",
discount = "GIẢM 30%",
price = "300.000 VNĐ",
address = "123 Phạm Ngũ Lão , Q. Ngũ Hành Sơn",
point = 5}) => {
  const classes = useStyles();
//   const [image, setImage] = useState("https://htsport.vn/wp-content/uploads/2020/06/anh-bia-danh-sach-san-bong-o-quan-binh-tan.jpg");
//   const [nameField, setNameField] = useState("Sân Chuyên Nghiệp")
//   const [description, setDescription] = useState("Sân rộng rãi , đẹp đẽ thoáng mát , có phòng xông hơi , massages sau buổi tập , phòng livestream hút cần,.....")
//   const [discount, setDiscount] = useState("GIẢM 30%");
//   const [price, setPrice] = useState("300.000 VNĐ");
//   const [address, setAddress] = useState("123 Phạm Ngũ Lão , Q. Ngũ Hành Sơn");
  return (
    <Card className={classes.root} >
      <CardActionArea className = {classes.hoverShowAll}>
        <CardMedia
          className={classes.media}
          image={`${image}`}
          title="Contemplative Reptile"
        >
        <Paper className = {classes.contentMedia}>
        <Typography variant="body2" component="p" className = {classes.typographyDescription} noWrap> 
        <StarIcon point ={5} ></StarIcon>
        {nameField}  
        <br></br>
        Đường : {address}
       </Typography>
        </Paper>
        </CardMedia>
        </CardActionArea>
        <CardContent className ={`${classes.content} ${classes.hoverDisabled}`}>
          <Typography gutterBottom variant="h5" component="h2" className = {classes.typographyContent} noWrap>
            {nameField}
            <br></br>
            <Button className={`${classes.typographyDescription} , ${classes.hoverDisabled}`} variant="contained" size="small" color = "secondary">
              {discount}
            </Button>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div" className = {`${classes.typographyDescription} , ${classes.customBox}`}  >
            {description}
          </Typography>
        </CardContent>

       <CardActions>
         <Button size="small" className= {classes.costsButton} variant = "outlined"  color="secondary" >
             {price}
           </Button>

       </CardActions>
    </Card>
  );
}


export default CardField