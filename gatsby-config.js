module.exports = {
  siteMetadata: {
    title: "Nayed Saïd Ali's personal blog",
    author: 'Nayed Saïd Ali',
    description: "Late 20-something talking about stuff he doen't grasp",
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
        background_color: '#223344',
        theme_color: '#fffef8',
        display: 'minimal-ui',
        icon: 'src/images/n.svg'
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Lora', 'Open Sans']
        }
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`
      }
    },
    'gatsby-transformer-remark'
  ]
}
