import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
  }

  html, body {
    height: 100%;
    font-family: 'Open Sans', serif;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  #___gatsby {
    height: 100%;
  }

  body {
    background-color: #fffef8;
    color: #445566;
  }

  h1 {
    color: #cc3355;
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
    font-family: 'Lora';
    margin-bottom: 0.5rem;
    margin-top: 0;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  main a {
    color: #00b1bb;
  }
  
  iframe {
    max-width: 90vw;
    width: 43rem !important;

    @media (max-width: 45rem) {
      width: 39rem !important;
    }
  }
`

export default GlobalStyles
