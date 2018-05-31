const http = require('http');           //Node require http
const app = require('./app');

const port = process.env.PORT || 3000;      //set up default port

const server = http.createServer(app);             // create a server using http.createServer()

server.listen(port);                        // server listen at port
