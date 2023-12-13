const fs = require("fs");
const path = require("path");

module.exports = function (directory, extension, callback) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      return callback(err);
    }

    let filteredFiles = files.filter(
      (file) => path.extname(file) === `.${extension}`
    );
    return callback(null, filteredFiles);
  });
};
