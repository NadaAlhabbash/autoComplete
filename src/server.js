const http = require('http');
const router = require('./index');
const port = 3000;

const server = http.createServer(router);

server.listen(port, () => {
    console.log(`Listiniing in url : localhost:${port}`);
});