'use strict';
// node modules
const http = require('http');
const url = require('url');
const queryString = require('querystring');
// npm modules
const cowsay = require('cowsay');
// app modules
const parseBody = require('./lib/parse-body');
const badRequest = require('./model/bad-request');
const cowsayHTML = require('./lib/cowsay-html');
// module constants
const PORT = process.env.PORT || 3000;
// module logic
const server = http.createServer(function(req, res){
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);

  if(req.method === 'GET' && req.url.pathname === '/api/cowsay'){
    if(!req.url.query.text){
      return badRequest(res);
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(cowsayHTML(req.url.query.text));
    res.end();
    return;
  }
  if(req.method === 'POST' && req.url.pathname === '/api/cowsay'){
    return parseBody(req, function(err, body){
      if (err){
        return badRequest(res);
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.write(cowsay.say({text: body.text || 'default text'}));
      res.end();
    });
  }
  res.statusCode = 404;
  res.write('Not Found Friend');
  res.end();
});
server.listen(PORT, function(){
  console.log('server is money! $o*o$', PORT);
});
