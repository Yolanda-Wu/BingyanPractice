var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require("querystring");
 
 
http.createServer(function (request, response) {
  // 解析请求
  let pathname = url.parse(request.url).pathname;
  let arg = url.parse(request.url).query;
  let params = querystring.parse(arg);
  // 输出请求的文件名
  console.log("Request for " + pathname + " received.");
  //解决跨域
  response.setHeader("Access-Control-Allow-Origin", "*");

  console.log(request.method);

  // 从文件系统中读取请求的文件内容
  if (request.method === 'GET') {
    fs.readFile(pathname, function (err, data) {
      if (err) {
        console.log(err);

        response.writeHead(404, { 'Content-Type': 'text/html' });
      } else {

        response.writeHead(200, { 'Content-Type': 'text/html' });

        // 响应文件内容
        response.write(data.toString());
      }
      //  发送响应数据
      response.end();
    });
  } else if (request.method === 'POST') {
    console.log(params);
    if (params.collected != undefined) {
      fs.readFile(pathname, function (err, data) {
        
        if (err) {
          console.log(err);
  
          response.writeHead(404, { 'Content-Type': 'text/html' });
        } else {
  
          response.writeHead(200, { 'Content-Type': 'text/html' });
          
          data = data.toString();
          data = JSON.parse(data);
          data[params.id]["collected"] = params.collected === "false" ? false : true;
          data = JSON.stringify(data, null, 2);

          fs.writeFile(pathname, data, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('ok.');
            }
        });
          
        }
        //  发送响应数据
        response.end();
      });
    }
  }

}).listen(8080);

console.log('Server running at http://localhost:8080/');