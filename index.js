const pem = require("pem");
const http = require('http');
 fs = require("fs");

// Reading keys from app setting references 
let thumbprint = process.env.WEBSITE_LOAD_CERTIFICATES
const privatekey = fs.readFileSync(`/var/ssl/private/${thumbprint}.p12`);
const publickey = fs.readFileSync(`/var/ssl/certs/${thumbprint}.der`);


// Create an instance of the http server to handle HTTP requestsin
let app = http.createServer((req, res) => {

  // Set a response type of plain text for the response
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Send back a response with key decoded as a string
  res.end("Public certificate stored & decoded to a base64 string is: " + publickey.toString('base64'));

});

// Prints cert, ca, key to logs
const pfx = fs.readFileSync(`/var/ssl/private/${thumbprint}.p12`);
pem.readPkcs12(pfx, { p12Password: "" }, (err, cert) => {
    console.log(cert);
  });
  

let port = process.env.PORT || 3000;

// Start the server on port 3000
app.listen(port);