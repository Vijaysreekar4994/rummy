import { combination } from "../data/combinations.js";
// const playerSet = [
//     [
//         "10 ♦",
//         "J ♦",
//         "9 ♦",
//         "8 ♦",
//         "7 ♦"
//     ],
//     [
//         "7 ♦",
//         "8 ♦",
//         "9 ♦"
//     ],
//     [
//         "J ♥",
//         "K ♥",
//         "Q ♥"
//     ],

// ];
// subsetValidation(playerSet)

// function removeDuplicates(arr) {
//     return arr.filter((item, index) => arr.indexOf(item) === index);
// }

export default function subsetValidation(playerSet) {

    let set = [];
    set = playerSet;

    //remove empty arrays from Player set
    for (let i = 0; i < set.length; i++) {
        if (set[i].length === 0) {
            set.splice(i, 1);
        }
    }

    // console.log(set)

    // following arrays will store valid subset ids 
    let idsOfSameSymbolsInSubset = []; // this array stores the subset ids where all symbols are same
    let idsOfDifferentSymbolsInSubset = []; // this array stores the subset ids where all symbols are different
    let idsOfSameNumbersInSubset = []; // this array stores the subset ids where all numbers are same 
    let idsOfSequenceInSubset = []; // this array stores the subset ids where all numbers are in sequence 
    let IdsOfValidCombination = []; // this array stores the subset ids where declared combinations are in sequence 



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
                // subSetsWithoutSymbols.push(parseInt(nums))
                subSetsWithoutSymbols.push(nums)
            });


            // check if Subset has valid combinations to validate sequence
            function arrayCompare(_arr1, _arr2) {
                // console.log('_arr1 :',_arr1);
                // console.log('_arr2 :',_arr2);
                if (
                    !Array.isArray(_arr1)
                    || !Array.isArray(_arr2)
                    || _arr1.length !== _arr2.length
                ) {
                    return false;
                }
                const arr1 = _arr1.concat().sort();
                const arr2 = _arr2.concat().sort();
                for (let i = 0; i < arr1.length; i++) {
                    if (arr1[i] !== arr2[i]) {
                        return false;
                    }
                }
                if (true) return IdsOfValidCombination.push(subSetId)
            }
            combination.forEach(ar => {
                arrayCompare(subSetsWithoutSymbols, ar);
            })
            // console.log('ff :', );


            // check if Subset Symbols Are Non-Identitical
            let check = subSetsWithoutNumbers.filter((el, i) => subSetsWithoutNumbers.indexOf(el) !== i);
            if (!check.length &&
                subSetsWithoutNumbers.length >= 3 &&
                subSetsWithoutNumbers.length <= 4) {
                idsOfDifferentSymbolsInSubset.push(subSetId);
            }

            // console.log('TEST 1 :', subSetsWithoutSymbols);

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


    // if (idsOfSequenceInSubset.length === 0) {
    //     console.log('there are no subsets which have all numbers are in sequence');
    // } else {
    //     console.log('subsets have all numbers are in sequencial order : ', idsOfSequenceInSubset);
    // }
    // if (idsOfSameNumbersInSubset.length === 0) {
    //     console.log('there are no same number subsets');
    // } else {
    //     console.log('subsets numbers are identical : ', idsOfSameNumbersInSubset)
    // }
    // if (idsOfSameSymbolsInSubset.length === 0) {
    //     console.log('subsets symbols are non-identical')
    // } else {
    //     console.log('subsets symbols are identical : ', idsOfSameSymbolsInSubset)
    // }
    // if (idsOfDifferentSymbolsInSubset.length === 0) {
    //     console.log('there are no subsets which have all different symbols')
    // } else {
    //     console.log('subsets have all different symbols : ', idsOfDifferentSymbolsInSubset)
    // }
    // if (IdsOfValidCombination.length === 0) {
    //     console.log('there are no subsets which have valid combinations')
    // } else {
    //     console.log('subsets with valid combinations : ', removeDuplicates(IdsOfValidCombination))
    // }


    let setSeq = [];
    let setTri = [];
    const validateSubsets = (a, b, subset) => {
        // console.log('a :', a);
        // console.log('b :', b);
        if (a.length === 0 || b.length === 0) return false;
        const elements = new Set([...a, ...b]);
        // console.log('elements :', elements);
        for (const x of elements) {
            let count1 = b.filter(e => e === x).length;
            let count2 = b.filter(e => e === x).length;
            // console.log('count1 :', count1);
            // console.log('count2 :', count1);
            let aFilter = a.filter(e => e === x);
            let bFilter = b.filter(e => e === x);
            if (aFilter.length !== 0 && bFilter.length !== 0) {
                if (subset === 'seq') {
                    setSeq.push(parseInt(aFilter.join()))
                }
                if (subset === 'tri') {
                    setTri.push(parseInt(bFilter.join()))
                }
                // console.log('aFilter', aFilter)
            }        // console.log('aFilter', aFilter);
            if (count1 !== count2) return false;
        }
        return true;
    }



    // check sequence
    let aa = idsOfSequenceInSubset;
    let bb = idsOfSameSymbolsInSubset;
    // console.log(aa);
    // console.log(bb);
    if (validateSubsets(aa, bb, 'seq')) {
        // console.log('setSeq :', setSeq);
        console.log("there is a valid sequence.");
    }
    else {
        console.log("NO SEQUENCE.")
    }

    // check pre-declared combination sequence
    let aaa = IdsOfValidCombination;
    let bbb = idsOfSameSymbolsInSubset;
    if (validateSubsets(aaa, bbb, 'seq')) {
        console.log("there is a valid combination sequence.");
    }
    else {
        console.log("NO COMBINATION SEQUENCE.")
    }

    // check trill
    let aaaa = idsOfDifferentSymbolsInSubset;
    let bbbb = idsOfSameNumbersInSubset;
    // console.log(aaaa);
    // console.log(bbbb);
    if (validateSubsets(aaaa, bbbb, 'tri')) {
        // console.log('setTri :', setTri);
        console.log("there is a valid trill.");
    }
    else {
        console.log("NO TRILL.");
    }

    let subsetIds = [];
    let validSets = subsetIds.concat(setSeq, setTri)
    // console.log('validSets :', validSets)
    return validSets;
}
