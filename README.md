401 JS --  Lab 07 cowsay server
===

## Submission Instructions
  * Work in a fork of this repository
  * Work in a branch on your fork
  * Write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-duncan`
  * Submit a pull request to this repository
  * Submit a link to your pull request on canvas
  * Submit a question, observation, and how long you spent on canvas  
  
## Learning Objectives  
* Students will be able to implement an HTTP server using Nodejs

## Resources  
* [Nodejs http docs]
* [Cowsay docs]

## Requirements  
#### Configuration  
<!-- list of files, configurations, tools, ect that are required -->
Your lab directory must include  
* **README.md** -- with a documention about your lab
* **.gitignore** -- with a robust gitignore
* **.eslintrc** -- with the class .eslintrc file
* **.eslintignore** -- with the class .eslintignore
* **.package.json** -- with all dependencies and dev-dependencies 
* **lib/** - a directory for helper modules
* **model/** - a directory for constructor functions
* **test/** - a directory for test modules
* **server.js** - entry point to your program
 
#### Feature Tasks  
* implement the following routes  

###### GET /
* for all get request to `/` the server should respond with the following:
 * a header containing `Content-Type: text/plain`
 * a status code of **200**
 * a response with the string "hello world"
 
###### GET /cowsay
* the query string should have the key value `text=<message>`
* the response header should include `Content-Type: text/html`
* if the query `text=messsage` is set, respond with:  
 * a status code of 200
 * a body including and html text
 * the html should have a pretag that contains the result of `cowsay.say({text: <querystring text>})`
* if the query `text=message` is **not** set, respond with:  
 * status code = 400
 * a body including and html text
 * the html should have a pretag that contains the result of `cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'})`

###### POST /cowsay
* the response header should include `Content-Type: text/plain`
* if the json `{text: messsage}` is set in the body, respond with:  
 * a status code of 200
 * a body including the value returned from `cowsay.say({text: <querystring text>})`
* if the json`{text: messsage}`is **not** set in the body, respond with:  
 * status code = 400
 * a body including the value returned from `cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'})`

#### Testing  
* Write a 200 and 400 test for GET and POST requests to /cowsay
* Write a 404 test for undefined routes

####  Documentation  
* Write a project description in your readme
* Write a guide to useing your server endpoint

## Rubric  
* 2ps Configuration
* 3pts Feature Tasks
* 3pts Tests
* 2pts Documentation

<!-- links --> 
[Nodejs http docs]: https://nodejs.org/api/http.html
[Cowsay docs]: https://github.com/piuccio/cowsay
