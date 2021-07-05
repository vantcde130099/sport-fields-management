import WebFont from 'webfontloader'
import { Fragment } from 'react'
import { CssBaseline, ThemeProvider, createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Titillium'
  }
})

WebFont.load({
  google: {
    families: ['Titillium Web:300,400,700', 'sans-serif']
  },
  active: () => {
    console.log('All set!')
  }
})

const App = () => (
  <Fragment>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>Demo Workflow 2</h1>
    </ThemeProvider>
  </Fragment>
)

export default App
