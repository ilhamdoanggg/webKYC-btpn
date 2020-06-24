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

        customerService.create(customer)
            .then(result => {
                const { message, isSuccess } = result;
                if (isSuccess) req.flash('messageSuccess', message);
                else req.flash('messageErorr', message);
            })
            .catch(err => { console.error(err) })
            .finally(() => { return res.redirect('back'); })
    });

    app.post('/update-customer', (req, res) => {
        const {id, name, customerNumber, phoneNumber, activityId, result, note} = req.body;
        const customer = {id, name, customerNumber, phoneNumber, activityId, result, note};
        customerService.update(customer)
            .then(result => {
                const { message, isSuccess } = result;
                if (isSuccess) req.flash('messageSuccess', message);
                else req.flash('messageErorr', message);
            })
            .catch(err => { console.error(err) })
            .finally(() => { return res.redirect('/sales/offering-data-potensi') })
    });

    app.get('/delete-customer/:id', (req, res) => {
        const id = req.params.id;

        customerService.delete(id)
            .then(result => {
                const { message, isSuccess } = result;
                if (isSuccess) req.flash('messageSuccess', message);
                else req.flash('messageErorr', message);
            })
            .catch(err => console.error(err))
            .finally(() => { return res.redirect('back') })
    });
}