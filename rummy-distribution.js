let club = [];
let heart = [];
let spade = [];
let diamond = [];
let jocker = ['☆'];

for (let i=1;i<=13;i++){
    club.push(i+'♣'); // club '♣'
    heart.push(i+'♥'); // heart '♥'
    spade.push(i+'♠'); // spade symbol '♠'
    diamond.push(i+'♦'); // diamond '♦'
}
let set = club.concat(heart,spade,diamond,jocker);

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

let shuffledArray = shuffle(set);
console.log(shuffledArray)
console.log('PLAYER 1 : ',shuffledArray.splice(0,13))
console.log('PLAYER 2 : ',shuffledArray.splice(0,13))
console.log('OPEN : ','\n',shuffledArray.splice(0,1))
console.log('Jocker : ','\n',shuffledArray.splice(10,1))
console.log(shuffledArray)
