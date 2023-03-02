const http = require("http"); 
//create a server object: 
http.createServer(function (req, res) { 
    res.write("<h1>Hello World!</h1>");
    res.end();
}) .listen(3000);
//Server runs on localhost:8080 