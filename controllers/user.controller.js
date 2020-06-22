const userService = require('../services/user.service');
const bCrypt = require('bcrypt-nodejs');

var generateHash = password => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

module.exports = (app) => {
    app.post('/create-user', (req, res) => {

        const pass1 = req.body.password1;
        const pass2 = req.body.password2;

        if (pass1 === '') {
            req.flash('messageErorr', "Password dan Konfirmasi Password Tidak boleh kosong !");
            return res.redirect('back');
        }

        if (pass1 !== pass2) {
            req.flash('messageErorr', "Password dan Konfirmasi Password harus sama !");
            return res.redirect('back');
        }

        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: generateHash(pass1),
            email: req.body.email,
            role: req.body.role
        };

        userService.create(user)
            .then(result => {
                const { message, isSuccess } = result;
                if (isSuccess) req.flash('messageSuccess', message);
                else req.flash('messageErorr', message);
            })
            .catch(err => { console.error(err) })
            .finally(() => { return res.redirect('back'); })
    });

    app.post('/update-user', (req, res) => {
        const pass1 = req.body.password1;
        const pass2 = req.body.password2;

        if (pass1 === '') {
            req.flash('messageErorr', "Password dan Konfirmasi Password Tidak boleh kosong !");
            return res.redirect('back');
        }

        if (pass1 !== pass2) {
            req.flash('messageErorr', "Password dan Konfirmasi Password harus sama !");
            return res.redirect('back');
        }

        const user = {
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: generateHash(pass1),
            email: req.body.email,
            role: req.body.role
        };
        userService.update(user)
            .then(result => {
                const { message, isSuccess } = result;
                if (isSuccess) req.flash('messageSuccess', message);
                else req.flash('messageErorr', message);
            })
            .catch(err => { console.error(err) })
            .finally(() => { return res.redirect('back') })
    });

    app.get('/delete-user/:id', (req, res) => {
        const id = req.params.id;

        userService.delete(id)
            .then(result => {
                const { message, isSuccess } = result;
                if (isSuccess) req.flash('messageSuccess', message);
                else req.flash('messageErorr', message);
            })
            .catch(err => console.error(err))
            .finally(() => { return res.redirect('back') })
    });

    app.get('/user/:id', (req, res) => {
        const id = req.params.id;

        userService.findById(id)
            .then(user => {
                const tempUser = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role
                }
                return res.send(tempUser);
            })
    })

}