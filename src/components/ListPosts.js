import React from 'react'
import styled from 'styled-components'
import { StaticQuery, Link, graphql } from 'gatsby'

const Post = styled.div`
  // background-color: #ffffff;
  // grid-column: 2 / 3;
  // max-width: 50rem;
  padding: 0 1rem;
`

const Title = styled.h1`
  color: #e01a4f;
`
const Date = styled.span`
  font-size: 1rem;
`

export default ({ children }) => (
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
    render={data =>
      data.allMarkdownRemark.edges.map(({ node }) => (
        <Post key={node.id}>
          <Link to={node.fields.slug}>
            <Title>
              {node.frontmatter.title} <Date>— {node.frontmatter.date}</Date>
            </Title>
          </Link>
          <p>{node.excerpt}</p>
        </Post>
      ))
    }
  />
)
