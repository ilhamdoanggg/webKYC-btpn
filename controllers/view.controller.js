const ROLES = require('../utils/roles');
const { checkIsInRole, isLoggedIn } = require('../utils/auth');
const customerService = require('../services/customer.service');

module.exports = (app, passport) => {
  app.get('/sales/home', (req, res) => {
    res.render('pages/home', { user: req.user, pageTitle: 'Menu Utama' });
  });

  app.get('/sales/offering', (req, res) => {
    res.render('pages/offering', { user: req.user, pageTitle: 'Offering' });
  });

  app.get('/sales/offering-data-potensi', (req, res) => {
    customerService.findAll()
      .then(customers => {
        res.render('pages/offering-data-potensi',
          {
            user: req.user,
            customers,
            messageSuccess: req.flash('messageSuccess'),
            messageError: req.flash('messageErorr'),
            pageTitle: 'Offering - Data Potensi'
          }
        );
      })
      .catch((err) => {
        console.error(err);
        return null;
      })
  });

  app.get('/sales/offering-canvas', (req, res) => {
    const id = req.query.id;
    if (id) {
      customerService.findById(id)
        .then(customer => {
          res.render('pages/offering-canvas', { user: req.user, customer, pageTitle: 'Offering - Canvasing' });
        })
        .catch(function (err) {
          return null;
        })
    } else {
      return res.render('pages/offering-canvas',
        {
          user: req.user,
          messageSuccess: req.flash('messageSuccess'),
          messageError: req.flash('messageErorr'),
          pageTitle: 'Offering - Canvasing'
        }
      );
    }
  });

  // route confirmations
  app.get('/sales/confirmation', (req, res) => {
    customerService.findAll()
      .then(customers => {
        res.render('pages/confirmation',
          {
            user: req.user,
            customers,
            pageTitle: 'Confirmation'
          }
        );
      })
      .catch(function (err) {
        return null;
      })
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