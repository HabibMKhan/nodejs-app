const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const User = require('./models/user');
require('dotenv').config();

const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');

const app = express();
const store = new MongoDBStore({
  uri: process.env.ATLAS_URI,
  collection: 'sessions'
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false, 
  saveUninitialized: false, 
  store
}));

app.use(csrfProtection);

app.use((req, res, next) => {
  if (!req.session || !req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
  .then(user => {
    req.user = user;
    next();
  })
  .catch(err => console.log(err));
});

app.use((req, res, next) => {
  req.isLoggedIn = false;
	let cookies = req.get('Cookie');
  if (cookies) {
    cookies = cookies.split('; ');
    cookies.forEach(cookie => {
      const key = cookie.split('=')[0];
      if (key === 'loggedIn') {
        const value = cookie.split('=')[1];
        if (value === 'true') {
          req.isLoggedIn = true;
        }
      }
    });  
  }
	next();
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {    
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });