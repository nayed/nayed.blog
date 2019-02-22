import React, { Component } from 'react'
import styled from 'styled-components'
import { StaticQuery, Link, graphql } from 'gatsby'
import { mainMw } from './GlobalStyles.js'

import About from './About'

const bgPost = (slug, { location, theme }) => {
  if (theme === 'light' && slug === location.pathname) {
    return 'background: #e7ecef;'
  } else if (theme === 'dark' && slug === location.pathname) {
    return 'background: #162438;'
  }
  return ''
}

export default class SB extends Component {
  render() {
    const SideBar = styled.aside`
      border-right: 1px dashed #c5c5c5;
      display: flex;
      flex-direction: column;
      grid-column: 1 / 2;
      height: 100%;
      position: fixed;
      width: var(--sb-mw);

      @media (max-width: ${mainMw}) {
        display: none;
      }
    `

    const Posts = styled.div`
      flex: 1;
      overflow: scroll;
    `
    const Post = styled.div`
      ${props => bgPost(props.slug, this.props)}
      border-bottom: 1px dashed #c4c4c4;
      padding: 0.5rem 1.7rem;
      transition: all 0.3s ease;

      &:hover,
      &:focus {
        background: ${this.props.theme === 'light'
          ? 'rgba(205, 202, 162, 0.16)'
          : 'rgba(33, 5, 75, 0.16)'};
        transform: scale(1.02);

        h5 {
          color: ${this.props.theme === 'light' ? '#a5901f' : '#ffd700'};
        }
      }
    `

    const Title = styled.h5`
      color: ${this.props.theme === 'light' ? '#cc3355' : '#fffef8'};
    `

    const PostInfo = styled.p`
      font-style: italic;
      margin: 0;
    `

    const Date = styled.span`
      font-size: 0.8rem;
    `

    const MinToRead = styled.span`
      font-size: 0.7rem;
    `

    const Excerpt = styled.p`
      font-size: 0.8rem;
      margin: 0.6rem 0;
    `

    const { displayListPosts } = this.props
    return (
      <StaticQuery
        query={graphql`
          query {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
            ) {
              totalCount
              edges {
                node {
                  id
                  frontmatter {
                    title
                    date(formatString: "MMMM DD, YYYY")
                  }
                  fields {
                    slug
                  }
                  timeToRead
                  excerpt
                }
              }
            }
          }
        `}
        render={data => (
          <SideBar>
            <About />
            <Posts>
              {displayListPosts &&
                data.allMarkdownRemark.edges.map(({ node }) => (
                  <Post key={node.id} slug={node.fields.slug}>
                    <Link to={node.fields.slug}>
                      <Title>
                        {node.frontmatter.title}{' '}
                        <PostInfo>
                          <Date>{node.frontmatter.date} </Date>
                          <MinToRead>— {node.timeToRead}min</MinToRead>
                        </PostInfo>
                      </Title>
                      <Excerpt>{node.excerpt}</Excerpt>
                    </Link>
                  </Post>
                ))}
            </Posts>
          </SideBar>
        )}
      />
    )
  }
}
