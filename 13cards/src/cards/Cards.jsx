import React, { useEffect, useState } from 'react'
import './card.css'
import { CardsAvatar } from '../components/cardSet/CardsAvatar';
import { OpenDeck } from '../components/openDeck/OpenDeck';
import { Player } from '../components/player/Player';

export const Cards = () => {
    const [cardSet53, setCardSet53] = useState([]);
    const [playerASet, setPlayerASet] = useState([]);
    const [playerBSet, setPlayerBSet] = useState([]);
    const [jocker, setJocker] = useState('');
    const [currentPlayer, setCurrentPlayer] = useState('');
    const [picked, setPicked] = useState();
    const [selectedCards, setSelectedCards] = useState([]);
    const [openCards, setOpenCards] = useState([]);

    const focusPlayer = { boxShadow: '2px 2px 2px 2px black', backgroundColor: 'white' };
    const club = '\u2663';// club '♣' 3 |'♧' 7
    const heart = '\u2665';// heart '♥' 5 | '♡' 1
    const spade = '\u2664';// spade symbol '♠' 0
    const diamond = '\u2662'; // diamond '♦' 6
    function generate53cardsSet() {
        let clubs = [`A${club}`, `J${club}`, `Q${club}`, `K${club}`];
        let hearts = [`A${heart}`, `J${heart}`, `Q${heart}`, `K${heart}`];
        let spades = [`A${spade}`, `J${spade}`, `Q${spade}`, `K${spade}`];
        let diamonds = [`A${diamond}`, `J${diamond}`, `Q${diamond}`, `K${diamond}`];
        let jocker = ['\u2605']; // add 6 in the end for filled club

        for (let i = 2; i <= 10; i++) {
            clubs.push(i + club);
            hearts.push(i + heart);
            spades.push(i + spade);
            diamonds.push(i + diamond);
        }
        let newSet53 = clubs.concat(hearts, spades, diamonds, jocker);
        // console.log(newSet53);
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

    function handleSelect(selected, card) {
        if (selected) {
            setSelectedCards(
                [
                    ...selectedCards,
                    card
                ]
            );
        } else {
            let a = selectedCards.filter(e => e !== card);
            setSelectedCards(a);
        }
    };

    function handleClearSelection() {
        setSelectedCards([]);
        // https://stackoverflow.com/questions/46571097/clear-a-list-of-checkboxes-in-react
        document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
    };

    // console.log(playerBSet);

    function handleGroupSubset(playerSet) {
        // let newArray = [];
        if (playerBSet.length === 13) {
            selectedCards.forEach(card => {
                for (var i = 0; i < playerSet.length; i++) {
                    if (playerSet[i] === card) {
                        playerSet.splice(i, 1);
                    }
                }
            });
            setPlayerBSet([playerSet, selectedCards]);
        } else {
            selectedCards.forEach(card => {
                playerSet.forEach(array => {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i] === card) {
                            array.splice(i, 1);
                        }
                    }
                })
            });
            // let dividedSet = playerSet.push(selectedCards)
            console.log('test*********************', playerSet);
            // setPlayerBSet(playerSet,selectedCards)
            setPlayerBSet(
                [
                    ...playerBSet,
                    selectedCards
                ]
            );
        }

        // setPlayerBSet(playerSet, selectedCards)
        handleClearSelection();
        // newArray.push(set, selected)
    }
    console.log('selectedCards : ', selectedCards)
    console.log('playerBset : ', playerBSet)

    useEffect(() => {
        generate53cardsSet();
    }, []);
    return (
        <>
            {/* CARDS SERVING BUTTONS VIEW */}
            {playerASet.length === 0 &&
                <div className=''>
                    <div className=''>
                        <h1 className='viewTitle'>Who wants to serve cards first ?</h1>
                    </div>
                    <div className='buttonsContainer'>
                        {/* {['B', 'A'].map((e, i) => {
                            return <button key={i} className='button' onClick={() => handleDistribution(cardSet53, e)}>Serve cards by player {e}</button>
                        })} */}
                        {/* TODO: add feature to add player custom names and let them play */}
                        <button className='button' onClick={() => handleDistribution(cardSet53, 'B')}>Serve cards by player A</button>
                        <button className='button' onClick={() => handleDistribution(cardSet53, 'A')}>Serve cards by player B</button>
                    </div>
                </div>
            }

            {/* JOCKER AND CARDS AVTAR */}
            <div style={{ display: 'flex' }}>
                {currentPlayer &&
                    <CardsAvatar
                        buttonName='Pick'
                        pickFunction={handlePickFromAllCards}
                        jocker={jocker}
                        currentPlayer={currentPlayer}
                        picked={picked}
                    />}
                {/* OPEN CARDS VIEW */}
                {currentPlayer &&
                    <OpenDeck
                        currentPlayer={currentPlayer}
                        openCards={openCards}
                        picked={picked}
                        handlePick={handlePickFromOpenCards}
                    />}
            </div>



            {/* ALL REMAINING CARDS VIEW */}
            {/* <div className='cardSetContainer'>
                {cardSet53.map((card, id) => {
                    return <div className='card' key={id}>
                        <h2>{card}</h2>
                    </div>
                })}
                {(currentPlayer && !picked) && <div className='pickFromAllCardsButton' onClick={() => handlePickFromAllCards()}>
                    <h2>Pick</h2>
                </div>}
            </div> */}
            {/* JOCKER VIEW */}
            {/* {currentPlayer && <h2>Jocker</h2>}
            {jocker && <div className='jockerContainer'>
                <div className='card'>
                    <h2>{jocker}</h2>
                </div>
            </div>} */}


            {/* PLAYERS VIEW */}
            {/* {playerASet.length !== 0 && <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h2 className='playerBContainer'>It's Player {currentPlayer} turn !</h2>
            </div>} */}
            {/* {playerASet.length !== 0 && <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <h2 className='playerAContainer'>Player A</h2>
                <h2 className='playerBContainer'>Player B</h2>
            </div>} */}
            {playerASet.length !== 0 &&
                <>
                    {/* <Player picked={picked} currentPlayer={currentPlayer} player={'PLAYER A'} playerSet={playerASet} handleDiscard={handleDiscard} /> */}
                    <h2 style={{ marginRight: '25px' }}>PLAYER A</h2>
                    {/* <div className='playerAContainer' style={currentPlayer === 'A' ? focusPlayer : {}}>
                        {playerASet.map((card, id) => {
                            return <>
                                <div className='playerCardContainer' key={id}>
                                    {currentPlayer === 'A' && <label className="container">
                                        <input className='inputSelected' type='checkbox' onChange={(e) => handleSelect(e.target.checked, card)} />
                                        <span className="checkmark" />
                                    </label>}
                                    <button className='card'>
                                        <h2>{card}</h2>
                                    </button>
                                    {(currentPlayer === 'A' && picked) && <button className='discardButton' onClick={() => handleDiscard(card)}>
                                        {'Discard'}
                                    </button>}
                                </div>
                            </>
                        })}
                    </div> */}
                    <h2 style={{ marginRight: '25px' }}>PLAYER B</h2>
                    <div style={{ display: 'flex' }}>
                        {playerBSet.map((card, id) => {
                            return (
                                <div key={id} style={{ display: 'flex' }}>
                                    {playerBSet.length !== 13 ?
                                        <>
                                            {card.map((subItems, sIndex) => {
                                                return (
                                                    <div key={sIndex}>
                                                        {currentPlayer === 'B' ? <label className="container">
                                                            <input className='inputSelected' type='checkbox' onChange={(e) => handleSelect(e.target.checked, subItems)} />
                                                            <span className="checkmark" />
                                                        </label> : null}
                                                        <button className='card'>
                                                            <h2>{subItems}</h2>
                                                        </button>
                                                    </div>
                                                )
                                            })}
                                            <div className="middleSpace"></div>
                                        </> :
                                        <>
                                            {currentPlayer === 'B' ? <label className="container">
                                                <input className='inputSelected' type='checkbox' onChange={(e) => handleSelect(e.target.checked, card)} />
                                                <span className="checkmark" />
                                            </label> : null}
                                            <button className='card'>
                                                <h2>{card}</h2>
                                            </button>
                                            {(currentPlayer === 'B' && picked) && <button className='discardButton' onClick={() => handleDiscard(card)}>
                                                {'Discard'}
                                            </button>}
                                        </>
                                    }
                                </div>
                            )
                        })}
                    </div>
                </>}
            {selectedCards.length !== 0 &&
                <>
                    <button className='button' onClick={() => handleClearSelection()}>Clear selection</button>
                    <button className='button' onClick={() => handleGroupSubset(playerBSet)}>Group</button>
                </>
            }
        </>
    )
};