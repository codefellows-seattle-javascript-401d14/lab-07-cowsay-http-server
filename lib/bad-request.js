'use strict';
const cowsay = require('cowsay');

module.exports = function(res){
  let defaultMessage = 'bad request';
  res.statusCode = 400;
  res.setHeader('Content-Type', 'text/plain');
  res.write(cowsay.say({text: defaultMessage, f: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
  res.end();
};
