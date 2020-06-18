const callRecordService = require('../services/callRecord.service');
const multer = require('multer');
const { moveFileToStorage } = require('../utils/fileSystem');
const tempDir = './storages/temp';
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, tempDir);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })

const upload = multer({storage: storage});

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

    app.post('/upload-file/:customerId', upload.single('file'), (req, res) => {
        const customerId = req.params.customerId;
        callRecordService.findByCustomerId(customerId).then(callRecord => {
            let dirTarget = callRecord.folderName;        
            moveFileToStorage(dirTarget, req.file);
            res.status(200).send("Success upload file");
        })
    })
}