const express = require('express');

const adminData = require('./admin');

const router = express.Router();

router.get('/users', (req, res, next) => {
    const allUsers = adminData.users;
    console.log('allUsers from shop.js', allUsers);
    res.render('shop', {users: allUsers, pageTitle: 'All Users', path: '/users'});
});

module.exports = router;