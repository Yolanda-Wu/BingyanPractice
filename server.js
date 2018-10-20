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
  console.log(pathname);

  // 从文件系统中读取请求的文件内容
  if (request.method === 'GET') {
    if (pathname == '/') {
      fs.readFile('index.html', function (err, data) {
        if (err) {
          console.log(err);
          response.writeHead(404, { 'Content-Type': 'text/html' });
        } else {
          response.writeHead(200, { 'Content-Type': 'text/html' });
          response.write(data.toString());
        }
        //  发送响应数据
        response.end();
      });
    } else if (pathname == '/OrderSystems/user.json/') {
      login(params, pathname, response);
    } else if (pathname == '/OrderSystems/dataArr.json'){
      sendData(pathname, response);
    } else {
      fs.readFile(pathname, function (err, data) {
        if (err) {
          console.log(err);
          response.writeHead(404, { 'Content-Type': 'text/css' });
        } else {
          response.writeHead(200, { 'Content-Type': 'text/css' });
          response.write(data);
        }
        //  发送响应数据
        response.end();
      });
    }
  } else if (request.method === 'POST') {
    postCollection(pathname, params, response);
  }

}).listen(8080);

console.log('Server running at http://localhost:8080/');

let sendData = function(pathname,response) {
  fs.readFile(pathname, function (err, data) {
    if (err) {
      console.log(err);
      response.writeHead(404, { 'Content-Type': 'text/html' });
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data);
    }
    //  发送响应数据
    response.end();
  });
}

let postCollection = function(pathname, params, response) {
  if (params.collected != undefined) {
    fs.readFile(pathname, function (err, data) {
      
      if (err) {
        console.log(err);
        response.writeHead(404, { 'Content-Type': 'application/json' });
      } else {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        data = JSON.parse(data);
        data[params.id]["collected"] = params.collected === "false" ? false : true;
        data = JSON.stringify(data, null, 2);

        fs.writeFile(pathname, data, function (err) {
          if (err) {
              console.log(err);
          } else {
              console.log('ok');
          }
      });
        
      }
      //  发送响应数据
      response.end();
    });
  }
}

let login = function(user, pathname, response) {
  let users;
  fs.readFile(pathname, function (err, data) {
    response.setHeader('Set-Cookie', [`user_id=${user.id}`, `password=${user.password}`]);
    if (err) {
      console.log(err);
      response.writeHead(404, {'Content-Type': 'text/html'});
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      users = JSON.parse(data);
      if (users[user.id] == null) {
        response.write('{"ok": false, "msg": "The user id dose not exit!"}');
      } else if (users[user.id] != user.password) {
        response.write('{"ok": false, "msg": "The user id or the password is wrong!"}');
      } else {
        response.write('{"ok": true, "msg": "Login Successfully!"}');
      }
    }
    response.end();
  });
}