const callRecordService = require('../services/callRecord.service');

module.exports = (app) => {
    app.post('/calling-customer', (req, res) => {
        const {
            customerId,
            salesId,
        } = req.body

        const payload = {
            customerId: customerId,
            salesId: salesId,
            SMSLink: req.protocol + '://' + req.get('host') + '/debitur?id=' + customerId
        };
        callRecordService.addNew(payload);
    });
}