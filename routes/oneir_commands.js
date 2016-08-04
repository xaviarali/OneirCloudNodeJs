var express = require('express');
var router = express.Router();

/* renders the menu. */
router.get('/oneir_commands', function(req, res, next) {
         //if(req.query.q && req.session.idx) 
              storage[req.session.idx] = req.query.q;  
              res.end();
});

module.exports = router;
