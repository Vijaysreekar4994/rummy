import './cardsAvatar.css'

export const CardsAvatar = (props) => {
  const spade = '\u2664 ';
  return (
    <div className="jockerAndAllCardsView">
      <div className="jockerView">
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