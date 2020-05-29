module.exports = (app, passport) => {
  app.get('/signup', (req, res) => {
    res.render('pages/signup');
  });

  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/home',
      failureRedirect: '/signup'
    })
  );

  app.get('/signin', (req, res) => {
    res.render('pages/login');
  });

  app.post(
    '/signin',
    passport.authenticate('local-signin', {
      successRedirect: '/home',
      failureRedirect: '/signin'
    })
  );

  app.get('/logout', (req, res) => {
    req.session.destroy(err => {
      res.redirect('/');
    });
  });

  
};
