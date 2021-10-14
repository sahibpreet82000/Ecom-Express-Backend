const http = require("http");
const fs = require("fs");
const hostname = require("os");
const hostname1 = "127.0.0.1";
const port = 3000;
const home = fs.readFileSync("homepage.html");
const product = fs.readFileSync("html/products.html");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  res.end(home);
});

server.listen(port, hostname1, () => {
  console.log(`running  ${hostname1}`);
});
