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

    // const CardText = (card) => {
    //     console.log('*******************',card);
    //     let d = card.includes(diamond);
    //     let h = card.includes(heart);
    //     return (
    //         <h2 style={{ color: d || h ? 'red' : '' }}>{card}</h2>
    //     )
    // }


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
        handlePick(lastCard)
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
    };

    function handleSelect(selected, card) {
        // console.log(selected, card);
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
    // console.log('playerBSet', playerBSet);
    // console.log('playerASet', playerASet);
    useEffect(() => {
        generate53cardsSet();
    }, []);

    return (
        <>
            {/* CARDS SERVING BUTTONS VIEW */}
            {playerASet.length === 0 &&
                <div className=''>
                    <div className=''>
                        <p className='viewTitle'>Who wants to serve cards first ?</p>
                    </div>
                    <div className='buttonsContainer'>
                        {/* {['B', 'A'].map((e, i) => {
                            return <button key={i} className='button' onClick={() => handleDistribution(cardSet53, e)}>Serve cards by player {e}</button>
                        })} */}
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

            {/* ALL REMAINING CARDS VIEW */}
            {/* <div className='cardSetContainer'>
                {cardSet53.map((card, id) => {
                    let d = card.includes(diamond);
                    let h = card.includes(heart);
                    return (
                        <div className='card' key={id}>
                            <h2 style={{ color: d || h ? 'red' : '' }}>{card}</h2>
                        </div>)
                })}
                {(currentPlayer && !picked) && <div className='pickFromAllCardsButton' onClick={() => pickFromAllCards()}>
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
                    {/* <h2 style={{ marginRight: '25px' }}>PLAYER A</h2> */}
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
                    {/* <PlayerView
                        playerName={'PLAYER A'}
                        currentPlayer={currentPlayer}
                        playerSet={playerASet}
                        selectedCards={selectedCards}
                        setSelectedCards={setSelectedCards}
                    />
                    <PlayerView
                        playerName={'PLAYER B'}
                        currentPlayer={currentPlayer}
                        playerSet={playerBSet}
                        selectedCards={selectedCards}
                        setSelectedCards={setSelectedCards}
                    />

 */}
<h2 style={{ marginRight: '25px' }}>PLAYER A</h2>
                    <div style={currentPlayer === 'A' ? focusPlayer : { display: 'flex' }}>
                        {playerASet.map((card, id) => {
                            let d = card.includes(diamond);
                            let h = card.includes(heart);
                            return (
                                <div key={id}>
                                    {/* card.length !== 0 condition added to not show blank space 
                                if an array is empty in player set */}
                                    {card.length !== 0 ?
                                        <div style={{ display: 'flex' }}>
                                            {playerASet.length !== 13 ?
                                                <>
                                                    {card.map((card, sIndex) => {
                                                        let d = card.includes(diamond);
                                                        let h = card.includes(heart);
                                                        return (
                                                            <div key={sIndex}>
                                                                {currentPlayer === 'A' ? <label className="container">
                                                                    <input className='inputSelected' type='checkbox' onChange={(e) => handleSelect(e.target.checked, card)} />
                                                                    <span className="checkmark" />
                                                                </label> : null}
                                                                <button className='card'>
                                                                    {/* <h2>{card}</h2> */}
                                                                    <h2 style={{ color: d || h ? 'red' : '' }}>{card}</h2>
                                                                </button>
                                                            </div>
                                                        )
                                                    })}
                                                    <div className="middleSpace"></div>
                                                </> :
                                                <>
                                                    {currentPlayer === 'A' ? <label className="container">
                                                        <input className='inputSelected' type='checkbox' onChange={(e) => handleSelect(e.target.checked, card)} />
                                                        <span className="checkmark" />
                                                    </label> : null}
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <button className='card'>
                                                            {/* <h2>{card}</h2> */}
                                                            <h2 style={{ color: d || h ? 'red' : '' }}>{card}</h2>
                                                        </button>
                                                        {/* {(currentPlayer === 'A' && picked) && <button className='discardButton' onClick={() => handleDiscard(card)}>
                                                            {'Discard'}
                                                        </button>} */}
                                                    </div>
                                                </>
                                            }
                                        </div> : null
                                    }
                                </div>
                            )
                        })}
                    </div>
                    <h2 style={{ marginRight: '25px' }}>PLAYER B</h2>
                    <div style={currentPlayer === 'B' ? focusPlayer : { display: 'flex' }}>
                        {playerBSet.map((card, id) => {
                             let d = card.includes(diamond);
                             let h = card.includes(heart);
                            return (
                                <div key={id}>
                                    {/* card.length !== 0 condition added to not show blank space 
                                if an array is empty in player set */}
                                    {card.length !== 0 ?
                                        <div style={{ display: 'flex' }}>
                                            {playerBSet.length !== 13 ?
                                                <>
                                                    {card.map((card, sIndex) => {
                                                         let d = card.includes(diamond);
                                                         let h = card.includes(heart);
                                                        return (
                                                            <div key={sIndex}>
                                                                {currentPlayer === 'B' ? <label className="container">
                                                                    <input className='inputSelected' type='checkbox' onChange={(e) => handleSelect(e.target.checked, card)} />
                                                                    <span className="checkmark" />
                                                                </label> : null}
                                                                <button className='card'>
                                                                    {/* <h2>{card}</h2> */}
                                                                    <h2 style={{ color: d || h ? 'red' : '' }}>{card}</h2>
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
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <button className='card'>
                                                            {/* <h2>{card}</h2> */}
                                                            <h2 style={{ color: d || h ? 'red' : '' }}>{card}</h2>
                                                        </button>
                                                        {/* {(currentPlayer === 'B' && picked) && <button className='discardButton' onClick={() => handleDiscard(card)}>
                                                            {'Discard'}
                                                        </button>} */}
                                                    </div>
                                                </>
                                            }
                                        </div> : null
                                    }
                                </div>
                            )
                        })}
                    </div>



                </>
            }
            {selectedCards.length !== 0 &&
                <>
                    <button className='button' onClick={() => handleClearSelection()}>Clear selection</button>
                    {selectedCards.length >= 2 && <button className='button' onClick={() => handleGroupSubset(currentPlayer)}>Group</button>}
                    {(selectedCards.length === 1 && picked) && <button className='button' onClick={() => handleDiscard()}>Discard</button>}
                </>
            }
        </>
    )
};