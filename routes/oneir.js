var express = require('express');
var router = express.Router();

/* renders the menu. */
router.get('/oneir', function(req, res, next) {
        var temp = 0;
           if(req.query.q != null && storage[req.query.q] != null)
           { 
              temp = storage[req.query.q];
              storage[req.query.q] = null;
           }
            res.header('Connection', temp);         
           res.status(200).json({'command' : temp});
           res.end();
});

module.exports = router;
