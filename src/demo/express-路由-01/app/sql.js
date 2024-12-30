var mysql = require('mysql2');

// 创建数据库连接
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '336699',
    database: 'lddp'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

module.exports = db;

