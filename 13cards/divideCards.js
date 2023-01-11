let set = ['1♣', '2♠', '3♦', '12♣','11♣','10♣','14♣'];
let selected = ['1♣', '2♠'];
console.log('Actual set :', set);
console.log('selected :', selected);


let newArray = [];
selected.forEach(card => {
    for (var i = 0; i < set.length; i++) {
        if (set[i] === card) {
            set.splice(i, 1);
        }
    }
})
newArray.push(set, selected)
console.log('set 1 :',newArray)

let selected2 = ['12♣', '1♣']
console.log('selected2 :', selected2);
selected2.forEach(card => {
    newArray.forEach(arr => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === card) {
                arr.splice(i, 1);
            }
        }
    })
})

newArray.push(selected2)
console.log('set 2 :',newArray)

