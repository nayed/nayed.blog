import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <>
        <div>
          <Link to="/">
            <h1>{data.site.siteMetadata.title}</h1>
          </Link>
          <p>{data.site.siteMetadata.description}</p>
          {children}
        </div>
      </>
    )}
  />
)
