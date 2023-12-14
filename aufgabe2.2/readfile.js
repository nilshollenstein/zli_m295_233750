const fs = require("node:fs");

function getFileInformation(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, (err, data) => {
      if (err) {
        reject(err);
      }
      let str = data.toString();
      const fileData = str;
      resolve(fileData);
    });
  });
}
getFileInformation("./testfile.txt")
  .then((fileData) => {
    console.log("Länge des Files: " + fileData.length);
    console.log("Inhalt des Files:\n " + fileData);
  })
  .catch((err) => {
    console.error("Es entstand folgender Fehler: " + err);
  });
