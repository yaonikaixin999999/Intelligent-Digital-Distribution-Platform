// routes/shopping_cart.js
const express = require('express');
const router = express.Router();
const connection = require('./sql'); // 引入数据库连接模块

router.get('/', (req, res) => {
    const userId = '1001'; // 假设用户ID通过查询参数传递
    console.log('User ID:', userId); // 调试信息
    const query = `
        SELECT sc.game_id, sc.add_time, g.game_name, g.game_image, g.game_url, g.discount, g.now_price
        FROM shopping_cart sc
        JOIN game g ON sc.game_id = g.game_id
        WHERE sc.user_id = ?
    `;
    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error('获取愿望单数据失败', err);
            return res.status(500).send('获取愿望单数据失败');
        }
        console.log('Wish List:', results); // 调试信息
        const userQuery = `SELECT cust_name FROM user WHERE user_id = ?`;
        connection.query(userQuery, [userId], (err, userResult) => {
            if (err) {
                console.error('获取用户信息失败', err);
                return res.status(500).send('获取用户信息失败');
            }
            console.log('User Result:', userResult); // 调试信息
            if (userResult.length === 0) {
                console.error('用户不存在', userId);
                return res.status(404).send('用户不存在');
            }
            // 查询已购买的游戏列表
            const purchasedGamesQuery = `SELECT game_id FROM user_order WHERE user_id = ?`;
            connection.query(purchasedGamesQuery, [userId], (err, purchasedGamesResult) => {
                if (err) {
                    console.error('获取已购买游戏列表失败', err);
                    return res.status(500).send('获取已购买游戏列表失败');
                }
                const purchasedGames = purchasedGamesResult.map(game => game.game_id);
                console.log('Purchased Games:', purchasedGames); // 调试信息
                // 定义 formatDate 函数
                const formatDate = (dateString) => {
                    const date = new Date(dateString);
                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                    return date.toLocaleDateString('zh-CN', options);
                };
                res.render('shopping_cart', { wishList: results, user: userResult[0], formatDate: formatDate, purchasedGames: purchasedGames });
            });
        });
    });
});

router.post('/buy', (req, res) => {
    const { userId, gameId } = req.body;
    console.log('Buy Request:', { userId, gameId }); // 调试信息
    const query = `SELECT now_price, discount FROM game WHERE game_id = ?`;
    connection.query(query, [gameId], (err, gameResult) => {
        if (err) {
            console.error('获取游戏信息失败', err);
            return res.status(500).send('获取游戏信息失败');
        }
        const game = gameResult[0];
        if (!game) {
            console.error('游戏不存在', gameId);
            return res.status(404).send('游戏不存在');
        }

        // 提取 now_price 中的数字部分并转换为整数
        const nowPriceStr = game.now_price;
        const nowPriceMatch = nowPriceStr.match(/\d+,\d+|\d+/);
        if (!nowPriceMatch) {
            console.error('无法提取游戏价格', nowPriceStr);
            return res.status(500).send('无法提取游戏价格');
        }
        const nowPrice = parseInt(nowPriceMatch[0].replace(',', ''), 10);
        const discount = game.discount;

        console.log('Game Price (Extracted):', nowPrice); // 调试信息

        const moneyQuery = `SELECT money FROM money WHERE user_id = ?`;
        connection.query(moneyQuery, [userId], (err, moneyResult) => {
            if (err) {
                console.error('获取用户余额失败', err);
                return res.status(500).send('获取用户余额失败');
            }
            if (moneyResult.length === 0) {
                console.error('用户余额信息不存在', userId);
                return res.status(404).send('用户余额信息不存在');
            }
            const userMoney = moneyResult[0].money;

            console.log('User Money:', userMoney); // 调试信息
            console.log('Game Price:', nowPrice); // 调试信息

            if (userMoney >= nowPrice) {
                const orderIdQuery = `SELECT MAX(order_id) AS max_order_id FROM user_order`;
                connection.query(orderIdQuery, (err, orderIdResult) => {
                    if (err) {
                        console.error('获取订单ID失败', err);
                        return res.status(500).send('获取订单ID失败');
                    }
                    // 确保 max_order_id 是一个数字
                    const maxOrderId = orderIdResult[0].max_order_id;
                    const nextOrderId = (maxOrderId !== null ? parseInt(maxOrderId, 10) : 0) + 1;
                    // 将 nextOrderId 转换回 varchar 类型
                    const nextOrderIdStr = nextOrderId.toString();
                    const insertOrderQuery = `
                        INSERT INTO user_order (order_id, user_id, game_id, commit_time, flag)
                        VALUES (?, ?, ?, NOW(), 2)
                    `;
                    connection.query(insertOrderQuery, [nextOrderIdStr, userId, gameId], (err) => {
                        if (err) {
                            console.error('插入订单失败', err);
                            return res.status(500).send('插入订单失败');
                        }
                        const updateMoneyQuery = `
                            UPDATE money SET money = money - ? WHERE user_id = ?
                        `;
                        connection.query(updateMoneyQuery, [nowPrice, userId], (err) => {
                            if (err) {
                                console.error('更新用户余额失败', err);
                                return res.status(500).send('更新用户余额失败');
                            }
                            res.json({ success: true });
                        });
                    });
                });
            } else {
                res.json({ success: false, message: '购买失败，余额不足' });
            }
        });
    });
});

// 添加搜索路由
router.get('/search', (req, res) => {
    const userId = req.query.user_id || '1001'; // 假设用户ID已知
    const query = req.query.query || '';
    console.log('User ID:', userId); // 调试信息
    console.log('Search Query:', query); // 调试信息

    let searchQuery;
    let searchParams;

    if (query) {
        searchQuery = `
            SELECT sc.game_id, sc.add_time, g.game_name, g.game_image, g.game_url, g.discount, g.now_price
            FROM shopping_cart sc
            JOIN game g ON sc.game_id = g.game_id
            WHERE sc.user_id = ? AND (g.game_name LIKE ? OR g.game_url LIKE ?)
        `;
        searchParams = [userId, `%${query}%`, `%${query}%`];
    } else {
        searchQuery = `
            SELECT sc.game_id, sc.add_time, g.game_name, g.game_image, g.game_url, g.discount, g.now_price
            FROM shopping_cart sc
            JOIN game g ON sc.game_id = g.game_id
            WHERE sc.user_id = ?
        `;
        searchParams = [userId];
    }

    connection.query(searchQuery, searchParams, (err, results) => {
        if (err) {
            console.error('搜索愿望单数据失败', err);
            return res.status(500).send('搜索愿望单数据失败');
        }
        console.log('Search Results:', results); // 调试信息

        // 查询已购买的游戏列表
        const purchasedGamesQuery = `SELECT game_id FROM user_order WHERE user_id = ?`;
        connection.query(purchasedGamesQuery, [userId], (err, purchasedGamesResult) => {
            if (err) {
                console.error('获取已购买游戏列表失败', err);
                return res.status(500).send('获取已购买游戏列表失败');
            }
            const purchasedGames = purchasedGamesResult.map(game => game.game_id);
            console.log('Purchased Games:', purchasedGames); // 调试信息

            res.json({ wishList: results, purchasedGames: purchasedGames });
        });
    });
});

module.exports = router;