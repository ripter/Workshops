// Chunk
// Creates an array of elements split into groups the length of size.
// If array can't be split evenly, the final chunk will be the remaining elements.

// E.g
// chunk(['a', 'b', 'c', 'd'], 2)   =>  [['a', 'b'], ['c', 'd']]
// chunk(['a', 'b', 'c', 'd'], 3)   =>  [['a', 'b', 'c'], ['d']]
// chunk(['a', 'b', 'c', 'd'], 5)   =>  [ ['a', 'b', 'c', 'd'] ]


function chunk(arr, size) {
}


console.log(chunk(['a', 'b', 'c', 'd'], -1))
console.log(chunk(['a', 'b', 'c', 'd'], 2))
console.log(chunk(['a', 'b', 'c', 'd'], 3))
console.log(chunk(['a', 'b', 'c', 'd'], 10))
