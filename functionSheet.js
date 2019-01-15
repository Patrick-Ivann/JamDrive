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