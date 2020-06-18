const fs = require('fs');

exports.createFolder = (folderName) => {
    let dir = './storages/' + folderName;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    return dir;
}

exports.moveFileToStorage = (folderName, file) => {
    let newDir = this.createFolder(folderName) + "/" + file.filename;
    fs.rename(file.path, newDir, function (err) {
        if (err) console.log(err);
    })
}