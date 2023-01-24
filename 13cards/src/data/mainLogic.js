
// let playerSet = [
//     [
//         "7♦",
//         "8♦",
//         "9♦"
//     ],
//     [
//         "7♦",
//         "8♦",
//         "9♦"
//     ],
//     [
//         "9♦",
//         "9♠",
//         "9♥"
//     ]
// ]
// function checkDuplicates(arr) {
//     let check = arr.filter((el, i) => arr.indexOf(el) !== i);
//     if (!check.length &&
//         arr.length >= 3 &&
//         arr.length <= 4) {
//         // console.log('all symbols are different and OK to validate TRILL - (numbers to be checked)');
//         // console.log('------------------------------------');
//         return true;
//     } else {
//         // console.log(check, 'duplicates found or no valid length of subset');
//         // console.log('------------------------------------');
//         return false;
//     }

// }

// checkDuplicates(symbs);


export default function subsetValidation(playerSet) {

    let set = [];
    set = playerSet;

    //remove empty arrays from Player set
    for (let i = 0; i < set.length; i++) {
        if (set[i].length === 0) {
            set.splice(i, 1);
        }
    }

    console.log(set)


    let idsOfSameSymbolsInSubset = []; // this array stores the subset ids where all symbols are same
    let idsOfDifferentSymbolsInSubset = []; // this array stores the subset ids where all symbols are different
    let idsOfSameNumbersInSubset = []; // this array stores the subset ids where all numbers are same 
    let idsOfSequenceInSubset = []; // this array stores the subset ids where all numbers are in sequence 



    {
        set.length !== 13 && set.forEach((subSet, subSetId) => {

            let symbols = ['♣', '♥', '♠', '♦'];

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
                subSetsWithoutNumbers.push(symbs)
                let nums = splitE.join('');
                subSetsWithoutSymbols.push(parseInt(nums))
            });

            // check if Subset Symbols Are Non-Identitical
            let check = subSetsWithoutNumbers.filter((el, i) => subSetsWithoutNumbers.indexOf(el) !== i);
            if (!check.length &&
                subSetsWithoutNumbers.length >= 3 &&
                subSetsWithoutNumbers.length <= 4) {
                idsOfDifferentSymbolsInSubset.push(subSetId);
            }


            // check whether numbers are all identical
            let isSubsetWithSameNumbers = subSetsWithoutSymbols.every(e => e === subSetsWithoutSymbols[0]);
            if (isSubsetWithSameNumbers && subSet.length >= 3) {
                idsOfSameNumbersInSubset.push(parseInt(subSetId))
            }

            //check for all numbers are in sequencial order
            let sortArray = subSetsWithoutSymbols.map(e => e).sort((x, y) => x - y);
            let diffInElements = sortArray.slice(1).map((n, i) => n - sortArray[i]);
            const isDifference = diffInElements.every(value => value == 1)
            if (isDifference && subSet.length >= 3) {
                idsOfSequenceInSubset.push(subSetId)
            }

        })
    }


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
        console.log('subsets symbols are non-identical')
    } else {
        console.log('subsets symbols are identical : ', idsOfSameSymbolsInSubset)
    }
    if (idsOfDifferentSymbolsInSubset.length === 0) {
        console.log('there are no subsets which have all different symbols')
    } else {
        console.log('subsets have all different symbols : ', idsOfDifferentSymbolsInSubset)
    }


    let setSeq = [];
    let setTri = [];
    const compareArrays = (a, b, subset) => {
        if (a.length === 0 || b.length === 0) return false;
        const elements = new Set([...a, ...b]);
        for (const x of elements) {
            let count1 = b.filter(e => e === x).length;
            let count2 = b.filter(e => e === x).length;
            let aFilter = a.filter(e => e === x);
            let bFilter = b.filter(e => e === x);
            // (aFilter.length !== 0 && bFilter.length !== 0) && console.log('aFilter', aFilter, 'bFilter', bFilter);
            if (aFilter.length !== 0 && bFilter.length !== 0) {
                if (subset === 'seq') {
                    setSeq.push(parseInt(aFilter.join()))
                }
                if (subset === 'tri') {
                    setTri.push(parseInt(bFilter.join()))
                }
                console.log('aFilter', aFilter)
            }        // console.log('aFilter', aFilter);
            if (count1 !== count2) return false;
        }
        return true;
    }



    // check sequence
    let aa = idsOfSequenceInSubset;
    let bb = idsOfSameSymbolsInSubset;
    // Comparing the arrays
    if (compareArrays(aa, bb, 'seq')) {
        // console.log('setSeq :', setSeq);
        console.log("there is a valid sequence.");
    }
    else {
        console.log("NO SEQUENCE.")
    }

    // check trill
    let aaaa = idsOfDifferentSymbolsInSubset;
    let bbbb = idsOfSameNumbersInSubset;
    if (compareArrays(aaaa, bbbb, 'tri')) {
        // console.log('setTri :', setTri);
        console.log("there is a valid trill.");
    }
    else {
        console.log("NO TRILL.");
    }

    let subsetIds = [];
    let validSets = subsetIds.concat(setSeq, setTri)
    console.log('validSets :', validSets)
    return validSets;
}
