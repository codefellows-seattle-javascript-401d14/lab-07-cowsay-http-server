'use strict';
const cowsay = require('cowsay');

module.exports = function(res){
  let defulatMessage = 'bad request';
  res.statusCode = 400;
  res.setHeader('Content-Type', 'text/plain');
  res.write(cowsay.say({text: defulatMessage, f: 'dragon'}));
  res.end();
  return;
};
