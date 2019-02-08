import React from 'react'
import Layout from '../components/Layout'
import ListPosts from '../components/ListPosts'
import SEO from '../components/SEO'

export default ({ data }) => (
  <Layout displayListPosts={false}>
    <SEO />
    <ListPosts />
  </Layout>
)
