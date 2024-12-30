<<<<<<< HEAD
// server.js
=======
>>>>>>> d2a815c5a206e982ee486f83439ecda3bd80b21c
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
<<<<<<< HEAD
const port = 3000;

// 创建数据库连接
const db = mysql.createConnection({
=======
const port = 336;

const connection = mysql.createConnection({
>>>>>>> d2a815c5a206e982ee486f83439ecda3bd80b21c
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
<<<<<<< HEAD
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

=======
    console.log('数据库连接成功');
});

// 配置静态文件目录
app.use(express.static('public'));

// 定义路由，处理GET请求
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM comment';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('查询失败:', err);
            res.status(500).send('查询失败');
            return;
        }
        res.json(results);
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
}).on('error', (err) => {
    console.error('服务器启动失败:', err);
});
>>>>>>> d2a815c5a206e982ee486f83439ecda3bd80b21c
