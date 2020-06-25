const fs = require('fs');
const path = require('path');
const basedir = path.join(__dirname, "../");

exports.createFolder = (folderName) => {
    let dir = basedir + 'storages/' + folderName;
    if (!fs.existsSync(dir)) {
        try {
            fs.mkdirSync(dir);
        } catch (err) {
            if (err.code !== 'EEXIST') throw err
        }
    }
    return dir;
}

exports.moveFileToStorage = (folderName, file) => {
    let newDir = this.createFolder(folderName) + "/" + file.filename;
    fs.rename(file.path, newDir, function (err) {
        if (err) console.log(err);
    })
}