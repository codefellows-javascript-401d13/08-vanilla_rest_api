## Description
* Vanilla REST API with Persistence


# Overview

  - Built from the ground up with *almost* no third party libraries - this basic program allows you to create endpoints which your users can build on.
  - This includes a layer of file system persistence which (with help from Bluebird) reads/writes to/from the filesystem.
  - node uuid provides unique ids to model instances

### Installation
Clone down this repo.
```npm i``` to get ```bluebird``` and ```node-uuid```.
AT THE ROOT OF YOUR PROJECT DIRECTORY, BE SURE TO CREATE A DATA DIRECTORY WHICH CONTAINS ANOTHER DIRECTORY (named after your constructor function) TO HOST YOUR DB OBJECTS. YOUR DATA WILL NOT PERSIST WITHOUT THIS STEP.
    Ex) ./data/sample-model

License
----

MIT


**This is free software- do whatever you want with it**
