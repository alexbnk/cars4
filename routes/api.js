var express = require('express');
var router = express.Router();
var config = require('../config/config')
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var expressJWT = require('express-jwt');
var ensureAuthenticated = expressJWT({ secret: config.localKey });

//var app = express()
// var passport = require('../models/passport');
var User = require('../models/userModel');

// router.use(bodyParser.json());
//  router.use(bodyParser.urlencoded({
//      extended: false
//  }));

router.get('/users',ensureAuthenticated , function(req, res, next) {
    User.find({}, {}, function(error, users) {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log(users)
            res.send(users);
            //console.log("make list provided");
        }
    });
});

// JWT TOKEN check middleware :
//
// router.use(function(req, res, next){
// // check header or url parameters or post parameters for token
// var providedToken = req.headers.Authorization || req.query.token || req.headers['x-access-token'] ;
//
// console.log(providedToken);
//
// // decode token
//   if (providedToken) {
//     // verifies secret and checks exp
//     jwt.verify(providedToken, config.localKey, function(err, decoded) {
//       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;
//         next();
//       }
//     });
//
//   } else {
//
//     // if there is no token
//     // return an error
//     return res.status(403).send({
//         success: false,
//         message: 'No token provided.'
//     });
//
//   }
// });
//
//
//







// export the route to the main server.js file
module.exports = router;
