const Customer = require('../models').customer;

exports.create = (customer) => {
    Customer.create({
        name: customer.name,
        customerNumber: customer.customerNumber,
        phoneNumber: customer.phoneNumber,
        result: customer.result
    }).then(customer => {
        return {isSuccess: true, message: `Success created customer ${customer.name}`};
    }).catch(function (err) {
        console.log("Created customer error: ", err);
        return {isSuccess: false, message: "Error when created customer, please try again"};
    });
}

exports.findAll = () => {
    Customer.findAll().then(customers => {
        return customers;
    }).catch(function (err) {
        console.log("findAll customer error: ", err);
        return null;
    })
}

exports.findById = (id) => {
    Customer.findById(id).then(customer => {
        return customer;
    }).catch(function (err) {
        console.log("Find customer error: ", err);
        return null;
    })
}

exports.update = async (customer) => {
    Customer.update({
        name: customer.name,
        customerNumber: customer.customerNumber,
        phoneNumber: customer.phoneNumber,
        activityId: customer.activityId,
        result: customer.result,
        note: customer.note
    }, {
        where: {id: customer.id}
    }).then(customer => {
        return {isSuccess: true, message: `Success updated customer ${customer.name}`};
    }).catch(function (err) {
        console.log("Updated customer error: ", err);
        return {isSuccess: false, message: "Error when update customer, please try again"};
    });
}

exports.delete = (id) => {
    Customer.destroy({
        where: { id: id }
    }).then(() => {
        return {isSuccess: true, message: `Success deleted customer`};
    }).catch(function (err) {
        console.log("Deleted customer error: ", err);
        return {isSuccess: true, message: "Error when delete customer, please try again"};
    });
 };