import { createGlobalStyle } from 'styled-components'

// because we can't use css var in @media queries
export const mainMw = '47rem'
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

    h1 {
      color: #cc3355;
    }
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

  body.light div[class^='blog-post'] a,
  body.light div[class*=' blog-post'] a {
    background: rgba(25,235,59,0.5);
    padding: 0.15rem 0.4rem;
  }

  body.light div[class^='blog-post'] .gatsby-resp-image-link {
    padding: 0;
  }

  body.dark div[class^='blog-post'] a,
  body.dark div[class*=' blog-post'] a {
    background: rgba(72, 184, 208, 0.8);
    color: rgba(255, 255, 255, 0.7);
    padding: 0.15rem 0.4rem;
  }

    body.dark div[class^='blog-post'] .gatsby-resp-image-link {
    padding: 0;
  }


  iframe {
    max-width: 90vw;
    width: 43rem !important;

    @media (max-width: ${mainMw}) {
      width: 39rem !important;
    }
  }

  p > img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
  }

  .draft,
  .draft a > h5,
  .draft a p,
  .draft a > h1 {
    background: #000000 !important;
    color: #ffffff !important;
  }
`

export default GlobalStyles
