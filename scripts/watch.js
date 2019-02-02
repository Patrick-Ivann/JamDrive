//import { watch } from "fs";
const fs = require("fs")
const task = require("./conversion")


const dir = "../jamDrive/fichiers";

fs.watch(dir,(eventType,filename) =>{
   console.log('File "' + filename + '" was changed: ' + eventType);

    task()
})