import {
  makeStyles,
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles'

export const useStyles = makeStyles({
  '@global': {
    '@keyframes fadeIn': {
      '0%': {
        opacity: 0
      },
      '100%': {
        opacity: 1
      }
    }
  },
  selector: {
    animation: 'fadeIn .5s ease-in-out' // --> this works
  },
  root: {
    maxWidth: 280,
    borderRadius: 9
  },
  hoverShowAll: {},
  customBox: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 1,
    wordBreak: 'break-all',
    overflow: 'hidden'
  },
  media: {
    '&:hover': {
      '& $contentMedia': {
        animation: '$fadeIn .6s ease-in-out',
        display: 'block'
      }
    },
    position: 'relative',
    height: 170
  },
  hoverDisabled: {},
  contentMedia: {
    display: 'none',
    boxSizing: 'border-box',
    padding: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: 'white'
  },
  content: {
    height: 75,
    fontWeight: 100,
    paddingTop: 10,
    paddingBottom: 10
  },
  button: {
    fontSize: 8,
    color: 'white',
    backgroundColor: '#F94949'
    // fontSize : "12px"
  },
  starIcon: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  costsButton: {
    color: '#F94949',
    fontWeight: 400,
    borderColor: '#F94949'
  },
  flexInline: {
    display: 'flex'
  },
  typographyContent: {
    fontWeight: 300,
    fontSize: 20
  },
  typographyDescription: {
    position: 'relative',
    fontWeight: 300
  }
})
