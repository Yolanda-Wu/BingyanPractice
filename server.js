let http = require('http');
let fs = require('fs');
let url = require('url');
let querystring = require("querystring");
let path = require('path');
 
 
http.createServer(function (request, response) {
  // 解析请求
  let pathname = url.parse(request.url).pathname;
  let arg = url.parse(request.url).query;
  let params = querystring.parse(arg);
  // 输出请求的文件名
  console.log("Request for " + pathname + " received.");
  //解决跨域
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:8080/");
  response.setHeader("Access-Control-Allow-Credentials", "true");

  console.log(request.method);
  console.log(pathname);

  let body = "";
  request.on('data', function (chunk) {
    body += chunk;
  });
  

  // 从文件系统中读取请求的文件内容
  if (request.method === 'GET') {
    switch (path.extname(pathname)) {
      case '': sendHtml('index.html', response); break;
      case '.js': sendSheet(pathname, response); break;
      case '.css': sendSheet(pathname, response); break;
      case '.html': sendHtml(pathname, response); break;
      case '.json': sendData(pathname, response); break;
      case '.svg': sendSvg(pathname, response); break;
      default : sendData(pathname, response); break; 
    }
    
  } else if (request.method === 'POST') {
    request.on('end', function () {
      body = querystring.parse(body);
      if (body.id != undefined) {
        login(body, '/OrderSystems/user.json', response);
      } else {
        postCollection(pathname, params, response);
      }
    });
  }

}).listen(8080);

console.log('Server running at http://localhost:8080/');

let sendData = function(pathname,response) {
  fs.readFile(pathname, function (err, data) {
    if (err) {
      console.log(err);
      response.writeHead(404, { 'Content-Type': 'application/json' });
    } else {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(data);
    }
    //  发送响应数据
    response.end();
  });
}

let sendHtml = function(pathname, response) {
  fs.readFile(pathname, function (err, data) {
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
}

let sendSvg = function(pathname, response) {
  fs.readFile(pathname, function (err, data) {
    if (err) {
      console.log(err);
      response.writeHead(404, { 'Content-Type': 'image/svg+xml' });
    } else {
      response.writeHead(200, { 'Content-Type': 'image/svg+xml' });
      response.write(data.toString());
    }
    //  发送响应数据
    response.end();
  });
}

let sendSheet = function(pathname, response) {
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