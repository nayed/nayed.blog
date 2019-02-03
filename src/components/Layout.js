import React from 'react'
import styled from 'styled-components'

import GlobalStyles from './GlobalStyles'
import Nav from './Nav'
// import Footer from './Footer'
import SideBar from './SideBar'

const Layout = styled.article`
  display: grid;
  height: 100%;
  grid-template-columns: 23rem 1fr;
  grid-template-rows: 1fr;
  min-height: 100vh;
`

const Main = styled.main`
  // display: grid;
  font-size: 1.125rem;
  // grid-template-columns: 1fr 1fr 1fr;
  // grid-template-rows: max-content;
  line-height: 1.75;
  margin: 0 auto;
  max-width: 50rem;
  // padding: 2rem 4rem;
  padding-top: 1.3rem;

  @media (max-width: 45rem) {
    grid-column: 1 / 3;
  }

  // @media (min-width: 576px) {
  //   margin: 0 auto;
  //   max-width: 540px;
  // }
  //
  // @media (min-width: 768px) {
  //   margin: 0 auto;
  //   max-width: 720px;
  // }
  //
  // @media (min-width: 992px) {
  //   margin: 0 auto;
  //   max-width: 960px;
  // }
  //
  // @media (min-width: 1200px) {
  //   margin: 0 auto;
  //   max-width: 50rem;
  // }
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
