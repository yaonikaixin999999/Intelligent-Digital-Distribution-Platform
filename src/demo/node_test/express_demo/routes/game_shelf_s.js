const express = require('express');
const router = express.Router();
const db = require('./sql.js'); // 假设你有数据库连接模块

router.get('/', function (req, res, next) {
    res.render('game_shelf_s', {});
});

router.post('/save_game_data', function (req, res, next) {
    const gameData = req.body;

    const query = `
        INSERT INTO game (game_id, game_name, game_label, last_price, now_price, discount, game_url, game_image, game_volume, brief)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        gameData.game_id,
        gameData.game_name,
        gameData.game_label,
        gameData.last_price,
        gameData.now_price,
        gameData.discount,
        gameData.game_url,
        gameData.game_image,
        Math.floor(Math.random() * 1000), // 随机生成销量
        gameData.brief
    ];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('保存游戏数据失败', err);
            res.status(500).send('保存游戏数据失败');
            return;
        }
        res.send('游戏数据保存成功');
    });
});

module.exports = router;