import './openDeck.css'

export const OpenDeck = (props) => {
    const heart = '\u2665';// heart '♥' 5 | '♡' 1
    const diamond = '\u2666'; // diamond '♦' 6 | 2
    // console.log(props.jocker);
    return (
        <div className='openCardsContainerView'>
            <div className='openCardsContainer'>
                {props.currentPlayer &&
                    <div className='openDeckView'>
                        <h3>OPEN DECK</h3>
                    </div>
                }
                {props.openCards.map((card, id) => {
                      let d = card.includes(diamond);
                      let h = card.includes(heart);
                    return <button className='card' key={id}>
                        <h2 style={{ color: d || h ? 'red' : '' }}>{card}</h2>
                    </button>
                })}
                {(props.currentPlayer && !props.picked) ?
                    <button className='pickFromAllCardsButton' onClick={() => props.handlePick()}>
                        <h4>Pick</h4>
                    </button> :
                    <div className='card' />
                }
            </div>
        </div>
    );
};