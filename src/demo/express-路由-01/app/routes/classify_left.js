var express = require('express');
var router = express.Router();
var db = require('../sql.js');

// 确保中间件可以解析 JSON 请求体
router.use(express.json());
  
// 定义 POST 路由来处理前端发来的查询请求
router.post('/login/verify/query ', function(req, res, next) {
    const { game_label } = req.body;
    console.log(game_label);
    db.query('SELECT * FROM game WHERE game_label = ?', [game_label], function (err, data) {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Error retrieving data from database' });
        }
        console.log(data); // 打印查询结果以确认其结构
        res.json(data); // 将查询结果作为 JSON 返回给前端
    });
});

module.exports = router;