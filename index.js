/**
 * Primary file for API
 */

//  Dependencies
var http = require('http');

// Server should respond to all requests with a string
var server = http.createServer(function (req, res) {
    res.end("Hello World\n");
});

// Start the server and have it listen to port 3000
server.listen(3000, function () {
    console.log('Server listening on port 3000 now!');
});