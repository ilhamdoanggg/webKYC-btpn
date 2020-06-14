const customerService = require('../services/customer.service');
const Customer = require('../models').customer;

module.exports = (app) => {
    app.post('/create-customer', (req, res) => {
        const customer = {
            name: req.body.name,
            customerNumber: req.body.customerNumber,
            phoneNumber: req.body.phoneNumber,
            result: req.body.result,
            note: req.body.note
        }
        let result = customerService.create(customer);
        console.log("resultnya : ", result);
        return res.redirect('back')
    });

    app.post('/update-customer', (req, res) => {
        const customer = {
            id: req.body.id,
            name: req.body.name,
            customerNumber: req.body.customerNumber,
            phoneNumber: req.body.phoneNumber,
            result: req.body.result,
            note: req.body.note
        }
        customerService.update(customer);
        return res.redirect('/sales/offering-data-potensi')
    });

    app.get('/sales/offering-data-potensi', (req, res) => {
        Customer.findAll().then(customers => {
            res.render('pages/offering-data-potensi', { user: req.user, customers, pageTitle: 'Offering - Data Potensi' });
        }).catch(function (err) {
            return null;
        })
    });

    app.get('/delete-customer/:id', (req, res) => {
        const id = req.params.id;
        customerService.delete(id);
        return res.redirect('back')
    });

    app.get('/sales/offering-canvas', (req, res) => {
        Customer.findById(req.query.id).then(customer => {
            res.render('pages/offering-canvas', { user: req.user, customer, pageTitle: 'Offering - Canvasing' });
        }).catch(function (err) {
            return null;
        })
    });


    // route confirmations
    app.get('/sales/confirmation', (req, res) => {
        Customer.findAll().then(customers => {
            res.render('pages/confirmation', { user: req.user, customers, pageTitle: 'Confirmation' });
        }).catch(function (err) {
            return null;
        })
    });


}