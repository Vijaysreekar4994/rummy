import './cardsAvatar.css'

export const CardsAvatar = (props) => {
  const heart = '\u2665';// heart '♥' 5 | '♡' 1
  const spade = '\u2664';// spade symbol '♠' 0 | 4
  const diamond = '\u2666'; // diamond '♦' 6 | 2
  
  let d = props.jocker[0].includes(diamond);
  let h = props.jocker[0].includes(heart);
  return (
    <div className="jockerAndAllCardsView">
      <div className="jockerView" style={{ color: d || h ? 'red' : '' }}>
        {/* A{spade} */}
        {props.jocker}
      </div>
      <div className="allCardsView">
        <div className="cardDesign">
          {`${spade.repeat(200)}`}
          {(props.currentPlayer && !props.picked) && <div className='pickAvatarAllCardsView'>
            <div className='pickAvatarAllCardsButton' onClick={() => props.pickFunction()}>
              {props.buttonName}
            </div>
          </div>}
        </div>
        {/* {(currentPlayer && !picked) &&  */}

        {/* } */}
      </div>
    </div>
  );
};