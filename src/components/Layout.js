import React, { Component } from 'react'
import styled from 'styled-components'

import GlobalStyles, { mainMw } from './GlobalStyles'
import Nav from './Nav'
import SideBar from './SideBar'
import { Checkbox, Label } from './ThemeSwitcher'
import Footer from './Footer'

const Article = styled.article`
  display: grid;
  height: 100%;
  grid-template-columns: var(--sb-mw) 1fr;
  grid-template-rows: 1fr;
  min-height: 100vh;
`

const Main = styled.main`
  font-size: var(--main-fs);
  grid-column: 2 / 3;
  line-height: 1.45;
  margin: 0 auto;
  max-width: var(--main-mw);
  padding: 0 1rem;

  @media (max-width: ${mainMw}) {
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
    const { children, displayListPosts, location } = this.props

    return (
      <>
        <GlobalStyles />
        <Nav />
        <Article>
          <SideBar
            displayListPosts={displayListPosts}
            location={location}
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
          <Footer />
        </Article>
      </>
    )
  }
}
