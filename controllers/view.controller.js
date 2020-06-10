const ROLES = require('../utils/roles');
const { checkIsInRole, isLoggedIn } = require('../utils/auth');

module.exports = (app, passport) => {
  app.get('/sales/home', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/home', {user: req.user, pageTitle: 'Menu Utama'});
  });

  app.get('/sales/offering', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/offering', {user: req.user, pageTitle: 'Offering'});
  });

  app.get('/sales/offering-canvas', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/offering-canvas', {user: req.user, pageTitle: 'Offering - Canvasing'});
  });

  app.get('/sales/offering-data-potensi', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/offering-data-potensi', {user: req.user, pageTitle: 'Offering - Data Potensi'});
  });

  app.get('/sales/confirmation', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/confirmation', {user: req.user, pageTitle: 'Confirmation'});
  });

  app.get('/sales/slik-checking', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/slik-checking', {user: req.user, pageTitle: 'Slik Checking'});
  });

  app.get('/sales/videocall-confirmation', (req, res) => {
    res.render('pages/videocall-confirmation', {user: req.user});
  });

  app.get('/sales/audit-trail', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/audit-trail', {user: req.user, pageTitle: 'Audit Trail'});
  });

  app.get('/sales/disbursement', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/disbursement', {user: req.user, pageTitle: 'Disbursement'});
  });
  app.get('/sales/disbursement-input', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/disbursement-input', {user: req.user, pageTitle: 'Disbursement'});
  });

  app.get('/sales/monitoring', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/monitoring', {user: req.user, pageTitle: 'Monitoring'});
  });

  app.get('/sales/videocall-verification', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/videocall-verification', {user: req.user, pageTitle: 'Verification'});
  });

  app.get('/sales/verification', isLoggedIn, checkIsInRole(ROLES.Sales), (req, res) => {
    res.render('pages/verification', {user: req.user, pageTitle: 'Verification'});
  });

  // Debitur
  app.get('/debitur', (req, res) => {
    res.render('pages/ui-debitur');
  });
};