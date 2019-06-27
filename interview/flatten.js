function flatten(array) {
}



console.log(flatten([1, 2, [3, 4]])); //  => [1, 2, 3, 4]
console.log(flatten([[1], [2], [[3], 4]])); //  => [1, 2, 3, 4]
console.log(flatten([1, 2, 3, 4])); // => [1, 2, 3, 4]
console.log(flatten([[[1]], [[[2]]], [[3], 4]])); //  => [1, 2, 3, 4]
