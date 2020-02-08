/**
 * Primary file for API
 */

//  Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

// Server should respond to all requests with a string
var server = http.createServer(function (req, res) {
    
    //get the URL and parse it.
    var parsedUrl = url.parse(req.url, true);

    // get the path.
    var path = parsedUrl.pathname;
    var trimedPath = path.replace(/^\/+|\/+$/g, '');

    // get the query string
    var queryStringObject = parsedUrl.query;

    // get the HTTP methods
    var method = req.method.toLocaleLowerCase();

    // get the headers as an objects
    var headers = req.headers;

    
    /**
     * get the payloads if any
     * -----------------------
     * NOTES
     * -----------------------
     * Now node is uses "streams" heavily (which is a way data comes in bit by bit rather than all at once).
     * However for this application, our need is to get the data all at once, and in order to do that we'll
     * call a function that executes when there's data coming in and assigns the data to an existing empty
     * variable, each time. And another function that checks if streaming is done then sends the response we
     * want and/or logs out our desired message. NOTE: that the second function [ on('end') ] will alreays 
     * execute even if there's no streaming data. However, the first function [ on('data') ]'s execution dep-
     * ends on the presence of data.
     */
    var decoder = new StringDecoder('utf-8'); // from the StrindDecoder library we required above
    var buffer = ''; // this will later hold all our streamed data for us toaccess at once.

    req.on('data', function (data) {
        buffer += decoder.write(data);
    });

    req.on('end', function () {
        buffer += decoder.end();

        // choosee the handler this request should go to. If one isnt found, use the not founf handler.
        var chosenHandler = typeof(router[trimedPath]) !== 'undefined' ? router[trimedPath] : handlers.notFound;

        // construct the data object to send to the handler.
        var data = {
            'trimedPath': trimedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer,
        };

        // route the request to the handler specified in the router
        chosenHandler(data, function(statusCode, payload) {
            // use the status code called back by the handler, or default to 200.
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

            // use the payload called back by the handler or default to an empty oject.
            payload = typeof (payload) == 'object' ? payload : {};

            // convert the payload to a string
            var payloadString = JSON.stringify(payload);

            // return the respone
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

             // log requests
            console.log('Returning this response: ', statusCode, payloadString);
        });
    });

    
});

// Start the server and have it listen to port 3000
server.listen(8000, function () {
    console.log('Server listening on port 8000 now!\n');
});

/**
 * ROUTES
 */

// Define handlers
var handlers = {}

// sample handler
handlers.sample = (data, callback) => {
    // We want to call back HTTP status code and the payload object
    callback(406, { 'name': 'sample handler' });
}

// not-found handlers
handlers.notFound = (data, callback) => {
    callback(404);
}

// Define a request router
var router = {
    'sample':handlers.sample
}
