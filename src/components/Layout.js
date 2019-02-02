import React from 'react'
import styled from 'styled-components'

import GlobalStyles from './GlobalStyles'
// import Nav from './Nav'
// import Footer from './Footer'
import SideBar from './SideBar'

const Layout = styled.article`
  display: grid;
  height: 100%;
  // grid-template-areas:
  //   'sidebar'
  //   'main';
  grid-template-columns: 23rem 1fr;
  grid-template-rows: 1fr;
  min-height: 100vh;
`

const Main = styled.main`
  // grid-area: main;
  // grid-column: 2 / 3;
  // grid-row: 1 / 2;
  // margin-left: auto;
  // margin-right: auto;

  // @media (min-width: 576px) {
  //   max-width: 540px;
  // }
  //
  // @media (min-width: 768px) {
  //   max-width: 720px;
  // }
  //
  // @media (min-width: 992px) {
  //   max-width: 960px;
  // }
  //
  // @media (min-width: 1200px) {
  //   max-width: 1140px;
  // }
`

export default ({ children, displayListPosts }) => (
  <>
    <GlobalStyles />
    <Layout>
      <SideBar displayListPosts={displayListPosts} />
      <Main>{children}</Main>
    </Layout>
  </>
)
