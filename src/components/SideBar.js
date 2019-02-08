import React from 'react'
import styled from 'styled-components'
import { StaticQuery, Link, graphql } from 'gatsby'

import About from './About'

const SideBar = styled.aside`
  // background-color: #ffffff;
  border-right: 1px dashed #c5c5c5;
  display: flex;
  flex-direction: column;
  grid-column: 1 / 2;
  height: 100%;
  position: fixed;
  width: 23rem;

  @media (max-width: 46rem) {
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
    background: #E7ECEF;
  }
`

const Title = styled.h5`
  color: #12355B;
`

export default ({ displayListPosts }) => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          totalCount
          edges {
            node {
              id
              frontmatter {
                title
                date(formatString: "DD MMMM, YYYY")
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
                    <span>— {node.frontmatter.date}</span>
                  </Title>
                  <p>{node.excerpt}</p>
                </Link>
              </Post>
            ))}
        </Posts>
      </SideBar>
    )}
  />
)
