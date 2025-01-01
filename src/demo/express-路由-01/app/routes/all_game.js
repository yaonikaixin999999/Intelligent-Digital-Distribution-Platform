// routes/all_game.js
const express = require('express');
const router = express.Router();
const db = require('../sql.js'); // 假设你有数据库连接模块

router.get('/', function (req, res, next) {
    const game_name = req.query.search;

    db.query('SELECT * FROM game', function (err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving data from database');
        }
        console.log(data); // 打印查询结果以确认其结构
        res.render('all_game', { search: data, search_term: game_name });
    });
});

module.exports = router;