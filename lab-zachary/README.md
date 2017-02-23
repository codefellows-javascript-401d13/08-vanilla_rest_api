# Vanilla Javascript API router

This app creates an HTTP server that handles GET, POST, and DELETE to a server-level persistance layer.

# System Requirements

  - Terminal.app on macOS or equivalent
  - node.js and npm package manager installed


### Installation

Clone the repository to your local server
```sh
https://github.com/zcrumbo/08-vanilla_rest_api.git
```

Install the dependencies -

```sh
$ npm i
```
[HTTPie](https://httpie.org/) will be required to run the HTTP requests from your terminal window. You will need to install this with [Homebrew][1] on macOS. It is also easier to see the results of all operations by running mocha tests with the command
```sh
$ mocha
```

Start the server

```sh
$ node server.js
```


### Connecting

If you are using HTTPie, in your terminal window, type the following commands, where '3000' would be replaced with your local environment PORT variable, if configured. Commands can only be sent to the api/chairs endpoint
```sh
$  http POST :3000/api/chair name='test name' content='test content' #creates a new chair object on the server, and returns a unique id
$ http GET localhost:8000/api/chair?id=sample-id #returns the name and content of a stored chair object
$ DELETE localhost:8000/api/chair?id=sample-id #deletes the chair object from server storage
```

[1]:https://brew.sh/

