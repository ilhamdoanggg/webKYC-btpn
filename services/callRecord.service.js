const CallRecord = require('../models').call_record;
const customerService = require('./customer.service');
const {createFolder} = require('../utils/fileSystem');

exports.addNew = async (payload) => {
    let result;
    const dateNow = new Date().toISOString().slice(0, 10);
    const customer = await customerService.findById(payload.customerId);
    let customerFolderName = customer.name + "_" + customer.customerNumber + "_" + dateNow;

    CallRecord.create({
        SMSLink: payload.SMSLink,
        folderName: customerFolderName.toUpperCase(),
        customerId: payload.customerId,
        salesId: payload.salesId
    })
    .then(callRecord => {
        customer.update({activityId: 2, salesId: payload.salesId});
        createFolder(customerFolderName);
        result = { isSuccess: true, message: `Success add new call record` };
    }).catch(function (err) {
        console.log("Created call record error: ", err);
        result = { isSuccess: false, message: "Error when add new call record, please try again" };
    });

    return result;
}