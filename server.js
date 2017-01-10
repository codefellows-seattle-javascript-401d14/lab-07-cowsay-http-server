'use strict';

const url = require('url');
const querystring = require('querystring');
const http = require('http');
const parseBody = require('./lib/parse.js');
const badRequest = require('./lib/bad-request.js');

const cowsay = require('cowsay');

const PORT = process.env.PORT || 3000;
const server = http.createServer(function(req, res){
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if(req.method === 'GET' && req.url.pathname === '/api/cowsay'){
    // console.log(req.url, 'req.url');
    // console.log(req.url.query, 'req.url.query');
    if(!req.url.query.text){
      return badRequest(res);
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', ' text/html');
    res.write(generateCowSay(req.url.query.text));
    res.end();
    return;
  }

  function generateCowSay(text){
    console.log('hello world');
    let cowsayConfig = { text: text || 'hello world' };
    return `<!DOCTYPE html>
    <html>
    <body>
    <h1> cowsay </h1>
    <pre>
    ${cowsay.say(cowsayConfig)}
    </pre>
    </body>
    </html>`;
  }

  if(req.method === 'GET' && req.url.pathname === '/' ) {
    if(!req.url.query.text){
      return badRequest(res);
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', ' text/html');
    res.write(generateCowSay(req.url.query.text));
    res.end();
    return;
  }
  if(req.method === 'POST' && req.url.pathname === '/api/cowsay'){
    console.log(req.method);
    return parseBody(req, function(err, body){
      if (err){
        return badRequest(res);
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.write(cowsay.say({text: body.text || 'hello world'}));
      res.end();
    });
  }

  res.statusCode = 404;
  res.write('Not Found');
  res.end();

});

server.listen(PORT, () => {
  console.log('server up !!', PORT);
});
