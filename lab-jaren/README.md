Lab-07 Cowsay HTTP Server
===
Implement an HTTP server using Nodejs

## Description
The goal of this lab was to create an HTTP server that uses REST architecture and the cowsay module.
- **server.js** -- starts the server and invokes request handlers
- **cowsay-html.js** -- returns the cowsay HTML template for good GET requests
- **bad-request-handler.js** -- handles bad requests to the server
- **parse-body-handler.js** -- returns a parsed JSON body to get the text value
While the server is up, the user can send GET and POST requests containing their text to the server. Upon a successful request (status 200), the server will respond with a helpful cow that says their text. If the user does not supply text, a status code of 400 'bad request' will result and the cow's friend will make a helpful suggestion. A code of 404 'Not Found' will display something else...

## Usage
On the command line, type `run npm start` and enter. The server is now up!
- Open any browser and type in the url `localhost:3000`, you should see plain text saying `hello world`.
- Now type in the url `localhost:3000/cowsay?text=your%20text%20here`
  - The browser converts `%20` to the 'space' character.
  - *Note:* If you use Google Chrome, you can leave spaces and Chrome converts for you.
You can also POST your text in JSON format on the command line.
- With the server still up, open a different terminal window and run the command `echo '{"text": "your text"}' | http localhost:3000/cowsay`, and it will display the response inside the terminal window.
