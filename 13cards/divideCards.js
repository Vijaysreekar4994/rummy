let set = ['1♣', '2♠', '3♦', '4♣'];
let selected = ['1♣', '2♠'];

let newArray = [];
selected.forEach(card => {
    for (var i = 0; i < set.length; i++) {
        if (set[i] === card) {
            set.splice(i, 1);
        }
    }
})
newArray.push(set, selected)
console.log(newArray)
