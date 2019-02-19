import React from 'react'
import styled from 'styled-components'

import githubIcon from '../images/github.svg'

const size = '1.05rem'

const Footer = styled.footer`
  font-size: ${size};
  grid-column: 2 / 3;
  margin: 2.5rem 0 1.5rem 0;
  text-align: center;

  @media (max-width: 45rem) {
    grid-column: 1 / 3;
  }
`

const A = styled.a`
  &:hover {
    color: #ffa500;
  }
`

const Github = styled.img`
  height: ${size};
`

export default () => (
  <Footer>
    Copyright © 2019 · <A href="https://nayed.io">Nayed Saïd Ali </A> ·{' '}
    <a href="https://github.com/nayed">
      <Github src={githubIcon} alt="github icon" />
    </a>
  </Footer>
)
