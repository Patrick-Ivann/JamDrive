import fs from 'fs';
import moment from 'moment';
import util from 'util';
import path from "path";
export const ajouterLog = (req, res) => {

    const erreurs = {}

    moment.locale("fr")
    var date = new Date();
    var log_file = fs.createWriteStream(path.join(__dirname, `../logs/client-${date.getMonth()+1}.log`), {
        flags: 'a'
    });

    
    let texte = {};
    for (var key in req.body) {

        if (JSON.parse(JSON.stringify(req.body)).hasOwnProperty(key)) {

            texte[key] = req.body[key]

            log_file.write(util.format(texte[key]) + " "+
                moment().format('LTS') + " " + // hh:min:ss 
                moment().format('L') + '\n'); // dd/mm/yyyy



        }
    }







    log_file.on('error', function (err) {
        console.log("erreur " + err + " ");
         res.json(err);
    });

log_file.end(function () { res.status(200).send() });




       //var log_stdout = process.stdout
    //log_stdout.write(util.format(d) + '\n');

};


export const lirelog = (req, res) => {

    fs.readFile(path.join(__dirname, `../logs/client-${date.getMonth()+1}.log`), (err, data) => {
        if (err) {
            console.log(err);
        }
        content = data
        console.log(data);
        res.jsonp(data);
    })

}