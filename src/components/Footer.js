import React from 'react'
import styled from 'styled-components'

import { mainMw } from './GlobalStyles.js'

import githubIcon from '../images/github.svg'

const size = '1.05rem'

const Footer = styled.footer`
  font-size: ${size};
  grid-column: 2 / 3;
  margin: 2.5rem 0 1.5rem 0;
  text-align: center;

  @media (max-width: ${mainMw}) {
    grid-column: 1 / 3;
  }
`

const A = styled.a`
  padding: 0.3rem 0 0.2rem;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: inset 0 -3px 0 var(--main-a-fc-hover);
    color: var(--main-a-fc-hover);
  }
`

const Github = styled.img`
  height: ${size};
`

export default () => (
  <Footer>
    Copyright © 2019 ·{' '}
    <A href="https://nayed.io" target="_blank" rel="noopener noreferrer">
      Nayed Saïd Ali
    </A>{' '}
    ·{' '}
    <a
      href="https://github.com/nayed"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Github src={githubIcon} alt="github icon" />
    </a>{' '}
    ·{' '}
    <A href="/rss.xml" target="_blank" rel="noopener noreferrer">
      rss
    </A>
  </Footer>
)
