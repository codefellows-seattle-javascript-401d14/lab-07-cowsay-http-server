'use strict';

const url = require('url');
const http = require('http');
const cowsay = require('cowsay');
const PORT = process.env.PORT || 3000;
const querystring = require('querystring');
const myParseBody = require('./lib/parse-body.js');
const invalidRequestModule = require('./lib/invaild-request.js');

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if(req.method === 'GET' && req.url.pathname ==='/api/cowsay') {
    if(!req.url.query.text){
      return invalidRequestModule(res);
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text.html');
    res.write(generateCowsayHTML(req.url.query.text));
    res.end();
    return;
  }
  function generateCowsayHTML(text) {
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
  }
  
  if(req.method === 'GET' && req.url.pathname ==='/') {
    if(!req.url.query.text){
      return invalidRequestModule(res);
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text.html');
    res.write(generateCowsayHTML(req.url.query.text));
    res.end();
    return;
  }

  if(req.method === 'POST' && req.url.pathname === '/api/cowsay') {
    return myParseBody(req, function(err, body) {
      if (err) {
        return invalidRequestModule(res);
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.write(cowsay.say({text: body.text || 'default text'}));
      res.end();
    });
  }
  res.statusCode = 404;
  res.write('Not Found');
  res.end();
});

server.listen(PORT, () => {
  console.log('server up', PORT);
});
