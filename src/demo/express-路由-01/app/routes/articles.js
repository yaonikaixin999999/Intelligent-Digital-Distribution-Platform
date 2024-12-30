var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('/users', { title: 'Express' });
});


router.post('/verify',function(req,res,next){
  res.end("1111");
})

module.exports = router;
