// routes/user_order.js
var express = require('express');
var router = express.Router();
const connection = require('../sql'); // 引入数据库连接

// 获取所有订单
router.get('/', function (req, res, next) {
    const userId = "1001"; // 假设当前用户的 user_id 通过 req.user.id 获取
    if (!userId) {
        return next(new Error('User ID not found'));
    }
    const query = `
        SELECT user_order.*, game.game_name, game.game_image, game.now_price, game.game_url
        FROM user_order
        JOIN game ON user_order.game_id = game.game_id
        WHERE user_order.user_id = ?
    `;
    connection.query(query, [userId], (err, results) => {
        if (err) {
            return next(err);
        }
        // 打印查询结果以调试
        console.log(results);

        // 将 getStatusClass 和 getStatusText 函数传递给模板
        res.render('user_order', {
            orders: results,
            getStatusClass: getStatusClass,
            getStatusText: getStatusText
        });
    });
});

// 取消退款
router.post('/cancel/:orderId', function (req, res, next) {
    const orderId = req.params.orderId;
    const deleteQuery = 'DELETE FROM refund_table WHERE order_id = ?';
    connection.query(deleteQuery, [orderId], (err, deleteResult) => {
        if (err) {
            return next(err);
        }
        const updateQuery = 'UPDATE user_order SET flag = ? WHERE order_id = ?';
        connection.query(updateQuery, ['-1', orderId], (err, updateResult) => {
            if (err) {
                return next(err);
            }
            res.sendStatus(200);
        });
    });
});

// 提交退款
router.post('/refund', function (req, res, next) {
    const { orderId, reason, specificReason } = req.body;
    console.log('Received refund data:', req.body); // 添加日志

    if (!orderId || !reason || !specificReason) {
        return res.status(400).send('Missing required fields');
    }

    const query = `
        INSERT INTO refund_table (order_id, user_id, reason, specific_reason, commit_time, flag)
        VALUES (?, ?, ?, ?, NOW(), ?)
    `;
    connection.query(query, [orderId, 'user_id_here', reason, specificReason, '0'], (err, result) => {
        if (err) {
            console.error('Error inserting refund data:', err); // 添加日志
            return next(err);
        }
        const updateQuery = 'UPDATE user_order SET flag = ? WHERE order_id = ?';
        connection.query(updateQuery, ['0', orderId], (err, updateResult) => {
            if (err) {
                console.error('Error updating order flag:', err); // 添加日志
                return next(err);
            }
            res.sendStatus(200);
        });
    });
});

// 定义 getStatusClass 函数
function getStatusClass(flag) {
    switch (flag) {
        case '0': return 'status-yellow';
        case '-1': return 'status-red';
        case '1': return 'status-green';
        default: return 'status-blue';
    }
}

// 定义 getStatusText 函数
function getStatusText(flag) {
    switch (flag) {
        case '0': return '退款中';
        case '-1': return '退款失败';
        case '1': return '退款成功';
        default: return '购买成功';
    }
}

module.exports = router;