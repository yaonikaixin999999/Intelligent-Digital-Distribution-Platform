const express = require('express');
const router = express.Router();
const db = require('../sql.js');

// POST 路由：添加游戏到购物车
router.post('/addToCart', function (req, res) {
    const { gameId } = req.body; // 从请求体中获取 gameId
    // const { game_name } = req.query; // 从查询参数中获取 game_name

    console.log('Received gameId:', gameId);
    // console.log('Received gameName:', game_name);

    // if (!gameId || !game_name) {
    //     return res.status(400).json({ success: false, message: '缺少游戏ID或游戏名称' });
    // }

    // 插入数据到购物车表
    const sql = 'INSERT INTO shopping_cart (user_id, game_id, add_time) VALUES (?, ?,  CURRENT_TIMESTAMP)';
    db.query(sql, [1001, gameId], function (err, result) {
        if (err) {
            console.error('Error adding game to cart:', err);
            return res.status(500).json({ success: false, message: '服务器错误，请重试。' });
        }
        console.log('Game added to cart successfully');
        res.json({ success: true, message: '商品已成功添加到购物车！' });
    });
});

module.exports = router;