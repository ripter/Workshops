
// returns true/false if the object is empty `{}`
export function isEmpty(obj) {
  if (!obj) { return null; }
  return Object.keys(obj).length === 0;
}
