Closure Boilerplate
============

A boilerplate for Google Closure Tools project depending on 'express' and 'soynode' npm module .

Here is a list to represent which feature is hosted or not yet.

- JSON configuration by Plovr
- Closure Library
- Closure Compiler
  - dynamically compiled by Plovr
- Closure Stylesheets
  - Also dynamically compiled by Plovr
- Closure Template
  - Ready to SoyWeb development for designers by Plovr
- (not yet) Closure Linter

To fetch libraries,
```
$ npm install
$ ./run.sh setup
```

To start development,
```
$ ./run.sh serve &    # Start JavaScript server of Plovr
$ node-dev app        # Then access http://localhost:3000/
```

To start HTML development for designer,
```
$ ./run.sh soyweb &   # Then access http://localhost:9811/soy/app.html
```

To compile JavaScripts and start production server,
```
$ ./run.sh build      # Compile all JavaScript into /javascripts/main-min.js
$ NODE_ENV=production node app  # Start node server as production mode
```


