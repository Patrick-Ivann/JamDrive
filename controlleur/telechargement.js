import mongoose from 'mongoose'
import formidable from 'formidable'
import path from 'path'

import {
    createWriteStream,
    readdirSync,
    createReadStream,

} from 'fs';
import archiver from 'archiver';



import Prosit from "../modeles/Prosit";

mongoose.set('debug', true);


export const telechargementRessource = (req, res) => {

    var id = req.params.id

    var fichier = {}
    Prosit.findOne({
        "ressources._id": id
    }).then((result) => {
        //console.log(result.ressources[0])


        result.ressources.forEach(element => {
            console.log(element._id + " " + id);

            if (element._id == id) {

                fichier.urlFichier = element.urlRessource

            }
        });

        // var fichierTelechargment = path.join(__dirname, `../fichiers/ressources/${fichier.urlFichier}`);
        let fichierTelechargment = fichier.urlFichier
        res.download(fichierTelechargment);
    }).catch((err) => {
        console.log(err)
        return res.status(404).json(err);
    });






}

export const telechargementProsit = (req, res) => {


    var nomProsit = req.params.nomProsit
    var type = req.params.type


    var fichier = {}
    Prosit.findOne({
        "nomProsit": nomProsit
    }).then((result) => {
        console.log(result)
        fichier.urlFichier = result[type]
        var fichierTelechargment = fichier.urlFichier;
        res.download(fichierTelechargment)
    }).catch((err) => {

        return res.status(404).json(err);
    });





}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * TODO faire la création d'un fichier temporaire à telecharger
 */
export const telechargementUe = (req, res) => {


    var unite = decodeURIComponent(req.params.unite)
    var promo = decodeURIComponent(req.params.promo)



    var fichier = {}
    Prosit.find({
        "unite": unite,
        "promo": promo
    }).collation({
        locale: "fr",
        strength: 1
    }).then((result) => {

        let dirIn2 = path.join(__dirname, "..", "/fichiers")
        let dirOut = path.join(__dirname, ".." + `/fichiers/zipUnite/unite${unite}_${Date.now()}.zip`)


        fichier.urlFichier = []

        result.forEach(element => {





            if (element.aller || element.retour) {


                if (element.aller) {

                    fichier.urlFichier.push(element.aller)
                }
                if (element.retour) {

                    fichier.urlFichier.push(element.retour)


                }
            } else {
                res.status(400).json("pas de fichier");
            }





            console.log(fichier)

        });

        var fichierTelechargment = fichier.urlFichier;

        // res.download(fichier)


        var archive = archiver('zip')
        let sortie = createWriteStream(dirOut)
        archive.pipe(sortie);

        archive.on('warning', function (err) {
            if (err.code === 'ENOENT') {
                logToTxt("le fichier n'existe pas", "fichiers")
            } else {
                console.log(err)
                logToTxt(err, "fichiers")
                return res.status(404).json(err);
            }
        });

        archive.on('error', function (err) {
            console.log(err)
            logToTxt(err, "fichiers")
            return res.status(404).json(err);
        });

        sortie.on('close', function () {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
            res.download(dirOut)

        });







        var arr = []

        var files = readdirSync(dirIn2);

        files.forEach(file => {

            fichierTelechargment.forEach(element => {

                if (element.split("/")[element.split("/").length - 1] === file) {

                     
                    archive.append(createReadStream(element), {
                        name: file
                    })


                }
            });

        })






        archive.finalize(function (err, bytes) {
            if (err) {

                console.log(err);

            }

            console.log(bytes + ' total bytes');
            return res.json(fichierTelechargment);
        });


    }).catch((err) => {

        return res.status(404).json(err);
    });





}