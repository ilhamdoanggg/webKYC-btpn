const fs = require('fs');

exports.createFolder = (folderName) => {
    let dir = './storages/' + folderName;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}