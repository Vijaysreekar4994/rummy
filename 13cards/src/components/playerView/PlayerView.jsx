const PlayerView = (props) => {

    const focusPlayerA = {
        boxShadow: '2px 2px 2px 5px black',
        backgroundColor: '#606060',
        display: 'flex',
        borderRadius: '15px',
        flexWrap: 'wrap',
        padding: '15px',
        margin: '15px'
    };
    const focusPlayerB = {
        boxShadow: '2px 2px 2px 5px black',
        backgroundColor: '#606060',
        display: 'flex',
        borderRadius: '15px',
        flexWrap: 'wrap',
        padding: '15px',
        margin: '15px'
    };

    const club = '\u2663';// club '♣' 3 |'♧' 7
    const heart = '\u2665';// heart '♥' 5 | '♡' 1
    const spade = '\u2660';// spade symbol '♠' 0
    const diamond = '\u2666'; // diamond '♦' 6 | 2

    function handleSelect(selected, card) {
        if (selected) {
            props.setSelectedCards(
                [
                    ...props.selectedCards,
                    card
                ]
            );
        } else {
            let a = props.selectedCards.filter(e => e !== card);
            props.setSelectedCards(a);
        }
    };

    return (
        <>
            <h2 style={{ marginRight: '25px' }}>{props.playerName}</h2>
            <div style={{display:'flex'}}
            // style={props.currentPlayer === 'A' ? focusPlayerA : focusPlayerB}
            >
                {props.playerSet.map((card, id) => {
                    let d = card.includes(diamond);
                    let h = card.includes(heart);
                    return (
                        <div key={id}>
                            {/* card.length !== 0 condition added to not show blank space 
                                if an array is empty in player set */}
                            {card.length !== 0 ?
                                <div style={{ display: 'flex' }}>
                                    {props.playerSet.length !== 13 ?
                                        <>
                                            {card.map((card, sIndex) => {
                                                let d = card.includes(diamond);
                                                let h = card.includes(heart);
                                                return (
                                                    <div key={sIndex}>
                                                        {props.currentPlayer === 'A' ? <label className="container">
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
                                            {props.currentPlayer === 'A' ? <label className="container">
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
        </>
    )
}