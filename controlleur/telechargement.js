import mongoose from 'mongoose'
import formidable from 'formidable'
import path from 'path'

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


    var id = req.params.id

    var fichier = {}
    Prosit.findById({
        "_id": id
    }).then((result) => {
        console.log(result)
        fichier.urlFichier = result.urlFichier
        var fichierTelechargment = path.join(__dirname, `../fichiers/${fichier.urlFichier}`);
        res.download(fichierTelechargment)
    }).catch((err) => {

        return res.status(404).json(err);
    });





}