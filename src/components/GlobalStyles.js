import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  html, body {
    height: 100%;
    font-family: 'Lato', serif;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  #___gatsby {
    height: 100%;
  }

  body {
    background-color: #FFFFFF;
  }

  h1 {
    font-family: 'Lora', serif;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.75rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  h5 {
    font-size: 1.25rem;
  }

  h6 {
    font-size: 1rem;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.5rem;
    margin-top: 0;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }
  
  iframe {
    max-width: 90vw;
    width: 48rem !important;
  }
`

export default GlobalStyles
