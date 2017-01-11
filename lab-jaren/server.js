'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');

const parseBodyHandler = require('./lib/parse-body-handler.js');
const badRequestHandler = require('./lib/bad-request-handler.js');
const cowsayHTML = require('./lib/cowsay-html.js');

const PORT = process.env.PORT || 3000;
const server = http.createServer(function(message, response) {
  /* parse url and query */
  // url.parse turns "/api/cowsay?text=lulwat" ->
  //    { pathname: "/api/cowsay", query: "text=lulwat" }
  message.url = url.parse(message.url);

  // querystring.parse turns "text=lulwat" -> { text: 'lulwat' }
  message.url.query = querystring.parse(message.url.query);

  /* set up routes */
  if (message.method === 'GET' && message.url.pathname === '/') {
    response.setHeader('Content-Type', 'text/plain');
    response.statusCode = 200;
    response.write('hello world');
    response.end();
    return;
  }

  if (message.method === 'GET' && message.url.pathname === '/cowsay') {
    response.setHeader('Content-Type', 'text/html');
    if (!message.url.query.text) {
      return badRequestHandler(response);
    }
    response.statusCode = 200;
    response.write(cowsayHTML(message.url.query.text));
    response.end();
    return;
  }

  if(message.method === 'POST' && message.url.pathname === '/cowsay') {
    return parseBodyHandler(message, function(err, body) {
      response.setHeader('Content-Type', 'text/html');
      if (err) {
        return badRequestHandler(response);
      }
      response.statusCode = 200;
      response.write(cowsay.say({text: body.text || 'default text'}));
      response.end();
    });
  }

  // 404 catch all route
  response.statusCode = 404;
  response.write(cowsay.say({text: 'Not Found', f:'head-in'})); //lolz
  response.end();

});

server.listen(PORT, () => {
  console.log('server up on port', PORT);
});
