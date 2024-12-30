let express = require('express');
let app = express();



app.use('/users/login',function(req , res){
    console.log('login');
    res.send('login');
})


app.listen(3000, function (){
    console.log('express server running at http://127.0.0.1:3000');
})