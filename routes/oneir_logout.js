var express = require('express');
var router = express.Router();

/* authenticates an user. */
router.get('/oneir_logout', function(req, res, next) {
        req.session.idx = null;
           req.session.destroy(function(err) {});
           res.end();
});

module.exports = router;
