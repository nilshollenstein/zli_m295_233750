const fs = require("fs");
const path = require("path");


const directory = process.argv[2];
const filterExtension = process.argv[3];

fs.readdir(directory, function(err, files){
	if(err){
		console.error(err);
		return;
	}
	files.forEach((file) => {
		if(path.extname(file)=== `.${filterExtension}`){
			console.log(file);
		}
	});
})
