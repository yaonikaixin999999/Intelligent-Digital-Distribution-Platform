const http = require('http');

const server = http.createServer((req, res) => {
   let postVal = "";
  req.on("data", (chunk) => {
    postVal += chunk;
    })
    req.on("end",()=>{
        res.write(postVal);
        res.end();
    })
})

console.log("Server is running");
console.log("http://127.0.0.1:80");
server.listen(80);