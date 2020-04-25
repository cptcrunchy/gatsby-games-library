import React from 'react'
import Layout from '../components/layout'
import GameItem from '../components/GameItem'
import { graphql } from 'gatsby'

const GameTemplate = (props) => {
    const gameContent = props.data.game;
    console.log(gameContent)

    return (
        <Layout>
            <GameItem
                gameTitle={gameContent.title}
                gameCover={gameContent.localImage.childImageSharp.fixed}
                studioName={gameContent.studio.name}
                releaseDate={gameContent.releaseDate}
                gameSummary={gameContent.gameSummary}
             />   
        </Layout>
    )

}

export const gameQuery = graphql`
query GameQuery($gameId: String!) {
    game(id: {eq: $gameId}) {
      id
      title
      releaseDate
      gameSummary
      studio {
        name
      }
      localImage {
        childImageSharp {
          fixed(width: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }

`


export default GameTemplate