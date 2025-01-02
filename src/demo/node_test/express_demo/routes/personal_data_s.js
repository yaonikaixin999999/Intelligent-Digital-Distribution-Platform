// routes/personal_data.js
const express = require('express');
const router = express.Router();
const connection = require('./sql'); // 引入数据库连接模块

router.get('/', function (req, res, next) {
    const userId = 'admin'; // 假设这是当前用户的ID，实际应用中可以从session或请求参数中获取
    const userQuery = 'SELECT cust_name FROM user WHERE user_id = ?';
    // 执行查询
    connection.query(userQuery, [userId], (userErr, userResults) => {
        if (userErr) return next(userErr);

        // 打印日志以检查数据
        console.log('User:', userResults[0]);

        // 渲染页面并传递数据
        res.render('personal_data_s', {
            user: userResults[0],
        });
    });
});

module.exports = router;