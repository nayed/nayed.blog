import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Gloria+Hallelujah|Inconsolata|Montserrat');

  *,
  *::before,
  *::after {
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
  }

  html, body {
    height: 100%;
    font-family: 'Inconsolata', monospace;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  #___gatsby {
    height: 100%;
  }

  body.light,
  body.light .excerpt {
    background: #fffef8;
    color: #445566;
  }

  body.light h1 {
    color: #cc3355;
  }

  body.dark,
  body.dark .excerpt {
    background: #21374b;
    color: #a0a0a0;
  }

  body.dark h1 {
    color: #ffffff;
  }

  h1 {
    font-size: 2.55rem;
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
    font-family: 'Montserrat', sans-serif;
    margin-bottom: 0.5rem;
    margin-top: 0;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  main a {
    box-shadow: inset 0 0 0 rgba(250, 165, 0, 0);
    color: #00b1bb;
    padding: 0.3rem 0 0.2rem;
    transition: all 0.2s ease;
  }

  main a:hover {
    box-shadow: inset 0 -3px 0 #faa500;
    color: #faa500;
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
