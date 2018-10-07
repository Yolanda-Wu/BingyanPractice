var http = require('http');
var fs = require('fs');
var url = require('url');
 
 
// 创建服务器
http.createServer( function (request, response) {  
   // 解析请求，包括文件名
  var pathname = url.parse(request.url).pathname;
   
   // 输出请求的文件名
  console.log("Request for " + pathname + " received.");
   
  response.setHeader("Access-Control-Allow-Origin", "get");
  response.setHeader("Access-Control-Allow-Origin", "*");    
  response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");    
  response.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");    
  response.setHeader("X-Powered-By",' 3.2.1');   
  response.setHeader("Content-Type", "application/json;charset=utf-8");


   // 从文件系统中读取请求的文件内容
  fs.readFile('data.json', function (err, data) {
    if (err) {
      console.log(err);
      // HTTP 状态码: 404 : NOT FOUND
      // Content Type: text/plain
      response.writeHead(404, { 'Content-Type': 'text/html' });
    } else {
      // HTTP 状态码: 200 : OK
      // Content Type: text/plain
      response.writeHead(200, { 'Content-Type': 'text/html' });

      // 响应文件内容
      response.write(data.toString());
    }
    //  发送响应数据
    response.end();
  });
}).listen(8080);

// 控制台会输出以下信息
console.log('Server running at http://localhost:8080/');