var express = require('express');
var router = express.Router();
var db = require('../sql.js');


router.use(express.urlencoded({ extended: false }));

router.get('/', function(req, res, next) {
  var game_label  = req.query.classify_left; 
  console.log(req.query.classify_left);
  db.query('SELECT game_label FROM game GROUP BY game_label HAVING game_label = ?', [game_label], function (err, data) {
      if (err) {
          console.error(err);
          return res.status(500).send('Error retrieving data from database');
      }
      console.log(data); // 打印查询结果以确认其结构
      res.render('classify_left', { classify_left: data });
  });
});



module.exports = router;
