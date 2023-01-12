const PlayerView = (props) => {
    const [playerName, currentPlayer, playerSet, player] = props;
    const focusPlayer = {
        boxShadow: '2px 2px 2px 2px black',
        backgroundColor: 'white',
        display: 'flex',
        borderRadius: '15px',
        flexWrap: 'wrap',
        padding: '15px',
        margin: '15px'
    };
    return <>
        <h2 style={{ marginRight: '25px' }}>{playerName}</h2>
        <div style={currentPlayer === 'B' ? focusPlayer : { display: 'flex' }}>
            {playerSet.map((cardSet, id) => {
                return (
                    <div key={id}>
                        {/* cardSet.length !== 0 condition added to not show blank space 
                            if an array is empty in player set */}
                        {cardSet.length !== 0 ?
                            <div style={{ display: 'flex' }}>
                                {playerSet.length !== 13 ?
                                    <>
                                        {cardSet.map((card, sIndex) => {
                                            return (
                                                <div key={sIndex}>
                                                    {currentPlayer === player ?
                                                        <label className="container">
                                                            <input
                                                                id={sIndex}
                                                                className='inputSelected'
                                                                type='checkbox'
                                                                // onChange={(e) => handleSelect(e.target.checked, card)}
                                                            />
                                                            <span className="checkmark" />
                                                        </label> : null}
                                                    <button className='card'>
                                                        <h2>{card}</h2>
                                                    </button>
                                                </div>
                                            )
                                        })}
                                        <div className="middleSpace"></div>
                                    </> :
                                    <>
                                        {currentPlayer === 'B' ? <label className="container">
                                            <input className='inputSelected' type='checkbox' 
                                            // onChange={(e) => handleSelect(e.target.checked, cardSet)} 
                                            />
                                            <span className="checkmark" />
                                        </label> : null}
                                        <button className='card'>
                                            <h2>{cardSet}</h2>
                                        </button>
                                        {/* {(currentPlayer === 'B' && picked) && 
                                        <button className='discardButton' onClick={() => handleDiscard(cardSet)}>
                                            {'Discard'}
                                        </button>} */}
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