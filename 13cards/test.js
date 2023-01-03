let a = ['2♧', '4♧', '3♧', '5♧'];

const club = '♧';
const heart = '♡';
const spade = '♤';
const diamond = '♢';

let symbol = '';

function checkSymbol(arr) {
    let firstSymbolInArray = a[0].split('')[1];
    let x = arr.filter(e => e.includes(firstSymbolInArray)).length === a.length;
    if (x) {
        let s = a[0].split('')[1];
        return symbol = s;
    } else return false;
};
checkSymbol(a);

// to validate sequence and trill
function checkIfSymbolsAreSame(arr, symbol) {
    if (symbol === club) {
        return arr.filter(e => e.includes(club)).length === a.length;
    } else if (symbol === heart) {
        return arr.filter(e => e.includes(heart)).length === a.length;
    } else if (symbol === spade) {
        return arr.filter(e => e.includes(spade)).length === a.length;
    } else if (symbol === diamond) {
        return arr.filter(e => e.includes(diamond)).length === a.length;
    } else return false;
}
console.log('all symbols are same :', checkIfSymbolsAreSame(a, symbol));


function sortNumbers(arr) {
    let sortArr = arr.map(e => e.replace(symbol, '')).sort((a, b) => a - b);
    return sortArr;
}
sortNumbers(a);


function checkIfSameNumbers(arr) {
    let same = arr.every(v => v === arr[0]);
    return console.log('all numbers are same : ', same);
}
checkIfSameNumbers(sortNumbers(a))

let numbersInSequence = false;
function checkIfSequential(arr) {
    const differenceAry = arr.slice(1).map(function (n, i) { return n - arr[i]; })
    const isDifference = differenceAry.every(value => value == 1)
    console.log('all numbers are in order : ', isDifference);
    return numbersInSequence = true;
}

checkIfSequential(sortNumbers(a));
