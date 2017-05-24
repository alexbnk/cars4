var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var expressJWT = require('express-jwt');
var config = require('./config/config');
var morgan      = require('morgan');
var mongoose = require('mongoose');
var User = require('./models/userModel'); //used by passport

mongoose.connect('mongodb://localhost/angularjs-auth', function(err) {
    if (err) throw err;
});

//var ensureAuthenticated = expressJWT({ secret: config.localKey });
//Use body parser for

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// use morgan to log
app.use(morgan('dev'));

//Routes definitions in external files

var authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);


var apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);









//Serve static files in the root directory:
// app.use(express.static('public'));
app.use(express.static('app'));
//Serve the node_modules files without the need for full path:
app.use(express.static('node_modules'));

// Server errors handling
app.all('[^.]+', function(req, res) {
    res.sendFile(__dirname + "/app/index.html");
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});

// Start a server listener
app.listen(7000, function() {
    console.log("App: " + app.name + " is listening on 7000. ");

});
