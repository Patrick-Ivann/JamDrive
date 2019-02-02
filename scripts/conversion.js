const task = require('./taskRunner');
const fs = require('fs');
const dir =  "../jamDrive/fichiers";

/*fs.readdir(dir, (err, files) => {
    console.log(files.length);
    console.log(files);
    files.forEach(element => {
        if (element.split(".")[1] === "docx") {
            console.log("object")
        }
    });
});*/

module.exports = task('conversion', () => {
//  fs.readdir(dir, (err, files) => {
//      console.log(files.length);
//      console.log(files);
//      files.forEach(element => {
//          if (element.split(".")[1] === "docx") {
//              console.log("object")
//          }
//      });
//  });

console.log("object");
});