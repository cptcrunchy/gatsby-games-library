const path = require('path')

exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions;
    const gameTemplate = path.resolve('src/templates/gameTemplate.js')

    return graphql(`
        query AllGamesIdQuery {
            allGame {
                edges {
                    node {
                        id
                    }
                }
            }
        }
    `).then( (result) => {
        if(result.errors) throw result.errors;

        result.data.allGame.edges.forEach(game => {
            createPage({
                path: `/game/${game.node.id}`,
                component: gameTemplate,
                context: { gameId: game.node.id }
            })
        });
    })

}