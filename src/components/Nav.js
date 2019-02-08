import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import avatar from '../images/nayed.svg'

const Nav = styled.nav`
  @media (min-width: 45rem) {
    display: none;
  }
`
const Img = styled.img`
  height: 2.5rem;
  padding: 0.5rem 1rem;
  vertical-align: middle;
`
const Span = styled.span`
  font-size: 1.5rem;
`

const Hr = styled.hr`
  margin: 0;
`

export default () => (
  <Nav>
    <Link to="/">
      <Img src={avatar} alt="nayed svg icon" />
      <Span>Nayed's blog</Span>
    </Link>
    <Hr />
  </Nav>
)
