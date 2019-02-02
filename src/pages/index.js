import React from 'react'
import Layout from '../components/Layout'
import ListPosts from '../components/ListPosts'

export default ({ data }) => (
  <Layout displayListPosts={false}>
    <ListPosts />
  </Layout>
)
