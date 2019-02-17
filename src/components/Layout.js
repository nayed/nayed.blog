import React, { Component } from 'react'
import styled from 'styled-components'

import GlobalStyles from './GlobalStyles'
import Nav from './Nav'
import SideBar from './SideBar'
import { Checkbox, Label } from './ThemeSwitcher'

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

    const windowGlobal = typeof window !== 'undefined' && window

    this.state = {
      checked:
        typeof windowGlobal.document !== 'undefined' &&
        windowGlobal.document.body.className === 'dark'
          ? true
          : false,
      theme:
        typeof windowGlobal.document !== 'undefined' &&
        windowGlobal.document.body.className === 'dark'
          ? 'dark'
          : 'light'
    }

    this.toggleTheme = this.toggleTheme.bind(this)
  }

  componentDidMount() {
    this.setState(state => ({
      checked: document.body.className === 'dark' ? true : false,
      theme: document.body.className === 'dark' ? 'dark' : 'light'
    }))
  }

  toggleTheme() {
    if (document.body.className === 'dark') {
      this.setState({ theme: 'light', checked: false })
      localStorage.setItem('theme', 'light')
      document.body.className = 'light'
    } else {
      this.setState({ theme: 'dark', checked: true })
      localStorage.setItem('theme', 'dark')
      document.body.className = 'dark'
    }
  }

  render() {
    const { children, displayListPosts } = this.props

    return (
      <>
        <GlobalStyles />
        <Nav />
        <Article>
          <SideBar
            displayListPosts={displayListPosts}
            theme={this.state.theme}
          />
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
