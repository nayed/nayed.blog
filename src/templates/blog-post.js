import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

const Content = styled.div`
  // background-color: #ffffff;
  // grid-column: 2 / 3;
  font-size: 1.125rem;
  line-height: 1.75;
  padding: 0 1.2rem;
`

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout displayListPosts={true}>
      <Content>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Content>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
