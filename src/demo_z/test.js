// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
// const port = 3000;

// 创建数据库连接
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '336699',
    port : 3306,
    database: 'lddp'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

// 使用body-parser中间件解析JSON请求体
app.use(bodyParser.json());

// 处理登录请求
app.post('/api/login', (req, res) => {
    const { user_id, password } = req.body;

    // 查询数据库验证用户
    const query = 'SELECT * FROM users WHERE user_id = ? AND password = ?';
    db.query(query, [user_id, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ success: false, message: '服务器错误' });
        }

        if (results.length > 0) {
            res.json({ success: true, message: '登录成功' });
        } else {
            res.json({ success: false, message: '用户名或密码错误' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});