/**
 * Created by Aman on 24.06.16.
 */




var express = require('express');
var router = express.Router();
var r = require('rethinkdb');
var md5 = require('md5');
var uuid = require('uuid');



var userservice = require('../services/UserRegistration')

/* GET home page. */
router.post('/login', function(req, res, next) {
    userservice.login(req.body, function(err, user){
        if (err) {
            res.status(400).send(err)
            return;
        }

        res.status(200).send({"token":uuid.v4(), "user":user});
    });
});


router.post('/register', function(req, res, next) {

    userservice.findByUserName(req.body["username"], function(err, users){
        if (err) {
            res.status(400).send(err)
            return;
        }

        if(users.length > 0){
            res.status(400).send("Username already exists")
            return;
        }

        userservice.register(req.body, function(err, user){
            if (err) {
                res.status(400).send(err)
                return;
            }

            userservice.findByUserName(req.body["username"], function(err, users){
                if (err) {
                    res.status(400).send(err)
                    return;
                }
                res.status(201).send({"token":uuid.v4(), "user":users[0]});
            });
        });

    });
});


module.exports = router;
