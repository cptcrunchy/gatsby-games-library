require('dotenv').config({
    path: '.env'
})

module.exports = {
  siteMetadata: {
    title: `Nintendo Games Library`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
        resolve: `gatsby-plugin-remote-images`,
        options: {
          nodeType: 'Game',
          imagePath: 'imageUrl',
        },
    },
    {
        resolve: 'gatsby-firesource',
        options: {
            credential: {
                "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
                "auth_uri": process.env.FIREBASE_AUTH_URI,
                "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
                "client_email": process.env.FIREBASE_CLIENT_EMAIL,
                "client_id": process.env.FIREBASE_CLIENT_ID,
                "project_id": process.env.FIREBASE_PROJECT_ID,
                "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
                "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
                "token_uri": process.env.FIREBASE_TOKEN_URI,
                "type": process.env.FIREBASE_TYPE
            },
            types: [
                {
                    type: 'Game',
                    collection: 'games',
                    map: doc => ({
                      title: doc.title,
                      studio___NODE: doc.studio.id,
                      releaseDate: doc.releaseDate,
                      gameSummary: doc.gameSummary,
                      imageUrl: doc.imageUrl,
                    }),
                },
                {
                    type: 'Studio',
                    collection: 'studios',
                    map: doc => ({
                        name: doc.name
                    }),
                }
            ]
        }
    },  
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
