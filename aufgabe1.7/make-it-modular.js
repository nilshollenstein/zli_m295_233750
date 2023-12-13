const mymodule = require("./mymodule");

const directory = process.argv[2];
const extension = process.argv[3];

mymodule(directory, extension, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  data.forEach((file) => {
    console.log(file);
  });
});
