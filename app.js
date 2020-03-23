const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('Log 1');
    next();
});

app.use((req, res, next) => {
    console.log('Log 2');
    next();
});

app.use('/users', (req, res, next) => {
    res.send('<h1>Users List:</h1><ul><li>User1</li><li>User2</li></ul>');
});

app.use('/', (req, res, next) => {
    res.send('<h1>Welcome Home!</h1>');
});


app.listen(3000);