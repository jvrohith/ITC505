const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

const publicPath = path.join(__dirname, 'public');
server.use(express.static(publicPath));

// Random number route
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Mad lib POST route
server.post('/ITC505/lab-7/index.html', (req, res) => {
  const { noun, verb, adjective, adverb, pluralNoun } = req.body;
  if (!noun || !verb || !adjective || !adverb || !pluralNoun) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields</p>
      <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
    `);
    return;
  }

  const madLib = `
    Once upon a time, a ${adjective} ${noun} decided to ${verb} ${adverb} through the land of ${pluralNoun}.
    It was a journey filled with wonder, laughter, and adventure.
  `;

  res.send(`
    <h1>Mad Lib Result</h1>
    <p>${madLib}</p>
    <a href="/ITC505/lab-7/index.html">Try Again</a>
  `);
});

// Port config
let port = 8080;
if (process.argv[2] === 'local') {
  port = 8080;
}
server.listen(port, () => console.log(`Ready on localhost:${port}!`));