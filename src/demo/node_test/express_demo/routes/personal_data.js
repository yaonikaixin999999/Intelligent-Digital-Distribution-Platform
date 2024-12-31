// routes/personal_data.js
const express = require('express');
const router = express.Router();
const connection = require('./sql'); // 引入数据库连接模块

router.get('/', function (req, res, next) {
    const userId = '1001'; // 假设这是当前用户的ID，实际应用中可以从session或请求参数中获取

    // 查询用户信息
    const userQuery = 'SELECT cust_name FROM user WHERE user_id = ?';
    // 查询游戏数量
    const gameCountQuery = 'SELECT COUNT(*) AS game_count FROM user_game WHERE user_id = ?';
    // 查询游戏库存及购买时间
    const gameInventoryQuery = `
        SELECT ug.game_id, g.game_name, g.game_image, g.game_url, uo.commit_time
        FROM user_game ug
        JOIN game g ON ug.game_id = g.game_id
        LEFT JOIN user_order uo ON ug.game_id = uo.game_id AND ug.user_id = uo.user_id
        WHERE ug.user_id = ?
    `;

    // 执行查询
    connection.query(userQuery, [userId], (userErr, userResults) => {
        if (userErr) return next(userErr);

        connection.query(gameCountQuery, [userId], (gameCountErr, gameCountResults) => {
            if (gameCountErr) return next(gameCountErr);

            connection.query(gameInventoryQuery, [userId], (gameInventoryErr, gameInventoryResults) => {
                if (gameInventoryErr) return next(gameInventoryErr);

                // 打印日志以检查数据
                console.log('User:', userResults[0]);
                console.log('Game Count:', gameCountResults[0].game_count);
                console.log('Games:', gameInventoryResults);

                // 检查 game_url 是否为空
                gameInventoryResults.forEach(game => {
                    if (!game.game_url) {
                        console.warn(`Game URL is missing for game_id: ${game.game_id}`);
                    }
                });

                // 渲染页面并传递数据
                res.render('personal_data', {
                    user: userResults[0],
                    gameCount: gameCountResults[0].game_count,
                    games: gameInventoryResults
                });
            });
        });
    });
});

module.exports = router;