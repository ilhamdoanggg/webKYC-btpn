const ROLES = require('../utils/roles');
const { checkIsInRole, isLoggedIn } = require('../utils/auth');
const sendMessage = require('../utils/sendNotifMessage')
const customerService = require('../services/customer.service');
const userService = require('../services/user.service');
const User = require('../models').user;
const { createFolder, getAllListByFolderName } = require('../utils/fileSystem');

module.exports = (app) => {
  app.get('/sales/home', isLoggedIn, (req, res) => {
    res.render('pages/home', {
      user: req.user,
      pageTitle: 'Menu Utama',
      isManager: req.user.role === ROLES.Manager ? true : false,
      isAdmin: req.user.role === ROLES.Admin ? true : false,
      isHomePage: true,
    });
  });

  app.get('/sales/offering', isLoggedIn, (req, res) => {
    res.render('pages/offering', {
      user: req.user,
      pageTitle: 'Offering',
      isAdmin: req.user.role === ROLES.Admin ? true : false,
    });
  });

  app.get('/sales/offering-data-potensi', isLoggedIn, checkIsInRole(ROLES.Manager, ROLES.Sales), (req, res) => {
    customerService.findAll()
      .then(customers => {
        res.render('pages/offering-data-potensi', {
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

  app.get('/sales/offering-canvas', isLoggedIn, (req, res) => {
    const id = req.query.id;
    if (id) {
      customerService.findById(id)
        .then(customer => {
          res.render('pages/offering-canvas', {
            user: req.user,
            customer,
            pageTitle: 'Offering - Canvasing'
          });
        })
        .catch(function (err) {
          return null;
        })
    } else {
      return res.render('pages/offering-canvas', {
        user: req.user,
        messageSuccess: req.flash('messageSuccess'),
        messageError: req.flash('messageErorr'),
        pageTitle: 'Offering - Canvasing'
      }
      );
    }
  });

  // route confirmations
  app.get('/sales/confirmation', isLoggedIn, (req, res) => {
    customerService.findAll()
      .then(customers => {
        res.render('pages/confirmation', {
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
    const customerId = req.query.id;
    customerService.findById(customerId)
      .then(customer => {
        res.render('pages/videocall-confirmation', {
          user: req.user,
          customer: customer,
        });
      })
      .catch(err => {
        console.log(err);
        return res.redirect('back')
      })
  });

  app.get('/sales/slik-checking', isLoggedIn, (req, res) => {
    res.render('pages/slik-checking', {
      user: req.user,
      pageTitle: 'Slik Checking'
    });
  });

  app.get('/sales/audit-trail', isLoggedIn, (req, res) => {
    res.render('pages/audit-trail', {
      user: req.user,
      pageTitle: 'Audit Trail'
    });
  });

  app.get('/sales/disbursement', isLoggedIn, (req, res) => {
    res.render('pages/disbursement', {
      user: req.user,
      pageTitle: 'Disbursement'
    });
  });
  app.get('/sales/disbursement-input', isLoggedIn, (req, res) => {
    res.render('pages/disbursement-input', {
      user: req.user,
      pageTitle: 'Disbursement'
    });
  });

  app.get('/sales/monitoring', isLoggedIn, (req, res) => {
    res.render('pages/monitoring', {
      user: req.user,
      pageTitle: 'Monitoring'
    });
  });

  app.get('/sales/videocall-verification', checkIsInRole(ROLES.Manager), isLoggedIn, (req, res) => {
    const customerId = req.query.id;
    customerService.findById(customerId)
      .then(customer => {
        res.render('pages/videocall-verification', {
          user: req.user,
          customer: customer,
          pageTitle: 'Verification'
        });
      })
      .catch(err => {
        console.log(err);
        return res.redirect('back')
      })
  });

  app.get('/sales/verification', isLoggedIn, checkIsInRole(ROLES.Manager), (req, res) => {
    customerService.findAll()
      .then(customers => {
        res.render('pages/verification', {
          user: req.user,
          customers,
          pageTitle: 'Verification'
        }
        );
      })
      .catch(function (err) {
        return null;
      })
  });

  app.get('/directory/:customerId', (req, res) => {
    const customerId = req.params.customerId;
    customerService.findById(customerId)
      .then(customer => {
        let customerFolderName = customer.name + "_" + customer.customerNumber;
        createFolder(customerFolderName);
        const fs = require('fs');
        let dir = __basedir + `/storages/${customerFolderName}/`;
        fs.readdir(dir, (err, files) => {
          res.render('pages/directory', {
            user: req.user,
            customer,
            files,
            pageTitle: 'Directory'
          });
        })
      })
  });

  app.get('/sales/administration', isLoggedIn, checkIsInRole(ROLES.Admin), (req, res) => {
    userService.findAll()
      .then(users => {
        res.render('pages/administration', {
          user: req.user,
          pageTitle: 'Administration',
          users,
          messageSuccess: req.flash('messageSuccess'),
          messageError: req.flash('messageErorr'),
        });
      }).catch(err => { return null })
  });

  // Debitur
  app.get('/debitur', (req, res) => {
    const customerId = req.query.id;
    customerService.findById(customerId)
      .then(customer => {
        // User.findById(customer.salesId).then(user => {
        res.render('pages/ui-debitur', {
          isGuest: true,
          customer: customer,
          // salesName: user.firstName + " " + user.lastName,
        });
        // });
      });
  });
};