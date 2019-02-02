import React from 'react'
import styled from 'styled-components'
import { Scrollbars } from 'react-custom-scrollbars'
import About from './About'
import ListPosts from './ListPosts'

const SideBar = styled.aside`
  // grid-area: sidebar;
  // grid-column: 1 / 2;
  // grid-row: 1 / 1;

  @media (max-width: 48rem) {
    display: none;
  }
`

const Posts = styled(Scrollbars)`
  width: 22rem;
`

export default ({ displayListPosts }) => (
  <SideBar>
    <p>avatar</p>

    <Posts>
      <About />
      {displayListPosts && <ListPosts />}
    </Posts>
  </SideBar>
)
