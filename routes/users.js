var express = require('express');
var router = express.Router();
fs = require('fs');
var oneir = require('../services/oneir');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //oneir.parse('./data/inventho.rnd', './data/formats/invent.format.txt');
  oneir.parse('./data/arcusts.rnd', './data/formats/arcusts.format.txt', function(err, data){
    res.render('users', { title: 'Express', data:data });
  });
});

module.exports = router;
