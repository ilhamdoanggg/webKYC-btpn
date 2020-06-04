const {getRedirectUrl} = require('../utils/auth');

module.exports = (app, passport) => {
  app.get('/signup', (req, res) => {
    res.render('pages/signup');
  });

  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      failureRedirect: '/signin'
    }), (req, res) => {
      res.redirect(getRedirectUrl(req.user.role));
    }
  );

  app.get('/signin', (req, res) => {
    res.render('pages/login');
  });

  app.post(
    '/signin',
    passport.authenticate('local-signin', {
      failureRedirect: '/signin'
    }), (req, res) => {
      res.redirect(getRedirectUrl(req.user.role));
    }
  );

  app.get('/logout', (req, res) => {
    req.session.destroy(err => {
      res.redirect('/');
    });
  });

  
};
