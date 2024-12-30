let express = require('express');

let app = express();
// var debug = require('debug')('express:server');
// var http = require('http');
// var port = path.normalize(process.env.PORT || '829');
app.set('port', port);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


const querystring = require('querystring');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// 创建数据库连接
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '336699',
    database: 'lddp'
});

// 连接数据库
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app = http.createServer((req, res) => {
    console.log("Request received");
    let postVal = "";
    req.on("data", (chunk) => {
        postVal += chunk;
    });
    req.on("end", () => {
        if (postVal) {
            let formVal = querystring.parse(postVal);
            let user_id = formVal.user_id;
            let password = formVal.password;

            // 查询数据库验证用户信息
            const sql = 'SELECT * FROM user WHERE user_id = ? AND password = ?';
            db.query(sql, [user_id, password], (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }

                if (results.length > 0) {
                    // 登录成功，读取并返回 header.html 文件
                    const filePath = path.join(__dirname, '../../System/home_page_z/header.html');
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            console.error('Error reading file:', err);
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Internal Server Error');
                            return;
                        }
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(data);
                    });
                } else {
                  const filePath = path.join(__dirname, '../Login/index.html');
                  fs.readFile(filePath, 'utf8', (err, data) => {
                      if (err) {
                          console.error('Error reading file:', err);
                          res.writeHead(500, { 'Content-Type': 'text/plain' });
                          res.end('Internal Server Error');
                          return;
                      }
                      res.writeHead(200, { 'Content-Type': 'text/html' });
                      res.end(data);
                  });


                    res.writeHead(401, { 'Content-Type': 'text/plain' });
                    res.end('Invalid user_id or password');
                }
            });
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('No data received');
        }
    });
});

console.log("Server is running");
console.log("http://127.0.0.1:829");
app.listen(829);