plovr-sample
============

Plovr sample with soynode module in Node.

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

To develp HTML by designer,
```
$ ./run.sh soyweb &   # Then access http://localhost:9811/soy/app.html
```

To launch production server,
```
$ ./run.sh build      # Compile all JavaScript into /javascripts/main-min.js
$ NODE_ENV=production node app  # Start node server as production mode
```


