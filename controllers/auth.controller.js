const {getRedirectUrl} = require('../utils/auth');

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      return res.redirect(getRedirectUrl(req.user.role));
    } 
    res.redirect('/signin');
  });

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
    if (req.isAuthenticated()) {
      return res.redirect(getRedirectUrl(req.user.role));
    }
    res.render('pages/login', { message: req.flash('error')});
  });

  app.post(
    '/signin',
    passport.authenticate('local-signin', {
      failureRedirect: '/signin',
      failureFlash: true
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
