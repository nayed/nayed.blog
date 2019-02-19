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

  @media (max-width: 45rem) {
    grid-column: 1 / 3;
  }
`

const Switcher = styled.div`
  float: right;
  height: 5rem;
  padding-right: 1.5rem;
`

const Content = styled.div`
  float: left;
`

export default class Layout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      checked: null,
      theme: null
    }
  }

  componentDidMount() {
    this.setState({ checked: window.__theme === 'dark', theme: window.__theme })

    window.__onThemeChange = () => {
      this.setState({
        checked: window.__theme === 'dark',
        theme: window.__theme
      })
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
            {this.state.checked !== null ? (
              <Switcher>
                <Checkbox
                  type="checkbox"
                  id="switch"
                  checked={this.state.checked}
                  onChange={e =>
                    window.__setPreferredTheme(
                      e.target.checked ? 'dark' : 'light'
                    )
                  }
                />
                <Label htmlFor="switch">Toggle</Label>
              </Switcher>
            ) : (
              <div style={{ height: '5rem' }} />
            )}
            <Content>{children}</Content>
          </Main>
        </Article>
      </>
    )
  }
}
