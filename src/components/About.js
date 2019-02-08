import React from 'react'
import styled from 'styled-components'
import { StaticQuery, Link, graphql } from 'gatsby'

import avatar from '../images/nayed.svg'

const Img = styled.img`
  display: inline-block;
  height: 4.3rem;
`

const About = styled.div`
  text-align: center;
`

const A = styled(Link)`
  display: inline;
`

const Intro = styled.div`
  display: inline-block;
  margin-left: 1rem;
`

const Name = styled.p`
  color: #a2a9ad;
  font-family: 'Lora';
  font-size: 1.8rem;
  margin-bottom: 0;
`
const Desc = styled.p`
  font-size: 1.2rem;
  margin-top: 0;
`

const Blog = styled.span`
  color: #48b8d0;
`

const Hr = styled.hr`
  margin: 0 1.1rem;
`

const Info = styled.p`
  font-size: 0.5rem;
`

export default () => (
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
      <div>
        <About>
          <A to="/">
            <Img src={avatar} alt="nayed's avatar" />
            <Intro>
              <Name>Nayed Saïd Ali</Name>
              <Desc>
                Personal <Blog>blog</Blog>{' '}
              </Desc>
            </Intro>
            <Info>{data.site.siteMetadata.description}</Info>
          </A>
        </About>
        <Hr />
      </div>
    )}
  />
)
