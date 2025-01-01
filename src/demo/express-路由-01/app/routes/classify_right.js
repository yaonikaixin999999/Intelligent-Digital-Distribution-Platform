var express = require('express');
var router = express.Router();
var db = require('../sql.js');

router.get('/', function(req, res, next) {
    db.query('SELECT game_label FROM game GROUP BY game_label ', function (err, data) {
        if (err) {
          console.log(err);
          res.status(500).send('Error retrieving data from database');
        } else {
          res.render('classify_right', { classify_right: data });
        }
      });
});

module.exports = router;
