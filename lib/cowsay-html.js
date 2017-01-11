'use strict';
const cowsay = require('cowsay');

module.exports = function cowsayHTML(text){
  console.log('client connected');
  let cowsayConfig = { text: text || 'default text' };
  return `<!DOCTYPE html>
  <html>
  <body>
  <h1> cowsay </h1>
  <pre>
  ${cowsay.say(cowsayConfig)}
  </pre>
  </body>
  </html>`;
};
