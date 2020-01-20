const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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

app.get('/html/create', (req, res) => {
    res.render('html/create');
})

app.post('/html/create', (req, res) => {
    user.push(req.body);
    res.render('html/users', {
        users: user
    })
    res.redirect('/create');
})
app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`));