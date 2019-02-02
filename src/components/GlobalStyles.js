import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  #___gatsby {
    height: 100%;
  }

  body {
    background-color: #FFFFFF;
  }

  h1 {
    color: #5B618A;
  }
`

export default GlobalStyles
