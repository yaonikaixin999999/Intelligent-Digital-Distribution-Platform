var express = require('express');
var router = express.Router();
var db = require('./sql.js');

router.get('/', function (req, res, next) {
    res.render("login")
});

router.post('/verify', function (req, res, next) {
    var val = req.body;
    var user_id = val.user_id;
    var password = val.password;
    console.log(user_id);
    //查询数据库
    db.query('select * from user where user_id = ? and password = ?', [user_id, password], function (err, data) {
        if (err) {
            console.log(err);
            res.send('error');
        } else {
            if (data.length > 0) {
                // res.send('登录成功');
                res.render('main');
            } else {
                res.render('login');
            }
        }
    });
});

module.exports = router;