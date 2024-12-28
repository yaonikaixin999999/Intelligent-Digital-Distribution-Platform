const http = require('http');
// 解析字符串
const qyuerystring = require('querystring');

const server = http.createServer((req, res) => {
    console.log("dfasfasd");
    let postVal = "";
  req.on("data", (chunk) => {
    postVal += chunk;
    })
    req.on("end",()=>{
        let formVal = qyuerystring.parse(postVal);
        let user_id = formVal.user_id;
        let password = formVal.password;
        req.write("user_id:"+user_id + "password:"+password);
        res.end();
    })
})
server.listen(80);