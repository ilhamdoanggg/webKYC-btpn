const fs = require('fs');
const path = require('path');
const basedir = path.join(__dirname, "../");

exports.createFolder = (folderName) => {
    let dir = basedir + 'storages/' + folderName;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, function (err) {
            if (err) console.log("Error when creating folder", err);
        });
    }
    return dir;
}

exports.moveFileToStorage = (folderName, file) => {
    let newDir = this.createFolder(folderName) + "/" + file.filename;
    fs.rename(file.path, newDir, function (err) {
        if (err) console.log(err);
    })
}