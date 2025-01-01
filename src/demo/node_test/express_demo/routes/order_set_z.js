var express = require('express');
var router = express.Router();
var db = require('./sql.js');

router.get('/', function (req, res, next) {
  res.render("order_set_z")
});


module.exports = router;