import React from 'react'

//component
import { AdviseButtons } from '../AdviseButtons';

//material-ui
import { Divider, Box, Button, ButtonBase, Grid, Paper, TextareaAutosize, Typography, ThemeProvider, MuiThemeProvider } from '@material-ui/core'
import { Rating } from '@material-ui/lab';

//styles
import { useStyles, theme } from './index.styles'

export interface Props {
  image?: string,
  id?: string,
  name?: string,
  instructions?: [],
}

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};
/**
 * Primary UI component for user interaction
 */
export const FormComment: React.FC<Props> = ({
  image, name, id, instructions
}) => {
  const classes = useStyles({
  })
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [lengthArea, setLengthArea] = React.useState(0);
  const [valueArea, setValueArea] = React.useState("");
  const [current, setCurrent] = React.useState([] as any)

  const changeSizeArea = (event: any) => {
    if (event.target.value.length <= 300) {
      setLengthArea(event.target.value.length);
      setValueArea(event.target.value)
    }
  }
  const valueCurrent = valueArea + current
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <Grid
          className={classes.contain}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >

          <Paper className={classes.paper} style={{ width: '100%' }}>
            <Typography variant="h5" gutterBottom style={{ width: '100%', textAlign: 'center' }}>
              Đánh giá
            </Typography>

            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src={image} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {name}
                    </Typography>
                    <Typography variant="body2" gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
                      <Rating
                        name="hover-feedback"
                        value={value}
                        size="large"
                        precision={0.5}
                        onChange={(event: any, newValue: any) => {
                          setValue(newValue);
                        }}
                        onChangeActive={(event: any, newHover: any) => {
                          setHover(newHover);
                        }}
                      />
                      {value !== null && <Box ml={2}>{(labels as any)[hover !== -1 ? hover : value]}</Box>}                </Typography>

                  </Grid>
                  <Grid item>
                    <AdviseButtons instructions={instructions}></AdviseButtons>
                  </Grid >
                  <Divider variant="middle" />

                  <Grid item>
                    <Typography variant="body2" color="textSecondary">
                      Ký tự đã nhập : {lengthArea}/300
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <TextareaAutosize value={valueArea} rowsMax={4} onChange={(e: any) => changeSizeArea(e)}
              aria-label="maximum height"
              placeholder="Bình Luận Tại Đây ......" rowsMin={4} style={{ width: '100%', height: "110px", marginTop: 8 }} />
            <Grid
              container
              justify="space-around"
              alignItems="center"
            >
              <Button variant="contained" style={{ marginTop: 16 }} color="primary">
                Đánh giá
              </Button>
            </Grid>
          </Paper>

        </Grid>
      </MuiThemeProvider>
    </>

  )
}
