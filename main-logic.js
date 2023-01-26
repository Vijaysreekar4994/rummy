// let declaredSet = [
//     ['2♧', '4♧', '9♧'],
//     ['1♧', '1♧', '1♧'],
//     ['9♢', '7♧', '13♧', '6♧'],
//     ['10♢', '11♧', '09♧']
// ];
let declaredSet = [
    [
        "J♥",
        "3♥",
        "A♦",
        "J♦",
        "K♣"
    ],
    [
        "7♦",
        "7♠",
        "7♣"
    ],
    [
        "7♦",
        "7♠",
        "8♣"
    ],
    [
        "7♠"
    ],
    [
        "6♦",
        "5♦",
        "7♦",
        "8♦"
    ]
]

const club = '♣';
const heart = '♥';
const spade = '♠';
const diamond = '♦';

// let symbol = ''; // for single array

// below code is for single array

let idsOfSameSymbolsInSubset = []; // this array stores the subset ids where all symbols are same
let idsOfDifferentSymbolsInSubset = []; // this array stores the subset ids where all symbols are different
let idsOfSameNumbersInSubset = []; // this array stores the subset ids where all numbers are same 
let idsOfSequenceInSubset = []; // this array stores the subset ids where all numbers are in sequence 
// to validate trill


// let sy = ['♣', '♥', '♠', '♦'];

// let aaa = ["7♦", "5♥"]
// let symbs = [];
// aaa.forEach(e => {
//     let split = e.split('');
//     let sym = split.pop()
//     symbs.push(sym)
// })

function checkDuplicates(arr) {
    // console.log('arr : ', arr);
    let check = arr.filter((el, i) => arr.indexOf(el) !== i);
    // console.log('check : ', check);
    if (!check.length &&
        arr.length >= 3 &&
        arr.length <= 4) {
        // console.log('all symbols are different and OK to validate TRILL - (numbers to be checked)');
        // console.log('------------------------------------');
        return true;
    } else {
        // console.log(check, 'duplicates found or no valid length of subset');
        // console.log('------------------------------------');
        return false;
    }

}

// checkDuplicates(symbs);


let a = declaredSet.forEach((subSet, subSetId) => {

    let symbols = ['♣', '♥', '♠', '♦'];

    // check for all symbols are not identical in subset
    // let subSetsWithSymbolsOnly = []
    // subSet.forEach(e => {
    //     let splitE = e.split('')
    //     let x = splitE.pop()
    //     // let joined = splitE.join('')
    //     // console.log(x.length)
    //     subSetsWithSymbolsOnly.push(x)
    // });
    // console.log(subSetsWithSymbolsOnly);
    // let isSubsetWithDuplicateSymbols = subSetsWithSymbolsOnly.filter((el, idx) => {
    //     // if (subSetsWithSymbolsOnly.length === 4) {
    //         // console.log(idx);
    //         subSetsWithSymbolsOnly.indexOf(el) != idx
    //     // }
    // });
    // console.log(isSubsetWithDuplicateSymbols);


    // check for all symbols are identical in subset
    symbols.forEach(symbol => {
        let checkSymbolInEachArray = subSet.filter(i => i.includes(symbol)).length;
        [checkSymbolInEachArray].forEach(lengthOfSubSetSymbol => {
            if ((lengthOfSubSetSymbol === subSet.length) && subSet.length >= 3) {
                idsOfSameSymbolsInSubset.push(parseInt(subSetId))
            }
        });
    })


    let subSetsWithoutSymbols = []
    let subSetsWithoutNumbers = []

    //remove symbols from all subsets 
    subSet.forEach(e => {
        let splitE = e.split('')
        let symbs = splitE.pop();
        // console.log(symbs);
        subSetsWithoutNumbers.push(symbs)
        let nums = splitE.join('');
        subSetsWithoutSymbols.push(parseInt(nums))
    });

    // console.log(checkDuplicates(subSetsWithoutNumbers))
    if(checkDuplicates(subSetsWithoutNumbers)){
        // console.log(subSetId);
        idsOfDifferentSymbolsInSubset.push(subSetId);
    }

    // check whether numbers are all identical
    let isSubsetWithSameNumbers = subSetsWithoutSymbols.every(e => e === subSetsWithoutSymbols[0]);
    if (isSubsetWithSameNumbers && subSet.length >= 3) {
        idsOfSameNumbersInSubset.push(parseInt(subSetId))
    }

    // console.log('TESTT', subSetsWithoutNumbers)
    // let isSubsetWithDifferentSymbols = subSetsWithoutNumbers.

    //check for sequence
    let sortArray = subSetsWithoutSymbols.map(e => e).sort((x, y) => x - y);
    let diffInElements = sortArray.slice(1).map((n, i) => n - sortArray[i]);
    const isDifference = diffInElements.every(value => value == 1)
    // console.log(isDifference);
    if (isDifference && subSet.length >= 3) {
        idsOfSequenceInSubset.push(subSetId)
    }

})
if (idsOfSequenceInSubset.length === 0) {
    console.log('there are no subsets which have all numbers are in sequence');
} else {
    console.log('subsets have all numbers are in sequencial order : ', idsOfSequenceInSubset);
}
if (idsOfSameNumbersInSubset.length === 0) {
    console.log('there are no same number subsets');
} else {
    console.log('subsets numbers are identical : ', idsOfSameNumbersInSubset)
}

if (idsOfSameSymbolsInSubset.length === 0) {
    console.log('there are no same symbol subsets')
} else {
    console.log('subsets symbols are identical : ', idsOfSameSymbolsInSubset)
}
if (idsOfDifferentSymbolsInSubset.length === 0) {
    console.log('there are no subsets which have all different symbols')
} else {
    console.log('subsets have all different symbols : ', idsOfDifferentSymbolsInSubset)
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
