import moment from "moment";
import fs from 'fs';
import util from 'util';
import Axios from "axios";

export const sleep = milliseconds => {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

export const concatValeurObjet = obj => {

     
        var concatString = '';
        for (var p in obj) {
            concatString += p + ': ' + obj[p] + '\n';
        }
        return(concatString);
    
}


export const concatValeurObjetAlt = obj => {


 

    var concatString =""
    Object.keys(obj).forEach(element => {

     concatString += obj[element] + '\n'

    });

        return (concatString);

}

export const concatValeurObjetToHTML = obj => {

    var concatString =""
    Object.keys(obj).forEach(element => {

        concatString += obj[element] + '\n'

    });

    return (concatString);

}



moment.locale("fr")


export const logToTxt = (texte) => {
/*
    var date = new Date();
    var log_file = fs.createWriteStream(__dirname + `../../logs/${nomFichier}-${date.getDate()}-${date.getMonth()+1}.log`, {
        flags: 'a'
    });

    log_file.write(util.format(texte) +
        moment().format('LTS') + " " + // hh:min:ss
        moment().format('L') + '\n'); // dd/mm/yyyy

    //var log_stdout = process.stdout
    //log_stdout.write(util.format(d) + '\n');
*/


   Axios.post("/logs/log", concatValeurObjet(texte))

   .then((result) => {
       console.log(result);
   }).catch((err) => {
       console.log(err);
   });


};




