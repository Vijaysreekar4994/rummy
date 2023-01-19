export default function PlayerView(props) {

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
            <div style={props.style}>
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
                                                        {props.inPlay && <label className="container">
                                                            <input className='inputSelected' type='checkbox' onChange={(e) => handleSelect(e.target.checked, card)} />
                                                            <span className="checkmark" />
                                                        </label>}
                                                        <button className='card'>
                                                            <h2 style={{ color: d || h ? 'red' : '' }}>{card}</h2>
                                                        </button>
                                                    </div>
                                                )
                                            })}
                                            <div className="middleSpace"></div>
                                        </> :
                                        <>
                                            {props.inPlay && <label className="container">
                                                <input className='inputSelected' type='checkbox' onChange={(e) => handleSelect(e.target.checked, card)} />
                                                <span className="checkmark" />
                                            </label>}
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <button className='card'>
                                                    <h2 style={{ color: d || h ? 'red' : '' }}>{card}</h2>
                                                </button>
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