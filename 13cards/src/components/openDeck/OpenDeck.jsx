import './openDeck.css'

export const OpenDeck = (props) => {
    return (
        <div className='openCardsContainerView'>
            <div className='openCardsContainer'>
                {props.currentPlayer &&
                    <div className='openDeckView'>
                        <h3>OPEN DECK</h3>
                    </div>
                }
                {props.openCards.map((card, id) => {
                    return <div className='card' key={id}>
                        <h2>{card}</h2>
                    </div>
                })}
                {(props.currentPlayer && !props.picked) ?
                    <div className='pickFromAllCardsButton' onClick={() => props.handlePick()}>
                        <h2>Pick</h2>
                    </div> :
                    <div className='card' />
                }
            </div>
        </div>
    );
};