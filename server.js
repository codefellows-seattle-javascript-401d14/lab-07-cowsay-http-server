'use strict';

const url = require('url');
const http = require('http');
const cowsay = require('cowsay');
const PORT = process.env.PORT || 3000;
const errormessage = require('./lib/errormessage.js');
const jsonparsemethod = require ('./lib/jsonparsemethod.js');
const querystring = require('querystring');
const cowfunction = require ('./lib/cowhtmlfunction.js');

const server = http.createServer (function (req, res){

  console.log('req.method', req.method);
  console.log('req.url', req.url);
  console.log('req.headers', req.headers);

  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if (req.method === 'GET' && req.url.pathname === '/' ) {
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.write('Hello World');
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url.pathname === '/cowsay') {
    console.log('req.url' , req.url);
    console.log('req.url.query', req.url.query);
    if(!req.url.query.text){
      return errormessage(res);
    }
    else{
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      res.write(cowfunction(req.url.query.text));
      res.end();
      return;
    }
  }
  if (req.method === 'POST' && req.url.pathname === '/cowsay') {
    console.log(req.url.query.text, ' line 43');
    console.log(req.url.query, ' line 44');
    if(req.url.query.text || req.url.query){
      return jsonparsemethod(req, function(err, textresult){
        console.log(textresult);
        if(err)return console.error(err);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write(cowsay.say(textresult));
        res.end();
        return;
      });
    }
    return errormessage(res);
    // return;
  }
}); //end of createServer function
server.listen(PORT, () => {
  console.log('Kens server is now running', PORT);
});
