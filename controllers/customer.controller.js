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
        const customer = {
            id: req.body.id,
            name: req.body.name,
            customerNumber: req.body.customerNumber,
            phoneNumber: req.body.phoneNumber,
            result: req.body.result,
            note: req.body.note
        }
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

    app.put('/update-customer/:id', (req, res) => {
        const id = req.params.id;
        const result = req.query.result;
        const data = {
            id,
            result,
        }

        customerService.update(data)
            .then(result => {
                const { message, isSuccess } = result;
                if (isSuccess) req.flash('messageSuccess', message);
                else req.flash('messageErorr', message);
            })
            .catch(err => console.error(err))
            .finally(() => { return res.redirect('/home') })
    })
}