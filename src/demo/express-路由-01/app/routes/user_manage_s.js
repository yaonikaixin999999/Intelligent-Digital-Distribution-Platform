var express = require('express');
var router = express.Router();
const connection = require('../sql'); // 引入数据库连接

// 获取所有用户数据
router.get('/', function (req, res, next) {
    const getAllUsersQuery = 'SELECT * FROM user';
    connection.query(getAllUsersQuery, (err, users) => {
        if (err) {
            return next(err);
        }
        res.render('user_manage_s', {
            users: users,
            getStatusClass: getStatusClass,
            getStatusText: getStatusText
        });
    });
});

// 解封用户
router.post('/unban', function (req, res, next) {
    const { userId } = req.body; // 确保字段名与前端一致
    const query = 'UPDATE user SET flag = 1 WHERE user_id = ?';
    connection.query(query, [userId], (err, results) => {
        if (err) {
            return next(err);
        }
        // 重新获取用户数据并渲染模板
        const getAllUsersQuery = 'SELECT * FROM user';
        connection.query(getAllUsersQuery, (err, users) => {
            if (err) {
                return next(err);
            }
            res.render('user_manage_s', {
                users: users,
                getStatusClass: getStatusClass,
                getStatusText: getStatusText
            });
        });
    });
});

// 封禁用户
router.post('/ban', function (req, res, next) {
    const { userId } = req.body; // 确保字段名与前端一致
    const query = 'UPDATE user SET flag = 0 WHERE user_id = ?';
    connection.query(query, [userId], (err, results) => {
        if (err) {
            return next(err);
        }
        // 重新获取用户数据并渲染模板
        const getAllUsersQuery = 'SELECT * FROM user';
        connection.query(getAllUsersQuery, (err, users) => {
            if (err) {
                return next(err);
            }
            res.render('user_manage_s', {
                users: users,
                getStatusClass: getStatusClass,
                getStatusText: getStatusText
            });
        });
    });
});

// 定义 getStatusClass 函数
function getStatusClass(flag) {
    switch (flag) {
        case '0': return 'status-yellow';
        case '1': return 'status-green';
        default: return 'status-blue';
    }
}

// 定义 getStatusText 函数
function getStatusText(flag) {
    switch (flag) {
        case '0': return '封禁中';
        case '1': return '正常';
    }
}

module.exports = router;