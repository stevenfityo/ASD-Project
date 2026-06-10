const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3847;
const root = __dirname;
const mime = { '.html':'text/html', '.jsx':'application/javascript', '.js':'application/javascript', '.css':'text/css', '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml' };
http.createServer((req, res) => {
  let p = path.join(root, req.url === '/' ? 'index.html' : req.url);
  fs.readFile(p, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': mime[path.extname(p)] || 'text/plain' });
    res.end(data);
  });
}).listen(port, () => console.log('Serving on ' + port));
