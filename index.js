/**
 * Primary file for API
 */

//  Dependencies
var http = require('http');
var url = require('url');

// Server should respond to all requests with a string
var server = http.createServer(function (req, res) {
    
    //get the URL and parse it.
    var parsedUrl = url.parse(req.url, true);

    // get the path.
    var path = parsedUrl.pathname;
    var trimedpath = path.replace(/^\/+|\/+$/g, '');

    // get the HTTP methods
    var method = req.method.toLocaleLowerCase();

    // send response.
    res.end("Hello World\n");

    // log requests
    console.log('Request recieved on path: ' + trimedpath + ' with this method ' + method);
    
});

// Start the server and have it listen to port 3000
server.listen(8000, function () {
    console.log('Server listening on port 8000 now!\n');
});