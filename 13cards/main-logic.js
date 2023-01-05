let declaredSet = [
    ['2♧', '4♧', '9♧'],
    ['1♧', '1♧', '1♧'],
    ['9♢', '7♧', '13♧', '6♧'],
    ['10♢', '11♧', '09♧']
];

const club = '♧';
const heart = '♡';
const spade = '♤';
const diamond = '♢';

// let symbol = ''; // for single array

// below code is for single array

let idsOfSameSymbolsInSubset = []; // this array stores the subset ids where all symbols are same to validate trill 
let idsOfSameNumbersInSubset = []; // this array stores the subset ids where all numbers are same 
let idsOfSequenceInSubset = []; // this array stores the subset ids where all numbers are in sequence 
// to validate trill

let a = declaredSet.forEach((subSet, subSetId) => {

    // check for symbols
    let symbols = ['♧', '♡', '♤', '♢']
    symbols.forEach(symbol => {
        let checkSymbolInEachArray = subSet.filter(i => i.includes(symbol)).length;
        [checkSymbolInEachArray].forEach(lengthOfSubSetSymbol => {
            if (lengthOfSubSetSymbol === subSet.length) {
                idsOfSameSymbolsInSubset.push(parseInt(subSetId))
            }
        });
    })

    //check for same numbers and numbers in order
    let subSetsWithoutSymbols = []
    subSet.forEach(e => {
        let splitE = e.split('')
        splitE.pop()
        let joined = splitE.join('')
        subSetsWithoutSymbols.push(parseInt(joined))
    });
    let isSubsetWithSameNumber = subSetsWithoutSymbols.every(e => e === subSetsWithoutSymbols[0]);
    if (isSubsetWithSameNumber) {
        idsOfSameNumbersInSubset.push(parseInt(subSetId))
    }

    //check for sequence
    let sortArray = subSetsWithoutSymbols.map(e => e).sort((x, y) => x - y);
    let diffInElements = sortArray.slice(1).map((n, i) => n - sortArray[i])
    const isDifference = diffInElements.every(value => value == 1)
    if (isDifference) {
        idsOfSequenceInSubset.push(subSetId)
    }

})
if (idsOfSequenceInSubset.length === 0) {
    console.log('there are no sequence subsets');
} else {
    console.log('subsets have sequence : ', idsOfSequenceInSubset);
}
if (idsOfSameNumbersInSubset.length === 0) {
    console.log('there are no same number subsets');
} else {
    console.log('subsets have same numbers : ', idsOfSameNumbersInSubset)
}

if (idsOfSameSymbolsInSubset.length === 0) {
    console.log('there are no same symbol subsets')
} else {
    console.log('subsets have same symbols : ', idsOfSameSymbolsInSubset)
}


// below code is for single array

// function checkSymbol(arr) {
//     let firstSymbolInArray = declaredSet[0].split('')[1];
//     let x = arr.filter(e => e.includes(firstSymbolInArray)).length === declaredSet.length;
//     if (x) {
//         let s = declaredSet[0].split('')[1];
//         return symbol = s;
//     } else return false;
// };
// checkSymbol(declaredSet);

// // to validate sequence and trill
// function checkIfSymbolsAreSame(arr, symbol) {
//     if (symbol === club) {
//         return arr.filter(e => e.includes(club)).length === declaredSet.length;
//     } else if (symbol === heart) {
//         return arr.filter(e => e.includes(heart)).length === declaredSet.length;
//     } else if (symbol === spade) {
//         return arr.filter(e => e.includes(spade)).length === declaredSet.length;
//     } else if (symbol === diamond) {
//         return arr.filter(e => e.includes(diamond)).length === declaredSet.length;
//     } else return false;
// }
// console.log('all symbols are same :', checkIfSymbolsAreSame(declaredSet, symbol));


// function sortNumbers(arr) {
//     let sortArr = arr.map(e => e.replace(symbol, '')).sort((x, y) => x - y);
//     return sortArr;
// }
// sortNumbers(declaredSet);


// function checkIfSameNumbers(arr) {
//     let same = arr.every(v => v === arr[0]);
//     return console.log('all numbers are same : ', same);
// }
// checkIfSameNumbers(sortNumbers(declaredSet))

// let numbersInSequence = false;
// function checkIfSequential(arr) {
//     const differenceAry = arr.slice(1).map(function (n, i) { return n - arr[i]; })
//     const isDifference = differenceAry.every(value => value == 1)
//     console.log('all numbers are in order : ', isDifference);
//     return numbersInSequence = true;
// }

// checkIfSequential(sortNumbers(declaredSet));
