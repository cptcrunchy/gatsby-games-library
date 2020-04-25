import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

const GameWrapper = styled.div`
    border: 1px solid grey;
    background: #f0f0f0;
    padding: 8px;
    margin: 4px 0;  
    display: flex;
    h2{
        small{
            font-size: 14px;
            padding: 0 0 0 8px;
            font-weight: normal;
        }
    }
`
const GameItemImageWrapper = styled.div`
    max-width: 150px;
    img{
        max-width: 150px;
    }
`

const GameItemContentWrapper = styled.div`
    flex-grow: 1;
    padding-left: 10px;
`

const GameItem = ({gameTitle, studioName, releaseDate, gameSummary, gameCover, children}) => {

    return (
        <GameWrapper>
            <GameItemImageWrapper>
                <Img fixed={gameCover} />
            </GameItemImageWrapper>
            <GameItemContentWrapper>
                <h2>{gameTitle} <small>{releaseDate}</small></h2>
                <p>{studioName}</p>
                <p>{gameSummary}</p>
                <div>
                    {children}
                </div>
            </GameItemContentWrapper>
        </GameWrapper>
    )

}

export default GameItem