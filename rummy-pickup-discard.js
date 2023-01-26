let playerA = ['6♣', '12♠', '8♦', '10♣', '1♣', '3♥', '6♦', '9♣', '9♠', '13♠', '4♥', '12♥', '6♥'];
let playerB = ['2♣', '11♥', '3♣', '9♦', '6♠', '2♦', '4♠', '8♥', '13♦', '1♠', '8♠', '4♣', '3♠'];
let openCard = ['10♠'];
let joker = ['12♦'];
let cards = ['7♣', '4♦', '11♣', '12♣', '11♠', '13♣', '7♥', '10♦', '9♥', '7♦', '13♥', '5♥', '5♦', '10♥', '7♠', '8♣', '5♠', '1♥', '2♠', '1♦', '☆', '3♦', '5♣', '2♥', '11♦'];
console.log('openCard at first', openCard);
let playerADiscarded = playerA.splice(0,1);
console.log('playerA discarded card', playerADiscarded); //player A discarded card
let playerPickedFromopenCard = true;
let playerPickedFromCards = true;
console.log('playerA', playerA.concat(openCard));
openCard.splice(0,1);
openCard.push(playerADiscarded[0]);
console.log('openCard after ', openCard);