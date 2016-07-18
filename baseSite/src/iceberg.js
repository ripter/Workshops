// The fif gives us an API that we can use to refrence things on the parent page.
const $ = window.API.$;
const app = require('./app.jsx');

// Get the element on the surface and start the React app.
const elApp = $('#app');
app(elApp[0])

// The page jquery is 1.11.3
// We are using the jquery from surface.js version 3.1.0
console.log('iceberg jquery version:', $().jquery);
