
'use stict';

const cowsay = require('cowsay');

module.exports = function(text){
  console.log('cow function');
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
