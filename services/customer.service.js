const { Op } = require('sequelize');

const Customer = require('../models').customer;

exports.create = async (customer) => {
    let result;

    await Customer.create({
        name: customer.name,
        customerNumber: customer.customerNumber,
        phoneNumber: customer.phoneNumber,
        activityId: customer.activityId,
        result: customer.result,
        note: customer.note
    }).then(customer => {
        result = { isSuccess: true, message: `Success created customer ${customer.name}` };
    }).catch(function (err) {
        console.log("Created customer error: ", err);
        result = { isSuccess: false, message: "Error when created customer, please try again" };
    });

    return result;
}

exports.findAll = async () => {
    let result;
    await Customer.findAll().then(customers => {
        result = customers;
    }).catch(function (err) {
        console.log("findAll customer error: ", err);
        result = null;
    })
    return result;
}

exports.findAllForSales = async () => {
    return await Customer.findAll({
        where: {
            [Op.or] : [
                {activityId: {
                    [Op.lt] : 3
                }}, 
                {result: 4}
            ]
        }
    }).then(customers => {
        return customers;
    })
}

exports.findAllForManager = async () => {
    return await Customer.findAll({
        where: {
            [Op.or] : [
                {result: {
                    [Op.gte]: 6
                }}
            ]
        }
    }).then(customers => {
        return customers;
    });
}

exports.findById = async (id) => {
    let result;
    await Customer.findById(id).then(customer => {
        result = customer;
    }).catch(function (err) {
        console.log("Find customer error: ", err);
        result = null;
    });

    return result;
}

exports.update = async (customer) => {
    let result;

    await Customer.update({
        name: customer.name,
        customerNumber: customer.customerNumber,
        phoneNumber: customer.phoneNumber,
        activityId: customer.activityId,
        result: customer.result,
        note: customer.note
    }, {
        where: { id: customer.id }
    }).then(() => {
        result = { isSuccess: true, message: `Success updated customer ${customer.name}` };
    }).catch(function (err) {
        console.log("Updated customer error: ", err);
        result = { isSuccess: false, message: "Error when update customer, please try again" };
    });

    return result;
}

exports.delete = async (id) => {
    let result;

    await Customer.destroy({
        where: { id: id }
    }).then(() => {
        result = { isSuccess: true, message: `Success deleted customer` };
    }).catch(function (err) {
        console.log("Deleted customer error: ", err);
        result = { isSuccess: false, message: "Error when delete customer, please try again" };
    });

    return result;
};