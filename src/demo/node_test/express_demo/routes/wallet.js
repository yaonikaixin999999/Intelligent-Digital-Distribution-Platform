// routes/wallet.js
var express = require('express');
var router = express.Router();
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

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('wallet', { title: '个人钱包' });
});

/* GET user balance. */
router.get('/balance', (req, res) => {
    const userId = '1001'; // 假设你已经通过中间件获取了用户ID

    // 查询用户的当前余额
    const query = 'SELECT money FROM money WHERE user_id = ?';
    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching balance:', err);
            return res.status(500).json({ error: '服务器错误' });
        }

        if (results.length === 0) {
            console.error('User not found:', userId);
            return res.status(404).json({ error: '用户未找到' });
        }

        const balance = results[0].money.toFixed(2);
        res.json({ balance });
    });
});

router.post('/recharge', (req, res) => {
    const { amount } = req.body;
    const userId = '1001'; // 假设你已经通过中间件获取了用户ID

    // 检查用户ID是否存在
    const checkUserQuery = 'SELECT * FROM money WHERE user_id = ?';
    connection.query(checkUserQuery, [userId], (checkErr, checkResults) => {
        if (checkErr) {
            console.error('Error checking user:', checkErr);
            return res.status(500).json({ error: '服务器错误' });
        }

        if (checkResults.length === 0) {
            console.error('User not found:', userId);
            return res.status(404).json({ error: '用户未找到' });
        }

        const updateQuery = 'UPDATE money SET money = money + ? WHERE user_id = ?';

        connection.query(updateQuery, [amount, userId], (error, results) => {
            if (error) {
                console.error('Error updating balance:', error);
                return res.status(500).json({ error: '服务器错误' });
            }

            // 获取更新后的余额
            const getBalanceQuery = 'SELECT money FROM money WHERE user_id = ?';
            connection.query(getBalanceQuery, [userId], (err, balanceResult) => {
                if (err) {
                    console.error('Error fetching balance:', err);
                    return res.status(500).json({ error: '服务器错误' });
                }

                const newBalance = balanceResult[0].money.toFixed(2);
                res.json({ newBalance });
            });
        });
    });
});

// 导出路由
module.exports = router;