import moment from "moment";
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

export const navigatorCheck = () => {
         if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) !== -1) {
             return 'Opera'
         } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
             return 'Chrome'
         } else if (navigator.userAgent.indexOf("Safari") !== -1) {
             return 'Safari'
         } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
             return 'Firefox'
         } else if ((navigator.userAgent.indexOf("MSIE") !== -1) || (!!document.documentMode === true)) //IF IE > 10
         {
             return 'IE'
         } else {
             return 'unknown'
         }
         
};




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


   Axios.post("https://api.jampops.online/logs/log",texte)


   .then((result) => {
   }).catch((err) => {
       console.log(err);
   });


};





