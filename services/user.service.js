const User = require('../models').user;

exports.create = async (user) => {
    let result;

    await User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        email: user.email,
        role: user.role
    }).then(user => {
        result = { isSuccess: true, message: `Success created customer ${user.firstName}` };
    }).catch(function (err) {
        console.log("Created customer error: ", err);
        result = { isSuccess: false, message: "Error when created customer, please try again" };
    });

    return result;
}
exports.findAll = async () => {
    let result;
    await User.findAll().then(user => {
        result = user;
    }).catch(function (err) {
        console.log("findAll user error: ", err);
        result = null;
    })
    return result;
}

exports.findById = async (id) => {
    let result;
    await User.findById(id).then(user => {
        result = user;
    }).catch(function (err) {
        console.log("Find User error: ", err);
        result = null;
    });

    return result;
}
exports.update = async (user) => {
    let result;

    await User.update({
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        email: user.email,
        role: user.role
    }, {
        where: { id: user.id }
    }).then(() => {
        result = { isSuccess: true, message: `Success updated user ${user.firstName}` };
    }).catch(function (err) {
        console.log("Updated user error: ", err);
        result = { isSuccess: false, message: "Error when update user, please try again" };
    });

    return result;
}


exports.delete = async (id) => {
    let result;

    await User.destroy({
        where: { id: id }
    }).then(() => {
        result = { isSuccess: true, message: `Success deleted customer` };
    }).catch(function (err) {
        console.log("Deleted customer error: ", err);
        result = { isSuccess: false, message: "Error when delete customer, please try again" };
    });

    return result;
};