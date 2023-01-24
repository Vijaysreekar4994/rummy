import React, { useEffect, useState } from 'react'
import './card.css'
import { CardsAvatar } from '../components/cardSet/CardsAvatar';
import { OpenDeck } from '../components/openDeck/OpenDeck';
import PlayerView from '../components/playerView/PlayerView';
import subsetValidation from '../data/mainLogic.js';

export const Cards = () => {
    const [cardSet53, setCardSet53] = useState([]);
    const [playerASet, setPlayerASet] = useState([]);
    const [playerBSet, setPlayerBSet] = useState([]);
    const [jocker, setJocker] = useState('');
    const [currentPlayer, setCurrentPlayer] = useState('');
    const [picked, setPicked] = useState();
    const [selectedCards, setSelectedCards] = useState([]);
    const [openCards, setOpenCards] = useState([]);
    const [playerAValidSets, setPlayerAValidSets] = useState([]);
    const [playerBValidSets, setPlayerBValidSets] = useState([]);

    const focusPlayer = {
        boxShadow: '2px 2px 2px 5px black',
        backgroundColor: '#606060',
        display: 'flex',
        borderRadius: '15px',
        flexWrap: 'wrap',
        padding: '15px',
        margin: '15px'
    };

    const selectPlayerButton = { height: '100px', width: '500px', alignSelf: 'center', margin: '25px', fontSize: '30px', borderRadius: '50px' }
    const club = '\u2663';// club '♣' 3 |'♧' 7
    const heart = '\u2665';// heart '♥' 5 | '♡' 1
    const spade = '\u2660';// spade symbol '♠' 0
    const diamond = '\u2666'; // diamond '♦' 6 | 2


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

    function handlePick(lastCard) {
        if (currentPlayer === 'B') {
            if (playerBSet.length !== 13) {
                setPlayerBSet(prevState => {
                    return [
                        ...prevState,
                        [lastCard]
                    ]
                });
            } else {
                setPlayerBSet(prevState => {
                    return [
                        [...prevState],
                        [lastCard]
                    ]
                });
            }
        } else {
            if (playerASet.length !== 13) {
                setPlayerASet(prevState => {
                    return [
                        ...prevState,
                        [lastCard]
                    ]
                });
            } else {
                setPlayerASet(prevState => {
                    return [
                        [...prevState],
                        [lastCard]
                    ]
                });
            }
        }
    }

    function pickFromAllCards() {
        setPicked(true);
        let lastCard = cardSet53.pop();
        handlePick(lastCard);
        setOpenCards([])
    };

    function pickFromOpenCards() {
        setPicked(true);
        let lastCard = openCards.pop();
        handlePick(lastCard)
    };

    function handleDiscard() {
        let set = [];
        if (currentPlayer === 'B') {
            set = playerBSet;
        } else {
            set = playerASet;
        }

        if (currentPlayer === 'B') {
            selectedCards.forEach(card => {
                set.forEach(array => {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i] === card) {
                            array.splice(i, 1);
                        }
                    }
                })
            });
            setPlayerBSet(set);
            setCurrentPlayer('A')
        } else {
            selectedCards.forEach(card => {
                set.forEach(array => {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i] === card) {
                            array.splice(i, 1);
                        }
                    }
                })
            });
            setPlayerASet(set);
            setCurrentPlayer('B')
        }
        setOpenCards(selectedCards);
        setPicked(false);
        handleClearSelection();
        removeEmptyArraysfromPlayerSet();
        setPlayerBValidSets(subsetValidation(playerBSet));
        setPlayerAValidSets(subsetValidation(playerASet));
    };

    function handleClearSelection() {
        setSelectedCards([]);
        // https://stackoverflow.com/questions/46571097/clear-a-list-of-checkboxes-in-react
        document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
    };

    function removeEmptyArraysfromPlayerSet() {
        let set = [];
        if (currentPlayer === 'B') {
            set = playerBSet;
        } else {
            set = playerASet;
        }
        //remove empty arrays from Player set
        for (let i = 0; i < set.length; i++) {
            if (set[i].length === 0) {
                set.splice(i, 1);
            }
        }
    };

    function handleGroupSubset() {
        let set = [];
        if (currentPlayer === 'B') {
            set = playerBSet;
        } else {
            set = playerASet;
        }

        if (set.length === 13) {
            // this following loop will run and 
            // divide cards for the first time 
            // when all 13 cards are joined
            selectedCards.forEach(card => {
                for (var i = 0; i < set.length; i++) {
                    if (set[i] === card) {
                        set.splice(i, 1);
                    }
                }
            });
            if (currentPlayer === 'B') {
                setPlayerBSet([set, selectedCards]);
            } else {
                setPlayerASet([set, selectedCards]);
            }
        } else {
            selectedCards.forEach(card => {
                set.forEach(array => {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i] === card) {
                            array.splice(i, 1);
                        }
                    }
                })
            });
            // removeEmptyArraysfromPlayerSet();
            if (currentPlayer === 'B') {
                setPlayerBSet([...playerBSet, selectedCards]);
            } else {
                setPlayerASet([...playerASet, selectedCards]);
            }
        }
        handleClearSelection();
    }

    useEffect(() => {
        generate53cardsSet();
    }, []);
    useEffect(() => {
        removeEmptyArraysfromPlayerSet();
        setPlayerAValidSets(subsetValidation(playerASet));
        setPlayerBValidSets(subsetValidation(playerBSet));
    }, [playerASet, playerBSet]);
    // console.log(currentPlayer);
    return (
        <>
            {/* CARDS SERVING BUTTONS VIEW */}
            {playerASet.length === 0 &&
                <div className=''>
                    <div className=''>
                        <p className='viewTitle'>Who wants to serve cards first ?</p>
                    </div>
                    <div className='buttonsContainer'>
                        {/* TODO: add feature to add player custom names and let them play */}
                        <button className='button' style={selectPlayerButton} onClick={() => handleDistribution(cardSet53, 'B')}>Player A</button>
                        <button className='button' style={selectPlayerButton} onClick={() => handleDistribution(cardSet53, 'A')}>Player B</button>
                    </div>
                </div>
            }
            {/* JOCKER AND CARDS AVTAR */}
            <div style={{ display: 'flex' }}>
                {currentPlayer &&
                    <CardsAvatar
                        buttonName='Pick'
                        pickFunction={pickFromAllCards}
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
                        handlePick={pickFromOpenCards}
                    />}
            </div>

            {playerASet.length !== 0 &&
                <>
                    {/* {currentPlayer === 'A' ? */}
                    <PlayerView
                        validSets={playerAValidSets}
                        style={currentPlayer === 'A' ? focusPlayer : { display: 'flex' }}
                        playerName={'PLAYER AAA'}
                        currentPlayer={currentPlayer}
                        playerSet={playerASet}
                        selectedCards={selectedCards}
                        setSelectedCards={setSelectedCards}
                        inPlay={currentPlayer === 'A' && true}
                    />
                    {/* : null}
                    {/* {currentPlayer === 'B' ? */}
                    <PlayerView
                        validSets={playerBValidSets}
                        style={currentPlayer === 'B' ? focusPlayer : { display: 'flex' }}
                        playerName={'PLAYER BBB'}
                        currentPlayer={currentPlayer}
                        playerSet={playerBSet}
                        selectedCards={selectedCards}
                        setSelectedCards={setSelectedCards}
                        inPlay={currentPlayer === 'B' && true}
                    />
                    {/* : null} */}
                    {selectedCards.length !== 0 &&
                        <>
                            <button className='button' onClick={() => handleClearSelection()}>Clear selection</button>
                            {selectedCards.length >= 2 && <button className='button' onClick={() => handleGroupSubset(currentPlayer)}>Group</button>}
                            {(selectedCards.length === 1 && picked) && <button className='button' onClick={() => handleDiscard()}>Discard</button>}
                        </>
                    }
                </>
            }
        </>
    )
};