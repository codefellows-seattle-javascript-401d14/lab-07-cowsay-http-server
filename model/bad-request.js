'use strict';
const cowsay = require('cowsay');

module.exports = function(res) {
  let defaultMessage = `
  **bad request**
  CLI-example: http localhost:3000/api/cowsay?text=lulwat
  Browser-example: http://localhost:3000/api/cowsay?text=whatever
`;
  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write(cowsay.say({
    text: defaultMessage,
    f: 'vader',
  }));
  res.end();
};
