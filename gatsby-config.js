module.exports = {
  siteMetadata: {
    title: "Nayed Saïd Ali's personal blog",
    author: 'Nayed Saïd Ali',
    description: "20-something developer ranting about stuff he doesn't grasp",
    siteUrl: 'https://nayed.blog'
  },
  plugins: [
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
    // {
    //   resolve: 'gatsby-transformer-remark',
    //   options: {
    //     plugins: [
    //       {
    //         resolve: 'gatsby-remark-images',
    //         options: {
    //           // It's important to specify the maxWidth (in pixels) of
    //           // the content container as this plugin uses this as the
    //           // base for generating different widths of each image.
    //           maxWidth: 700
    //         }
    //       }
    //     ]
    //   }
    // },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700
            }
          },
          'gatsby-remark-copy-linked-files'
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`
      }
    }
    // {
    //   resolve: 'gatsby-transformer-remark',
    //   options: {
    //     plugins: ['gatsby-remark-copy-linked-files']
    //   }
    // }
  ]
}
