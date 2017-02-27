import App from './app.js';

test('is object', () => {
  expect(typeof App).toBe('object');
});

test('message talks about rose', () => {
  const actual = App.data();
  expect(actual.message).toEqual(expect.stringContaining('Rose'));
});
