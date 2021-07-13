import WebFont from 'webfontloader'
import { Fragment } from 'react'
import { CssBaseline, ThemeProvider, createMuiTheme } from '@material-ui/core'

import { Counter } from './components/Counter'

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

export const App = () => (
  <Fragment>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Counter />
    </ThemeProvider>
  </Fragment>
)
