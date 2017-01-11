'use strict';

const url = require('url');
const querystring = require('querystring');
const http = require('http');
const PORT = process.env.PORT || 3000;
const cowsay = require('cowsay');
const myParser = require('./lib/my-parser.js');
const requestErrHandler = require('./lib/request-err-handler.js');
const cowGenerator = require('./lib/cow-generator.js');

const server = http.createServer (function (req,res){
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if(req.method === 'GET' && req.url.pathname === '/api/cowsay'){
    res.setHeader('Content-Type', 'text/hmtl');
    res.statusCode = 200;
    res.write(cowGenerator(req.url.query.text));
    res.end();
    return;
  }

  if(req.method === 'GET' && req.url.pathname === '/') {
    if(!req.url.query.text){
      return requestErrHandler(res);
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(cowGenerator(req.url.query.text));
    res.end();
    return;
  }
  if(req.method === 'POST' && req.url.pathname === '/api/cowsay'){
    return myParser(req, function(err,body){
      if(err){
        return requestErrHandler(res);
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
  console.log('server up!', PORT);
});
