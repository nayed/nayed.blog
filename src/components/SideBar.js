import React, { Component } from 'react'
import styled from 'styled-components'
import { StaticQuery, Link, graphql } from 'gatsby'

import About from './About'

export default class SB extends Component {
  render() {
    const SideBar = styled.aside`
      border-right: 1px dashed #c5c5c5;
      display: flex;
      flex-direction: column;
      grid-column: 1 / 2;
      height: 100%;
      position: fixed;
      width: 20rem;

      @media (max-width: 45rem) {
        display: none;
      }
    `

    const Posts = styled.div`
      flex: 1;
      overflow: scroll;
    `
    const Post = styled.div`
      border-bottom: 1px dashed #c4c4c4;
      padding: 0.5rem 1.7rem;

      &:hover {
        background: ${this.props.theme === 'light' ? '#e7ecef' : '#12355b'};
      }
    `

    const Title = styled.h5`
      color: ${this.props.theme === 'light' ? '#12355b' : '#fffef8'};
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
                  <Post key={node.id}>
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
