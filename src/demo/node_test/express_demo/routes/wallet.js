var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('wallet', { title: '个人钱包' });
});

module.exports = router;
