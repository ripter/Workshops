/*
 Given an array "edges" of the form [[parent, child], [parent, child], ...],
 write a function depsort(edges) that returns a single array of nodes sorted
 such that any "child" must appear BEFORE its "parent". e.g.:
  depsort([[1, 2], [2, 3], [2,  4]]) => [4, 3, 2, 1]  (Or [3, 4, 2, 1])
*/
function depsort(edges) {
}



console.log(depsort([['eggs', 'cheese'], ['cheese', 'milk'], ['cheese', 'flour']]))
// => ['milk', 'flour', 'cheese', 'eggs']
// => ['flour', 'milk', 'cheese', 'eggs']
