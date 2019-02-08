import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import GlobalStyles from '../components/GlobalStyles'
import SEO from '../components/SEO'

const Content = styled.div`
  // background-color: #ffffff;
  // grid-column: 2 / 3;
  font-size: 1.125rem;
  line-height: 1.75;
  padding: 0 1.2rem;
`

const Title = styled.h1`
  line-height: 0.85;
  margin-bottom: 1.5rem;
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

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <>
      <GlobalStyles />
      <Layout displayListPosts={true}>
        <SEO title={`Nayed's blog | ${post.frontmatter.title}`} />
        <Content>
          <Title>
            {post.frontmatter.title}
            <PostInfo>
              <Date>{post.frontmatter.date} </Date>
              <MinToRead>— {post.timeToRead} min read</MinToRead>
            </PostInfo>
          </Title>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Content>
      </Layout>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      timeToRead
    }
  }
`
