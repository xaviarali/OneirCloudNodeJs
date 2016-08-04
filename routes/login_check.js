var express = require('express');
var router = express.Router();

/* authenticates an user. */
router.get('/login_check', function(req, res, next) {
         if(req.session.idx) res.json({'id' : 1});
           else                res.json({'id' : 0});
           res.end();
});

module.exports = router;
