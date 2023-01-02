import React, { useEffect, useState } from 'react'
import './card.css'

export const Cards = () => {
    const [cardSet53, setCardSet53] = useState([]);
    const [playerASet, setPlayerASet] = useState([]);
    const [playerBSet, setPlayerBSet] = useState([]);
    const [jocker, setJocker] = useState('');
    const [pickFromAllCards, setPickFromAllCards] = useState(null);
    const [pickFromOpenCards, setPickFromOpenCards] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState('');
    // const [activePlayer, setActivePlayer] = useState(null);
    const [picked, setPicked] = useState();
    const [openCards, setOpenCards] = useState([]);

    const focusPlayer = { boxShadow: '2px 2px 2px 2px black', backgroundColor: 'white' };
    // const initialState = [
    //     { id: 1, country: 'Austria' },
    //     { id: 2, country: 'Belgium' },
    //     { id: 3, country: 'Canada' },
    // ];
    // const [data, setData] = useState(initialState);

    // function updateState(){
    //     setData(
    //         [
    //             ...data,
    //             {id: 4, country: 'India'}
    //         ]
    //     )
    // }
    // console.log(data);

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
        let newSet53 = club.concat(heart, spade, diamond, jocker);
        let shuffledSet = handleShuffle(newSet53)
        setCardSet53(shuffledSet);
    };

    function handleShuffle(cardSet) {
        return cardSet.sort(() => Math.random() - 0.5);
    };

    function handleDistribution(shuffledCards, player) {
        let playerASet = shuffledCards.splice(0, 13);
        setPlayerASet(playerASet);
        let playerBSet = shuffledCards.splice(0, 13);
        setPlayerBSet(playerBSet);
        setJocker(shuffledCards.splice(0, 1));
        setOpenCards(shuffledCards.splice(10, 1));
        setCurrentPlayer(player)
    };

    function handlePickFromAllCards() {
        setPicked(true);
        let lastCard = cardSet53.pop();
        if (currentPlayer === 'B') {
            setPlayerBSet(
                [
                    ...playerBSet,
                    lastCard
                ]
            );
        }
        if (currentPlayer === 'A') {
            setPlayerASet(
                [
                    ...playerASet,
                    lastCard
                ]
            );
        }
    };

    function handlePickFromOpenCards() {
        setPicked(true);
        let lastCard = openCards.pop();
        if (currentPlayer === 'B') {
            setPlayerBSet(
                [
                    ...playerBSet,
                    lastCard
                ]
            );
        }
        if (currentPlayer === 'A') {
            setPlayerASet(
                [
                    ...playerASet,
                    lastCard
                ]
            );
        }
    };

    function handleDiscard(discarded) {
        if (currentPlayer === 'A') {
            let filteredPlayerACards = playerASet.filter(card => card !== discarded);
            setPlayerASet(filteredPlayerACards);
            setPicked(false);
            setCurrentPlayer('B')
            setOpenCards([discarded]);
        }
        if (currentPlayer === 'B') {
            let filteredPlayerBCards = playerBSet.filter(card => card !== discarded);
            setPlayerBSet(filteredPlayerBCards);
            setPicked(false);
            setCurrentPlayer('A')
            setOpenCards([discarded]);
        }
    };

    useEffect(() => {
        generate53cardsSet();
    }, []);
    return (
        <>
            {/* ALL REMAINING CARDS VIEW */}
            <div className='cardSetContainer'>
                {cardSet53.map((card, id) => {
                    return <div className='card' key={id}>
                        <h2>{card}</h2>
                    </div>
                })}
                {(currentPlayer && !picked) && <div className='pickFromAllCardsButton' onClick={() => handlePickFromAllCards()}>
                    <h2>Pick</h2>
                </div>}
            </div>
            {/* <div style={{  }}> */}
            {/* JOCKER VIEW */}
            {currentPlayer && <h2>Jocker</h2>}
            {jocker && <div className='jockerContainer'>
                <div className='card'>
                    <h2>{jocker}</h2>
                    {/* <p>{card}</p> */}
                </div>
            </div>}
            {currentPlayer && <h2>Open cards</h2>}
            {/* OPEN CARDS VIEW */}
            {openCards.length !== 0 && <div className='openCardsContainer'>
                {/* <div className='card' /> */}
                {openCards.map((card, id) => {
                    return <div className='card' key={id}>
                        <h2>{card}</h2>
                    </div>
                })}
                {(currentPlayer && !picked) && <div className='pickFromAllCardsButton' onClick={() => handlePickFromOpenCards()}>
                    <h2>Pick</h2>
                </div>}
            </div>}
            {/* </div> */}
            {/* CARDS SERVING BUTTONS VIEW */}
            {playerASet.length === 0 && <div className='buttonsContainer'>
                <button className='serveButton' onClick={() => handleDistribution(cardSet53, 'B')}>Serve cards by player A</button>
                <button className='serveButton' onClick={() => handleDistribution(cardSet53, 'A')}>Serve cards by player B</button>
            </div>}
            {/* PLAYERS VIEW */}
            {playerASet.length !== 0 && <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h2 className='playerBContainer'>It's Player {currentPlayer} turn !</h2>
            </div>}
            {playerASet.length !== 0 && <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <h2 className='playerAContainer'>Player A</h2>
                <h2 className='playerBContainer'>Player B</h2>
            </div>}
            {playerASet.length !== 0 && <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div className='playerAContainer' style={currentPlayer === 'A' ? focusPlayer : {}}>
                    {playerASet.map((card, id) => {
                        return <>
                            <div className='playerCardContainer'>
                                {(currentPlayer === 'A' && picked) && <button className='discardButton' key={id} onClick={() => handleDiscard(card)}>
                                    {'Discard'}{card}
                                </button>}
                                <button className='card' key={id}>
                                    <h2>{card}</h2>
                                </button>
                            </div>
                        </>
                    })}
                </div>
                <div className='playerBContainer' style={currentPlayer === 'B' ? focusPlayer : {}}>
                    {playerBSet.map((card, id) => {
                        return <>
                            <div className='playerCardContainer'>
                                {(currentPlayer === 'B' && picked) && <button className='discardButton' key={id} onClick={() => handleDiscard(card)}>
                                    {'Discard'}{card}
                                </button>}
                                <button className='card' key={id}>
                                    <h2>{card}</h2>
                                </button>
                            </div>
                        </>
                    })}
                </div>
            </div>}
        </>
    )
};