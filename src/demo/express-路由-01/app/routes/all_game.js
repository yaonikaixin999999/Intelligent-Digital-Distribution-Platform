var express = require('express');
var router = express.Router();
var db = require('../sql.js');

router.use(express.urlencoded({ extended: false }));

router.get('/', function (req, res, next) {
    var game_name = req.query.search;
    console.log(req.query.search);
    db.query('SELECT * FROM game ', function (err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving data from database');
        }
        console.log(data); // 打印查询结果以确认其结构
        res.render('all_game', { search: data, search_term: game_name });
    });
});

module.exports = router;