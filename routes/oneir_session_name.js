var express = require('express');
var router = express.Router();

/* renders the menu. */
router.get('/oneir_session_name', function(req, res, next) {
          if(req.session.idx !== null) 
           res.json({ 'id' : req.session.idx});
           res.end();
});

module.exports = router;
