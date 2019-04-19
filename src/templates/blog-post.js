import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Zooming from 'zooming'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

const Content = styled.div`
  grid-column: 2 / 3;
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

const Signature = styled.div`
  font-family: 'Gloria Hallelujah', cursive;
  font-style: italic;
  line-height: 1.2;
  margin: 2rem 0;

  p {
    margin: 0;
  }

  p:last-child {
    margin-top: 1rem;
  }
`

export default class BlogPost extends React.Component {
  componentDidMount() {
    const zooming = new Zooming({
      // options...
    })

    zooming.listen('img')
  }

  render() {
    const { data, location } = this.props
    const post = data.markdownRemark
    const description = data.markdownRemark.excerpt

    return (
      <Layout displayListPosts={true} location={location}>
        <SEO
          title={`Nayed's blog | ${post.frontmatter.title}`}
          description={description}
        />
        <Content>
          <Title>
            {post.frontmatter.title}
            <PostInfo>
              <Date>{post.frontmatter.date} </Date>
              <MinToRead>— {post.timeToRead} min read or so</MinToRead>
            </PostInfo>
          </Title>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <Signature>
            <p>Until next time,</p>
            <p>Plus ultra!</p>
            <p>NSA</p>
          </Signature>
        </Content>
      </Layout>
    )
  }
}

/*export default ({ data, location }) => {
  const post = data.markdownRemark
  const description = data.markdownRemark.excerpt

  return (
    <Layout displayListPosts={true} location={location}>
      <SEO
        title={`Nayed's blog | ${post.frontmatter.title}`}
        description={description}
      />
      <Content>
        <Title>
          {post.frontmatter.title}
          <PostInfo>
            <Date>{post.frontmatter.date} </Date>
            <MinToRead>— {post.timeToRead} min read or so</MinToRead>
          </PostInfo>
        </Title>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <Signature>
          <p>Until next time,</p>
          <p>Plus ultra!</p>
          <p>NSA</p>
        </Signature>
      </Content>
    </Layout>
  )
}*/

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      timeToRead
    }
  }
`
