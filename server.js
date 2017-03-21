'use strict';

const url = require('url');
const querystring = require('querystring');
const http = require('http');
const PORT = process.env.PORT || 3000;
const cowsay = require('cowsay');
const cowParse = require('./lib/cow-parser.js');
const errHandler = require('./lib/err-request-handler.js');
const wevegotcows = ('./model/wevegotcows.js');

const server = http.createServer(function(req,res){
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if(req.method === 'GET' && req.url.pathname === '/'){
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.write('hello world');
    res.end();
    return;
  }

  if(req.method === 'GET' && req.url.pathname === '/cowsay') {
    if(!req.url.query.text){
      return errHandler(res);
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(wevegotcows(req.url.query.text));
    res.end();
    return;
  }

  if(req.method === 'POST' && req.url.pathname === '/cowsay'){
    return cowParse(req, function(err,body){
      if(err){
        return errHandler(res);
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.write(cowsay.say({text:body.text || 'hello world'}));
      res.end();
    });
  }
  res.statusCode = 404;
  res.write('404');
  res.end();
});

server.listen(PORT, function() {
  console.log('server up', PORT);
});
