### Vanilla JS REST API OMG

This is a REST API constructed from scratch (well, almost). It defines DELETE, GET, and POST methods for a blog object. It has a modular design for separation of concerns and ease of navigation.

### Module Descriptions

* router module
  - contains the Router constructor, which stores a property routes with four properties of its own: GET, POST, PUT, and DELETE
  - defines prototype functions that assign an appropriate callback function for each of the four routes
  - defines a prototype function that routes the request to the appropriate method

* blog-entry module
  - contains the Blog constructor, which has three properties: a unique ID generated with the use of node-uuid, name, and content

* parse-json module
  - parses JSON from a request
  - resolves Promise of no JSON is contained in request (e.g., GET request with no ID)

* parse-url module
  - parses the url of all requests using querystring module

* storage module
  - defines the four functions that write the response for the requests (two GET functions, one POST, one DELETE)

* server module
  - starts the server (using http module)
  - calls the four functions defined in the storage module, and defines and executes the callback for each of them, including writing the request text and status code

### Directions

* open a terminal window and clone the files:
  ```
  $ git clone
  ```
* install node.js if you don't have it

* navigate into the "lab-yana" directory and run:
  ```
  $ npm i
  ```
* start the server:
  ```
  $ node server.js
  ```
* leave the server running, and open a new terminal tab or window

* you have the option to upload files, delete files, retrieve files from storage, or get a list of files. The following summarizes the commands for each of those actions.

  |action|command|
  |---|---|
  upload a file|http POST :3002/api/blog name='name' content='content'
  delete a file|http DELETE :3002/api/blog?id=<id>
  retrieve a file|http :3002/api/blog?id=<id>
  see a list of available files|http :3002/api/blog


### _Created by_

Yana Radenska <O.o>
