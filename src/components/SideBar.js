import React from 'react'
import styled from 'styled-components'
import { Scrollbars } from 'react-custom-scrollbars'
import { StaticQuery, Link, graphql } from 'gatsby'

import About from './About'

const SideBar = styled.aside`
  border-right: 1px solid #c5c5c5;

  @media (max-width: 46rem) {
    display: none;
  }
`

const Posts = styled(Scrollbars)`
  // width: 22rem;
`
const Post = styled.div`
  border-bottom: 1px solid #c4c4c4;
  padding: 0.5rem;

  &:hover {
    background: #E7ECEF;
  }
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
                  <h5>
                    {node.frontmatter.title}{' '}
                    <span>— {node.frontmatter.date}</span>
                  </h5>
                  <p>{node.excerpt}</p>
                </Link>
              </Post>
            ))}
        </Posts>
      </SideBar>
    )}
  />
)
