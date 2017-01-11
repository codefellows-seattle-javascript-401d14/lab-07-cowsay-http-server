'use strict';

const cowsay = require('cowsay');

module.exports = function(text) {
  let cowsayConfig = { text: text || 'default text'};
  return `<!DOCTYPE html>
  <html>
  <body>
  <pre>
  ${cowsay.say(cowsayConfig)}
  </pre>
  </body>
  </html>`;
};
