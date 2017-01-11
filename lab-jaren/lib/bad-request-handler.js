'use strict';

const cowsay = require('cowsay');

module.exports = function(response) {
  let cowsayConfig = {text: 'bad request\ntry: localhost:3000/cowsay?text=howdy', f:'dragon-and-cow'};
  response.statusCode = 400;
  response.write(`<!DOCTYPE html>
  <html>
  <body>
  <pre>
  ${cowsay.say(cowsayConfig)}
  </pre>
  </body>
  </html>`);
  response.end();
  return;
};
