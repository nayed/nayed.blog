module.exports = {
  siteMetadata: {
    title: "Nayed Saïd Ali's personal blog",
    author: 'Nayed Saïd Ali',
    description: "20-something developer ranting about stuff he doesn't grasp",
    siteUrl: 'https://nayed.blog'
  },
  plugins: [
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }]
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: {frontmatter: {draft: {ne: true}}}
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "Nayed Saïd Ali's personal blog"
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-54444877-4'
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Nayed',
        short_name: 'Nayed',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#223344',
        display: 'minimal-ui',
        icon: 'src/images/n.svg'
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-copy-images']
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`
      }
    }
  ]
}
