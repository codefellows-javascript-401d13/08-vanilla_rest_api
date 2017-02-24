# Basic API w/ File-System Persistence

This was an assignment that was built on a design for a simple API with full CRUD routes. The main improvement however was the addition of a layer of true file persistence - whereas before our data was not persisted beyond the closing of the server. The persistence was achieved using the native 'file system' module provided in Node. The actual data being persisted are models of guitars that I like.

#### Getting Started:
To use this app, I would reccommend downloading 'HTTPie.' This allows added CLI options to run requests to the server that I've built. Once installed, the user may run a command such as:
```
http POST :[PORT]/api/guitar?type=[type]&make=[make]&name=[name]
```
Where ```[PORT]``` is the user's current server port number. (default is 3000)
Where ```[name]```,```[make]``` and ```[type]``` are strings that can be chosen to represent a guitar.

Example query:
```localhost:3000/api/guitar?name=stratocaster&make=fender&type=electric```
#### Features:
-Full CRUD routes.
-True data persistence
-Error handling and testing.

#### Built Using:
-"Url" - (node module)
-"Querystring" - (node module)
-"HTTP" - (node module)
-"HTTPie' - (https://httpie.org)
-"Bluebird" - (http://bluebirdjs.com/)
