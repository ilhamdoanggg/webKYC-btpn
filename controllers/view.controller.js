const ROLES = require('../utils/roles');
const { checkIsInRole, isLoggedIn } = require('../utils/auth');

module.exports = (app, passport) => {
  app.get('/sales/home', (req, res) => {
    res.render('pages/home', { user: req.user, pageTitle: 'Menu Utama' });
  });

  app.get('/sales/offering', (req, res) => {
    res.render('pages/offering', { user: req.user, pageTitle: 'Offering' });
  });

  app.get('/sales/confirmation', (req, res) => {
    res.render('pages/confirmation', { user: req.user, pageTitle: 'Confirmation' });
  });

  app.get('/sales/videocall-confirmation', (req, res) => {
    res.render('pages/videocall-confirmation', { user: req.user });
  });


  app.get('/sales/slik-checking', isLoggedIn, (req, res) => {
    res.render('pages/slik-checking', { user: req.user, pageTitle: 'Slik Checking' });
  });

  app.get('/sales/audit-trail', isLoggedIn, (req, res) => {
    res.render('pages/audit-trail', { user: req.user, pageTitle: 'Audit Trail' });
  });

  app.get('/sales/disbursement', isLoggedIn, (req, res) => {
    res.render('pages/disbursement', { user: req.user, pageTitle: 'Disbursement' });
  });
  app.get('/sales/disbursement-input', isLoggedIn, (req, res) => {
    res.render('pages/disbursement-input', { user: req.user, pageTitle: 'Disbursement' });
  });

  app.get('/sales/monitoring', isLoggedIn, (req, res) => {
    res.render('pages/monitoring', { user: req.user, pageTitle: 'Monitoring' });
  });

  app.get('/sales/videocall-verification', isLoggedIn, (req, res) => {
    res.render('pages/videocall-verification', { user: req.user, pageTitle: 'Verification' });
  });

  app.get('/sales/verification', isLoggedIn, (req, res) => {
    res.render('pages/verification', { user: req.user, pageTitle: 'Verification' });
  });

  // Debitur
  app.get('/debitur', (req, res) => {
    res.render('pages/ui-debitur');
  });
};