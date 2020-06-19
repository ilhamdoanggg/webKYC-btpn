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

    app.get('/user-init', async (req, res) => {

        const bCrypt = require('bcrypt-nodejs');
        const ROLE = require('../utils/roles');
        const models = require('../models');
        
        var generateHash = password => {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };

        await models.user.sync();
        await models.user.create({ firstName: "Admin", lastName: "Tester", email: "admin@email.com", password: generateHash("admin"), role: ROLE.Admin });
        await models.user.create({ firstName: "Manager", lastName: "Tester", email: "manager@email.com", password: generateHash("manager"), role: ROLE.Manager });
        await models.user.create({ firstName: "Sales", lastName: "Tester", email: "sales@email.com", password: generateHash("sales"), role: ROLE.Sales });
        res.send(200, "Success Init")
    })
}