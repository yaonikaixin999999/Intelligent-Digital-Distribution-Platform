// routes/game_detail.js
const express = require('express');
const router = express.Router();
const db = require('./sql.js'); // 假设你有数据库连接模块

router.get('/', function (req, res, next) {
    const gameName = req.query.game_name;

    if (!gameName) {
        return res.status(400).send('Missing game name parameter');
    }

    // 使用参数化查询防止SQL注入
    db.query('SELECT * FROM game WHERE game_name = ?', [gameName], function (err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving game details from database');
        }
        if (data.length === 0) {
            return res.status(404).send('Game not found');
        }

        // 获取评论数据作为额外的上下文信息
        db.query('SELECT * FROM comment  join game on comment.game_id = game.game_id WHERE game.game_name = ?', [gameName], function (err, commentsData) {
            if (err) {
                console.error(err);
                return res.status(500).send('Error retrieving comments from database');
            }
            console.log(commentsData);
            console.log(data);
            // 渲染模板并将游戏和评论数据传递给它
            res.render('game_detail', {
                game: data[0],
                comments: commentsData // 直接传递评论数组
            });
        });
    });
});

module.exports = router;