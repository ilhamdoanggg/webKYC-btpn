const CallRecord = require('../models').call_record;
const customerService = require('./customer.service');
const {createFolder} = require('../utils/fileSystem');

exports.addNew = async (payload) => {
    let result;
    const customer = await customerService.findById(payload.customerId);
    let customerFolderName = customer.name + "_" + customer.customerNumber;

    if (!await this.isExistByCustomerId(payload.customerId)) {
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
    }

    return result;
}

exports.findByCustomerId = async (customerId) => {
    let result;

    await CallRecord.findOne({
        where: {customerId: customerId}
    }).then(callRecord => {
        result = callRecord;
    })

    return result;
}

exports.isExistByCustomerId = async (customerId) => {
    return await CallRecord.count({
        where: {customerId: customerId}
    }).then(count => {
        if (count != 0) {
            return true;
        }
        return false;
    })
}