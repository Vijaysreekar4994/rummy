import React, { useEffect, useState } from 'react'
import { CardSet53 } from '../components/cardSet/CardSet53';
import './card.css'

export const Cards = () => {
    const [cardSet, setCardSet] = useState([]);
    const [playerASet, setplayerASet] = useState([]);
    const [playerBSet, setplayerBSet] = useState([]);


    function generate53cardsSet() {
        let club = [];
        let heart = [];
        let spade = [];
        let diamond = [];
        let jocker = ['☆'];

        for (let i = 1; i <= 13; i++) {
            club.push(i + '♣'); // club '♣'
            heart.push(i + '♥'); // heart '♥'
            spade.push(i + '♠'); // spade symbol '♠'
            diamond.push(i + '♦'); // diamond '♦'
        }
        let set = club.concat(heart, spade, diamond, jocker);
        let shuffledSet = handleShuffle(set)
        setCardSet(shuffledSet);
    };

    function handleShuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    };

    function handleDistribution(shuffledCards) {
        // let serve13cards = shuffledCards.splice(0, 13);
        let playerASet = shuffledCards.splice(0, 13);
        setplayerASet(playerASet);
        let playerBSet = shuffledCards.splice(0, 13);
        setplayerBSet(playerBSet);
    };

    useEffect(() => {
        generate53cardsSet();
    }, []);

    return (
        <>
            <div className='cardSetContainer'>
                {cardSet.map((card, id) => {
                    return <div className='card' key={id}>
                        {/* <h3>{card}</h3> */}
                        <p>{card}</p>
                    </div>
                })}
            </div>
            {playerASet ==! [] ? <div className='buttonsContainer'>
                <button onClick={() => handleDistribution(cardSet)}>Serve cards</button>
            </div> : null}
            <div className='playerAContainer'>
                {playerASet.map((card, id) => {
                    return <div className='card' key={id}>
                        {/* <h1>{card}</h1> */}
                        {card}
                    </div>
                })}
            </div>
            <div className='playerBContainer'>
                {playerBSet.map((card, id) => {
                    return <div className='card' key={id}>
                        {/* <h1>{card}</h1> */}
                        {card}
                    </div>
                })}
            </div>
        </>
    )
};