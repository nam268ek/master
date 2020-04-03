const express = require("express");
const app = express();
const port = 3456;

app.get('/', function(req, res) {
    res.send("Well comeback");
});

app.listen(3456, function() {
    console.log("Server listening on port" + port);
});