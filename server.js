const http = require('http'),
  fs = require('fs');

const hostname = '0.0.0.0';
const port = 3000;

function error404(res) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Page Not Found\n');
}

function response(res, contentType, data) {
  res.statusCode = 200;
  res.setHeader('Content-Type', contentType);
  res.write(data);
  res.end();
}

const server = http.createServer((req, res) => { 
  var url = req.url;
  console.log(url);
  if (url == "/favicon.ico") {
    res.end();
  } else if (url.startsWith("/index.html?")) {
    var uri = new URL(url, "http://" + req.headers.host);
    if (uri.searchParams.get('sentkey') != null) {
      var keyCode = Number(uri.searchParams.get('sentkey'));
    }
    res.statusCode = 200;
    res.end(); 
  } else if (url.startsWith("/index.html")) {
    fs.readFile(url.substr(1), function(err, data) {
      if (err) {
        error404(res);
      } else {
        response(res, 'text/html', data);
      }
    });
  } else {
    error404(res);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
