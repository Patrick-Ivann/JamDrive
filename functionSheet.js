import moment from 'moment';
import fs from 'fs';
import util from 'util';

moment.locale("fr")


export const logToTxt = (texte, nomFichier) => {

    var date = new Date();
    var log_file = fs.createWriteStream(__dirname + `/logs/${nomFichier}-${date.getDate()}-${date.getMonth()+1}.log`, {
        flags: 'a'
    });

    log_file.write(util.format(texte) +
        moment().format('LTS') + " " + // hh:min:ss 
        moment().format('L') + '\n'); // dd/mm/yyyy
                      
    //var log_stdout = process.stdout
    //log_stdout.write(util.format(d) + '\n');

};


export const move = (oldPath, newPath, callback) => {

    fs.rename(oldPath, newPath, function (err) {
        if (err) {
            if (err.code === 'EXDEV') {
                copy();
            } else {
                callback(err);
            }
            return;
        }
        callback();
    });

    function copy() {
        var readStream = fs.createReadStream(oldPath);
        var writeStream = fs.createWriteStream(newPath);

        readStream.on('error', callback);
        writeStream.on('error', callback);

        readStream.on('close', function () {
            fs.unlink(oldPath, callback);
        });

        readStream.pipe(writeStream);
    }
}