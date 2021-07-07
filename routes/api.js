const express = require("express");
const router = express.Router();
var cors = require('cors');
const jwt = require("jsonwebtoken");

var whitelist = ['http://localhost:4778', 'http://example2.com']

//router.use(cors());

// OPEN CORS

// SECURE CORS
//router.use('/item', [cors(secureCORSOptions), verifyToken], require('../components/items'));

router.use('/', [cors(openCORSOptions)], (req, res) => {
  res.send('awdwadwawdawd');
});














function whiteListCheck (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }

  function verifyToken (req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== "undefined"){
  
      //console.log(bearerHeader)
      const token = (bearerHeader.split(' '))[1]
      
      const secretKey = require('../config/keys').jwtTokenSecretKey;
      jwt.verify(token, secretKey, (err, authData)=>{
        if(err){
          res.sendStatus(403)
        }
        else {
          req.user = authData.user;
          next();
        }
      })
    }
    else {
      res.sendStatus(403);
    }
  
  }
  
var openCORSOptions = {
  origin: function (origin, callback) {
      whiteListCheck(origin, callback)
    },
  methods: "GET,HEAD,PUT,POST,DELETE",
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

var secureCORSOptions = {
    origin: function (origin, callback) {
        whiteListCheck(origin, callback)
      },
    methods: "GET,HEAD,PUT,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


module.exports = router;