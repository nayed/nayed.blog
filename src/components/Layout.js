import React from 'react'
import styled from 'styled-components'

import GlobalStyles from './GlobalStyles'
import Nav from './Nav'
import SideBar from './SideBar'

const Layout = styled.article`
  display: grid;
  height: 100%;
  grid-template-columns: 20rem 1fr;
  grid-template-rows: 1fr;
  min-height: 100vh;
`

const Main = styled.main`
  font-size: 1.125rem;
  grid-column: 2 / 3;
  line-height: 1.75;
  margin: 0 auto;
  max-width: 45rem;
  padding-top: 1.3rem;

  @media (max-width: 45rem) {
    grid-column: 1 / 3;
  }
`

export default ({ children, displayListPosts }) => (
  <>
    <GlobalStyles />
    <Nav />
    <Layout>
      <SideBar displayListPosts={displayListPosts} />
      <Main>{children}</Main>
    </Layout>
  </>
)
