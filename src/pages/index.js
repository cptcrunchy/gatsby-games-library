import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import SEO from "../components/seo"
import GameItem from '../components/GameItem'

const LinkButton = styled.div`
    text-align: right;
    a{
        padding: 8px;
        background: rebeccapurple;
        color: #fff;
        border-radius: 8px;
        text-decoration: none;
        &:hover{
            background: indigo;
        }
    }

`


const IndexPage = (props) => {
    const games = props.data.allGame.edges;
   return (
  <>
    <SEO title="Home" />
    {games.map( game => {
        return (
            <GameItem key={game.node.id}
             gameTitle={game.node.title}
             gameCover={game.node.localImage.childImageSharp.fixed}
             studioName={game.node.studio.name}
             releaseDate={game.node.releaseDate}
             gameSummary={game.node.gameSummary}
             >
                <LinkButton>
                    <Link to={`/game/${game.node.id}`}>Game Info</Link>
                </LinkButton>
            </GameItem>   
        )
    })}

    <Link to="/page-2/">Go to page 2</Link>
  </>
)
   }

export const query = graphql`
query AllGamesQuery {
    allGame {
      edges {
        node {
          id
          title
          releaseDate
          gameSummary
          studio {
            name
          }
          localImage {
            childImageSharp {
              fixed(width: 150){
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
  
` 


export default IndexPage
