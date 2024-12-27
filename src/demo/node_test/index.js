const mysql = require('mysql2');

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

    // 执行sql语句
    const sql = 'select * from comment';
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('查询失败:', err);
            return;
        }
        console.log('查询结果:', result);
    });

    // 关闭连接
    connection.end();
});