const express = require('express');

const router = express.Router();

const userList = [];

router.get('/', (req, res, next) => {
    res.render('admin', { pageTitle: 'Add Users', path: '/'});
});

router.post('/', (req, res, next) => {
    userList.push({user: req.body.username});
    res.redirect('/users');
});

exports.routes = router;
exports.users = userList;