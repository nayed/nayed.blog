import { createGlobalStyle } from 'styled-components'

// because we can't use css var in @media queries
export const mainMw = '44rem'
export const sbMw = '20rem'

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Gloria+Hallelujah|Inconsolata|Karla');

  :root {
    --dark-bg: #282c35;
    --dark-fc: #a9a9a9;
    --light-bg: #fffef8;
    --light-fc: #445566;
    --main-a-fc: #00b1bb;
    --main-a-fc-hover: #faa500;
    --main-fs: 1.2rem;
    --main-mw: ${mainMw};
    --sb-mw: ${sbMw};
  }

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
    background: var(--light-bg);
    color: var(--light-fc);
  }

  body.light h1 {
    color: #cc3355;
  }

  body.dark,
  body.dark .excerpt {
    background: var(--dark-bg);
    color: var(--dark-fc);
  }

  body.dark h1 {
    color: #ffffff;
  }

  h1 {
    font-size: 2.75rem;
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
    font-family: 'Karla', sans-serif;
    margin-bottom: 0.5rem;
    margin-top: 0;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  main {
    a {
      color: var(--main-a-fc);
      padding: 0.3rem 0 0.2rem;
      transition: all 0.2s ease;

      &:hover {
        box-shadow: inset 0 -3px 0 var(--main-a-fc-hover);
        color: var(--main-a-fc-hover);
      }
    }
  }

  iframe {
    max-width: 90vw;
    width: 43rem !important;

    @media (max-width: ${mainMw}) {
      width: 39rem !important;
    }
  }
`

export default GlobalStyles
