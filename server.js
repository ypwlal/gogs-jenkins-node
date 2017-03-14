var bodyParser = require('body-parser'); //解析请求body

var express = require('express');
var routes = require("./routes");

var app = new express();
var PORT = process.env.PORT ? process.env.PORT : 5001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

app.listen(PORT, function(error) {
   if(error) {
       console.log(error);
   }else {
       console.log('Listening on port %s.', PORT);
   }
});