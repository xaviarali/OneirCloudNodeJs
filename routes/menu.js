var express = require('express');
var router = express.Router();

/* renders the menu. */
router.get('/menu', function(req, res, next) {
         res.render("menu");
});

module.exports = router;
