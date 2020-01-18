const express = require('express');
const app = express();
const port = 5500

var user = [
    { name: "Minh Nam" },
    { name: "Van anh" }
];

app.set('view engine', 'pug');
app.set('views','./views');


app.get('/', (req, res) => {
    res.render('html/index', {
        users: user
    });

})

app.get('/search', (req, res) => {
    var valInput = req.query.input;
    var results = user.filter((user) => {
        return user.name.indexOf(valInput) !== -1;
    });

    res.render('html/index', {
        users: results
    });
})


app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`));