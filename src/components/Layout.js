import React, { Component } from 'react'
import styled from 'styled-components'

import GlobalStyles from './GlobalStyles'
import Nav from './Nav'
import SideBar from './SideBar'
import { Checkbox, Label, themes } from './ThemeSwitcher'

const Article = styled.article`
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
  // padding-top: 1.3rem;

  @media (max-width: 45rem) {
    grid-column: 1 / 3;
  }
`

const Switcher = styled.div`
  float: right;
  margin-bottom: 1.25rem;
  padding-right: 1.5rem;
`

const Content = styled.div`
  float: left;
`

export default class Layout extends Component {
  constructor(props) {
    super(props)

    let theme = ''
    let checked = false

    switch (localStorage.getItem('theme')) {
      case 'light':
        theme = themes.light
        checked = false
        break
      case 'dark':
        theme = themes.dark
        checked = true
        break
      default:
        theme = themes.light
        checked = false
        break
    }

    this.state = {
      theme,
      checked
    }

    this.toggleTheme = this.toggleTheme.bind(this)
  }

  toggleTheme() {
    if (this.state.theme === themes.dark) {
      this.setState({ theme: themes.light, checked: false })
      localStorage.setItem('theme', 'light')
    } else {
      this.setState({ theme: themes.dark, checked: true })
      localStorage.setItem('theme', 'dark')
    }
  }

  render() {
    const { children, displayListPosts } = this.props

    return (
      <>
        <GlobalStyles {...this.state} />
        <Nav />
        <Article>
          <SideBar {...this.state} displayListPosts={displayListPosts} />
          <Main>
            <Switcher>
              <Checkbox
                type="checkbox"
                id="switch"
                defaultChecked={this.state.checked}
                onChange={this.toggleTheme}
              />
              <Label htmlFor="switch">Toggle</Label>
            </Switcher>
            <Content>{children}</Content>
          </Main>
        </Article>
      </>
    )
  }
}
