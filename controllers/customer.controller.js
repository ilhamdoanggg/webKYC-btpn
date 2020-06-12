const customerService = require('../services/customer.service');

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
}