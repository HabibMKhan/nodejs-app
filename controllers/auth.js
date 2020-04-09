const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    console.log(req.session.isLoggedIn);
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: false
    });
};

exports.postLogin = (req, res, next) => {
    User.findById('5e8c28d59d410f26c8b4fc26')
    .then(user => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      req.session.save(err => {
          console.log(err);
          res.redirect('/');
      });
    })
    .catch(err => console.log(err));
    // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log('Error logout', err);
        res.redirect('/');
    });
}