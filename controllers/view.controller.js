const ROLES = require('../utils/roles');
const { checkIsInRole, isLoggedIn } = require('../utils/auth');

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.redirect('/signin')
  });

  app.get('/sales/home', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/home');
  });

  app.get('/sales/offering', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/offering');
  });

  app.get('/sales/offering-canvas', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/offering-canvas');
  });

  app.get('/sales/offering-data-potensi', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/offering-data-potensi');
  });

  app.get('/sales/confirmation', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/confirmation');
  });

  app.get('/sales/slik-checking', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/slik-checking');
  });

  app.get('/sales/videocall-confirmation', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/videocall-confirmation');
  });

  app.get('/sales/audit-trail', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/audit-trail');
  });

  app.get('/sales/disbursement', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/disbursement');
  });
  app.get('/sales/disbursement-input', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/disbursement-input');
  });

  app.get('/sales/monitoring', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/monitoring');
  });

  app.get('/sales/videocall-verification', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/videocall-verification');
  });

  app.get('/sales/verification', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/verification');
  });

  // Debitur
  app.get('/debitur', isLoggedIn, checkIsInRole(ROLES.Debitur), (req, res) => {
    res.render('pages/ui-debitur');
  });
};
