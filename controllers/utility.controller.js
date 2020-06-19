const callRecordService = require('../services/callRecord.service');
const customerService = require('../services/customer.service');
const multer = require('multer');
const { moveFileToStorage, saveFileToTemp } = require('../utils/fileSystem');
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

    app.post('/upload-file/', upload.single('file'), (req, res) => {
        res.status(200).send(req.file);
    });

    app.get('/download-file/:filename', (req, res) => {
        let dir = __basedir + '/storages/temp/';
        let filename = req.params.filename;
        res.download(dir + filename);
    });

    app.get('/download-file/:filename/:customerId', async (req, res) => {
        let filename = req.params.filename;
        const customer = await customerService.findById(req.params.customerId);
        let customerFolderName = __basedir + '/storages/' + customer.name + "_" + customer.customerNumber + "/";
        return res.download(customerFolderName + filename);
    });
}