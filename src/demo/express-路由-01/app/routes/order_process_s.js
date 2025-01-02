var express = require('express');
var router = express.Router();
const connection = require('../sql'); // 引入数据库连接

// 获取所有订单（GET请求）
router.get('/', function (req, res, next) {
    const query = `
        SELECT user_order.*, game.*
        FROM user_order
        join refund_table ON user_order.order_id = refund_table.order_id
        JOIN game ON user_order.game_id = game.game_id
    `;
    connection.query(query, (err, results) => {
        if (err) {
            return next(err);
        }
        // 打印查询结果以调试
        console.log(results);

        res.render('order_process_s', {
            refund_order: results, 
        });
    });
});

// 拒绝退款（POST请求）
router.post('/reject', function (req, res, next) {
    const { orderId } = req.body;
    deleteQuery = 'DELETE FROM refund_table WHERE order_id = ?';
    const updateQuery = 'UPDATE user_order SET flag = -1 WHERE order_id = ?';
    connection.query(deleteQuery, [orderId], (err, results) => {
        if (err) {
            return next(err);
        }else{
            connection.query(updateQuery, [orderId], (err, results) => {
        if (err) {
            return next(err);
        }
        res.json({ message: '拒绝成功' });
    });
        }
    });
    
});

// 接受退款（POST请求）
router.post('/accept', function (req, res, next) {
    const { orderId } = req.body;
    deleteQuery = 'DELETE FROM refund_table WHERE order_id = ?';
    const updateQuery = 'UPDATE user_order SET flag = 1 WHERE order_id = ?';
    connection.query(deleteQuery, [orderId], (err, results) => {
        if (err) {
            return next(err);
        }else{
            connection.query(updateQuery, [orderId], (err, results) => {
            if (err) {
                return next(err);
            }
            res.json({ message: '接收成功' });
     });
        }
    });
});

module.exports = router;