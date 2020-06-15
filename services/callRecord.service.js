const CallRecord = require('../models').call_record;

exports.create = async (callRecord) => {
    let result;

    await CallRecord.create({
        name: callRecord.name,
        customerNumber: callRecord.customerNumber,
        phoneNumber: callRecord.phoneNumber,
        activityId: callRecord.activityId,
        result: callRecord.result,
        note: callRecord.note
    }).then(callRecord => {
        result = { isSuccess: true, message: `Success add new call record` };
    }).catch(function (err) {
        console.log("Created call record error: ", err);
        result = { isSuccess: false, message: "Error when add new call record, please try again" };
    });

    return result;
}

exports.findAll = async () => {
    let result;
    await CallRecord.findAll().then(callRecords => {
        result = callRecords;
    }).catch(function (err) {
        console.log("findAll call records error: ", err);
        result = null;
    })
    return result;
}

exports.findById = async (id) => {
    let result;
    await CallRecord.findById(id).then(callRecord => {
        result = callRecord;
    }).catch(function (err) {
        console.log("Find call records error: ", err);
        result = null;
    });

    return result;
}

exports.update = async (callRecord) => {
    let result;

    await CallRecord.update({
        
    }, {
        where: { id: callRecord.id }
    }).then(() => {
        result = { isSuccess: true, message: `Success updated call record` };
    }).catch(function (err) {
        console.log("Updated call record error: ", err);
        result = { isSuccess: false, message: "Error when update call record, please try again" };
    });

    return result;
}

exports.delete = async (id) => {
    let result;

    await CallRecord.destroy({
        where: { id: id }
    }).then(() => {
        result = { isSuccess: true, message: `Success deleted call record` };
    }).catch(function (err) {
        console.log("Deleted call record error: ", err);
        result = { isSuccess: false, message: "Error when delete call record, please try again" };
    });

    return result;
};