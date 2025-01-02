// routes/update_data.js
var express = require('express');
var router = express.Router();
const connection = require('../sql'); // 引入数据库连接

/* GET update_data page. */
router.get('/', function (req, res, next) {
    res.render('update_data_s', { title: '修改个人资料' });
});

// 获取用户数据
router.get('/get_user_data', function (req, res, next) {
    const userId = req.query.user_id; // 假设通过查询参数传递 user_id

    const query = 'SELECT * FROM user WHERE user_id = ?';
    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error('查询用户数据失败', err);
            return res.status(500).send('查询用户数据失败');
        }
        if (results.length === 0) {
            return res.status(404).send('用户不存在');
        }
        res.json(results[0]);
    });
});

// 保存用户数据
router.post('/save_user_data', function (req, res, next) {
    console.log('Received data:', req.body); // 添加日志

    const userId = req.body.user_id;
    const custName = req.body.cust_name;
    const sex = req.body.sex;
    const email = req.body.email;
    const phoneNumber = req.body.phone_number;

    // 构建动态的 SQL 查询
    let query = 'UPDATE user SET ';
    let params = [];
    let fieldsToUpdate = [];

    if (custName !== undefined) {
        fieldsToUpdate.push('cust_name = ?');
        params.push(custName);
    }
    if (sex !== undefined) {
        fieldsToUpdate.push('sex = ?');
        params.push(sex);
    }
    if (email !== undefined) {
        fieldsToUpdate.push('email = ?');
        params.push(email);
    }
    if (phoneNumber !== undefined) {
        fieldsToUpdate.push('phone_number = ?');
        params.push(phoneNumber);
    }

    // 检查是否有字段要更新
    if (fieldsToUpdate.length === 0) {
        console.log('没有字段要更新');
        return res.status(400).send('没有字段要更新');
    }

    query += fieldsToUpdate.join(', ') + ' WHERE user_id = ?';
    params.push(userId);

    console.log('Generated query:', query); // 添加日志
    console.log('Query parameters:', params); // 添加日志

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('保存用户数据失败', err);
            return res.status(500).send('保存用户数据失败');
        }
        console.log('Update results:', results); // 添加日志
        res.send('用户数据保存成功');
    });
});

module.exports = router;