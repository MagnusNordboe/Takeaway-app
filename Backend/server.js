const http = require('http');

//Firebase constants
const admin = require('firebase-admin');
const serviceAccount = require('key.json');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//Initialize Firebase database connection
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://takeawayapp-d0b22.firebaseio.com'
  });
  