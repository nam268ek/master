const express = require("express");
const app = express();
const port = 3456;

app.set('view engine', 'pug');
app.set('views', './views');

//Bài 2 - Template engines
app.get('/', function(req, res) {
    res.render('index');
});
app.get('/user', function(req, res) {
    res.render('user');
});
app.listen(3456, function() {
    console.log("Server listening on port" + port);
});
