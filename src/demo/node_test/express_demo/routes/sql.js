// sql.js
const mysql = require('mysql2');

// 创建数据库连接
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
        console.error('数据库连接失败', err);
        return;
    }
    console.log('数据库连接成功');
});

module.exports = connection;