var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render("shopping_cart")
});



module.exports = router;
