module.exports = {
  siteMetadata: {
    title: "Nayed Saïd Ali's personal blog",
    author: 'Nayed Saïd Ali',
    description: "Late 20-something talking about stuff he doen't grasp",
    siteUrl: 'https://nayed.blog'
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Lato', 'Lora']
        }
      }
    },
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`
      }
    }
  ]
}
