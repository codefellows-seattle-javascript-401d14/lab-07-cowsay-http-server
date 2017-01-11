401 JS --  Lab 07 cowsay server
===

####About the project

*Created an http server that controls cowsay from a CLI or browser. When the query string is filled out in the client console or browser, the text is added to the cow's speech bubble. The value of the text is parsed into a string and added to the speech bubble.

*The server responds with a response with the string `client connected`.

#The GET request includes:
*A key value `text=<message>`, a response header containing `Content-Type: text/plain`, status code `200`, and a body including value obtained from the querystring.

#The POST request includes:
*A key value `text=<message>`, a response header containing `Content-Type: text/plain`, status code `200`, and a body including value obtained from the querystring.

*If the `{text: messsage}` isn't set, server responds with an error code and body with value from bad pathname and status code = `400`;


<!-- links -->
[Nodejs http docs]: https://nodejs.org/api/http.html
[Cowsay docs]: https://github.com/piuccio/cowsay
