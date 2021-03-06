import React from 'react'
import styled from 'styled-components'
import { StaticQuery, Link, graphql } from 'gatsby'

const Post = styled.div`
  margin-bottom: 3rem;
`

const Title = styled.h1`
  line-height: 0.85;
`

const PostInfo = styled.p`
  font-style: italic;
  margin: 0;
`

const Date = styled.span`
  font-size: 1rem;
`

const MinToRead = styled.span`
  font-size: 0.85rem;
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
                date(formatString: "MMMM DD, YYYY")
                draft
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
      data.allMarkdownRemark.edges.map(({ node }) => {
        if (
          process.env.NODE_ENV === 'development' ||
          (process.env.NODE_ENV === 'production' && !node.frontmatter.draft)
        ) {
          return (
            <Post
              key={node.id}
              className={node.frontmatter.draft ? 'draft' : ''}
            >
              <Link to={node.fields.slug}>
                <Title>
                  {node.frontmatter.title}
                  <PostInfo>
                    <Date>{node.frontmatter.date} </Date>
                    <MinToRead>— {node.timeToRead} min read or so</MinToRead>
                  </PostInfo>
                </Title>
                <p className="excerpt">{node.excerpt}</p>
              </Link>
            </Post>
          )
        }
        return ''
      })
    }
  />
)
