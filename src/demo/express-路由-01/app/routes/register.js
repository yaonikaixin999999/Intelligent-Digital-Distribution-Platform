var express = require('express');
var router = express.Router();
var db = require('../sql.js');


  router.post('/', function(req, res, next) {
    var val = req.body;
    var user_id = val.user_id;
    var email = val.email;
    var phone_number = val.phone_number;
    var password = val.password;
    //查询数据库
    db.query('insert into user values(?,?,?,?,?,?,?)', [user_id, password,'未知','未知',email,phone_number,1], function(err, data) {
        if (err) {
            console.log(err);
            res.send('账号已存在或者输入的格式错误');
        } else {
            res.send('注册成功');
        }
    });
  });
  
  module.exports = router;