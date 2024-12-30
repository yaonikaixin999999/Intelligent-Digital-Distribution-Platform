const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 336;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yzbzz189xwmrwxyd',
    port: 3306,
    database: 'lddp',
});

// 连接到数据库
connection.connect((err) => {
    if (err) {
        console.error('连接数据库失败:', err);
        return;
    }
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