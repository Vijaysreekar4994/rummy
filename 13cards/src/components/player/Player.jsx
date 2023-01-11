import './player.css'

export const Player = (props) => {
    const focusPlayer = { boxShadow: '2px 2px 2px 2px black', backgroundColor: 'white' };
    const [picked, currentPlayer, player, playerSet, selectedCards, setSelectedCards] = props;

    // function handleSelect(target, card) {
    //     if (target) {
    //         setSelectedCards(
    //             [
    //                 ...selectedCards,
    //                 card
    //             ]
    //         );
    //     } else {
    //         let a = selectedCards.filter(e => e !== card);
    //         setSelectedCards(a);
    //     }
    // };

    // function handleDiscard(discarded) {
    //     if (currentPlayer === 'A') {
    //         let filteredPlayerACards = playerASet.filter(card => card !== discarded);
    //         setPlayerASet(filteredPlayerACards);
    //         setPicked(false);
    //         setCurrentPlayer('B')
    //         setOpenCards([discarded]);
    //     }
    //     if (currentPlayer === 'B') {
    //         let filteredPlayerBCards = playerBSet.filter(card => card !== discarded);
    //         setPlayerBSet(filteredPlayerBCards);
    //         setPicked(false);
    //         setCurrentPlayer('A')
    //         setOpenCards([discarded]);
    //     }
    // };

    return (
        <div className='playerAContainer' style={currentPlayer === 'A' ? focusPlayer : {}}>
            <h2 style={{ marginRight: '25px' }}>{player}</h2>
            {playerSet.map((card, id) => {
                return <>
                    <div className='playerCardContainer' key={id}>
                        <label className="container">
                            <input
                                className='inputSelected'
                                type='checkbox'
                            // onChange={(e) => handleSelect(e.target.checked, card)}
                            />
                            <span className="checkmark" />
                        </label>
                        <button className='card'>
                            <h2>{card}</h2>
                        </button>
                        {(currentPlayer === 'A' && picked) &&
                            <button
                                className='discardButton'
                            // onClick={() => handleDiscard(card)}
                            >
                                {'Discard'}
                            </button>}
                    </div>
                </>
            })}
        </div>
    );
};