const express = require('express');
const router = express.Router();
const connection = require('./sql');

// 获取游戏详情
router.get('/:game_id', (req, res) => {
    const gameId = req.params.game_id;
    console.log('game_id from params:', gameId); // 添加日志
    const query = 'SELECT * FROM game WHERE game_id = ?';
    connection.query(query, [gameId], (err, results) => {
        if (err) {
            console.error('查询游戏数据失败', err);
            return res.status(500).send('查询游戏数据失败');
        }
        if (results.length === 0) {
            console.log('游戏未找到，game_id:', gameId); // 添加日志
            return res.status(404).send('游戏未找到');
        }
        const game = results[0];
        res.render('game_update_s', { game });
    });
});

// 更新游戏数据
router.post('/update_game/:game_id', (req, res) => {
    const gameId = req.params.game_id;
    const { field, value } = req.body;
    console.log('Updating game_id:', gameId, 'field:', field, 'value:', value); // 添加日志
    const query = 'UPDATE game SET ?? = ? WHERE game_id = ?';
    connection.query(query, [field, value, gameId], (err, results) => {
        if (err) {
            console.error('更新游戏数据失败', err);
            return res.status(500).json({ success: false, message: '更新游戏数据失败' });
        }
        res.json({ success: true, message: '游戏数据更新成功' });
    });
});

// 更新 now_price
router.post('/update_now_price/:game_id', (req, res) => {
    const gameId = req.params.game_id;
    const { nowPrice } = req.body;
    console.log('Updating now_price for game_id:', gameId, 'nowPrice:', nowPrice); // 添加日志
    const query = 'UPDATE game SET now_price = ? WHERE game_id = ?';
    connection.query(query, [nowPrice, gameId], (err, results) => {
        if (err) {
            console.error('更新 now_price 失败', err);
            return res.status(500).json({ success: false, message: '更新 now_price 失败' });
        }
        res.json({ success: true, message: 'now_price 更新成功' });
    });
});

module.exports = router;