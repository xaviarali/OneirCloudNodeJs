var express = require('express');
var router = express.Router();

/* authenticates an user. */
router.get('/oneir_session_login', function(req, res, next) {
         if(req.query.id)
             { 
               req.session.idx = req.query.id;
               res.json({'id' : 1});
             }
             res.end();
});

module.exports = router;
