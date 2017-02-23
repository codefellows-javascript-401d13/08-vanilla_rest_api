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


### _Created by_

Yana Radenska <O.o>
