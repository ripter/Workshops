# When do you use Arrow functions?

What is the difference between arrow functions and normal functions?
It all comes down to this little part of the

Arrow functions set `this` based on [lexical scope](http://stackoverflow.com/questions/1047454/what-is-lexical-scope).

```
function outer() {
  console.log('outer', this);
  return ['one', 'two', 'three'].filter((item) => {
    console.log('inner', this);
    return item === this.query;
  });
}
outer.call({query: 'two'}); // ["two"]
// outer Object {query: "two"}
// inner Object {query: "two"}
// inner Object {query: "two"}
// inner Object {query: "two"}
```


## Rule of Thumb:
* Are you using `this` anywhere in your function?
  * No: `() => {}`
  * Do you want `this` to be the lexical environment?
    * Yes: `() => {}`
    * No: `function() {}`


[spec function initalize](http://www.ecma-international.org/ecma-262/7.0/index.html#sec-functioninitialize)
> 9. If kind is Arrow, set the [[ThisMode]] internal slot of F to lexical.
> 10. Else if Strict is true, set the [[ThisMode]] internal slot of F to strict.
> 11. Else set the [[ThisMode]] internal slot of F to global.

[arrow runtime evaluation](http://www.ecma-international.org/ecma-262/7.0/index.html#sec-arrow-function-definitions-runtime-semantics-evaluation)
> An ArrowFunction does not define local bindings for arguments, super, this, or new.target. Any reference to arguments, super, this, or new.target within an ArrowFunction must resolve to a binding in a lexically enclosing environment.


Because arrow functions set `this` based on lexical context, that means
* [`Function.apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
* [`Function.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
* [`Function.call`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

do not work on arrow functions.
