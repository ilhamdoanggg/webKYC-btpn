module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.redirect('/signin')
  });

  app.get('/home', isLoggedIn, (req, res) => {
    res.render('pages/home');
  });

  app.get('/offering', isLoggedIn, (req, res) => {
    res.render('pages/offering');
  });

  app.get('/offering-canvas', isLoggedIn, (req, res) => {
    res.render('pages/offering-canvas');
  });

  app.get('/offering-data-potensi', isLoggedIn, (req, res) => {
    res.render('pages/offering-data-potensi');
  });

  app.get('/confirmation', isLoggedIn, (req, res) => {
    res.render('pages/confirmation');
  });

  app.get('/slik-checking', isLoggedIn, (req, res) => {
    res.render('pages/slik-checking');
  });

  app.get('/videocall-confirmation', isLoggedIn, (req, res) => {
    res.render('pages/videocall-confirmation');
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect('/signin');
  }
};
