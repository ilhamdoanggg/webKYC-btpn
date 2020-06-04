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

  app.get('/audit-trail', isLoggedIn, (req, res) => {
    res.render('pages/audit-trail');
  });

  app.get('/disbursement', isLoggedIn, (req, res) => {
    res.render('pages/disbursement');
  });
  app.get('/disbursement-input', isLoggedIn, (req, res) => {
    res.render('pages/disbursement-input');
  });

  app.get('/monitoring', isLoggedIn, (req, res) => {
    res.render('pages/monitoring');
  });

  app.get('/videocall-verification', isLoggedIn, (req, res) => {
    res.render('pages/videocall-verification');
  });

  app.get('/verification', isLoggedIn, (req, res) => {
    res.render('pages/verification');
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect('/signin');
  }
};
