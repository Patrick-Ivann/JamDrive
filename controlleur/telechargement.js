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
 */
export const telechargementUe = (req, res) => {
    var erreurs = {}

    var unite = decodeURIComponent(req.params.unite)
    var promo = decodeURIComponent(req.params.promo)



    if (!promo || !req.params.promo || promo == null || promo === "undefined") {
        erreurs.pasDePromo = "Il faut se connecter pour réaliser cette opération"
        return res.status(401).json(erreurs);
    }


    var date1 = new Date(Date.now());

    var finish


    var fichier = {}
    Prosit.find({
        "unite": unite,
        "promo": promo
    }).collation({
        locale: "fr",
        strength: 1
    }).then((result) => {

        if (!result) {

            return res.status(400).json("pas de fichier");

        }

        let dirIn2 = path.join(__dirname, "..", "/fichiers")
        let dirIn3 = path.join(__dirname, "..", "/fichiers/ressources")

        let dirOut = path.join(__dirname, ".." + `/fichiers/zipUnite/unite${unite}_${promo}_${date1.getUTCDate()}.zip`)


        fichier.urlFichier = []
        fichier.urlFichierRessource = []


        result.forEach(element => {





            if (element.aller || element.retour) {


                if (element.aller) {

                    fichier.urlFichier.push(element.aller)
                }
                if (element.retour) {

                    fichier.urlFichier.push(element.retour)


                }
            }

            if (element.ressources.length > 0) {

                element["ressources"].forEach(ressource => {
                    fichier.urlFichierRessource.push(ressource.urlRessource)

                });
            }


            finish = "true"






        });


        if (fichier.urlFichier.length === 0 && finish === "true") {
            return res.status(400).json("pas de prosit aller ou retour");
        }

        var fichierTelechargment = fichier.urlFichier;

        var fichierRessourceTelechargment = fichier.urlFichierRessource;

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
                console.log("erreur warning")
                return res.status(404).json(err);
            }
        });

        archive.on('error', function (err) {
            console.log(err)
            logToTxt(err, "fichiers")
            console.log("error")
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

        var filesRessources = readdirSync(dirIn3);

        filesRessources.forEach(file => {



            fichierRessourceTelechargment.forEach(element => {



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
            //return res.download(dirOut)

            //return res.json(fichierTelechargment);
        });


    }).catch((err) => {

        console.log(err)

        return res.status(404).json(err);
    });





}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const telechargementProsits = (req, res) => {


    var prosit = decodeURIComponent(req.params.id)




    var date1 = new Date(Date.now());

    var finish


    var fichier = {}
    Prosit.findById({
        _id: prosit,
    }).collation({
        locale: "fr",
        strength: 1
    }).then((result) => {

        if (!result) {

            return res.status(400).json("pas de fichier");

        }

        let dirIn2 = path.join(__dirname, "..", "/fichiers")
        let dirIn3 = path.join(__dirname, "..", "/fichiers/ressources")

        let dirOut = path.join(__dirname, ".." + `/fichiers/zipUnite/${result.nomProsit}_${result.promo}_${date1.getUTCDate()}.zip`)


        fichier.urlFichier = []


        fichier.urlFichierRessource = []






        if (result.aller || result.retour) {


            if (result.aller) {

                fichier.urlFichier.push(result.aller)
            }
            if (result.retour) {

                fichier.urlFichier.push(result.retour)


            }
        }

        if (result.ressources.length > 0) {

            result["ressources"].forEach(ressource => {
                fichier.urlFichierRessource.push(ressource.urlRessource)

            });
        }


        finish = "true"





        console.log(fichier)



        if (fichier.urlFichier.length === 0 && finish === "true") {
            return res.status(400).json("pas de prosit aller ou retour");
        }

        var fichierTelechargment = fichier.urlFichier;
        var fichierRessourceTelechargment = fichier.urlFichierRessource;

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
                console.log("erreur warning")
                return res.status(404).json(err);
            }
        });

        archive.on('error', function (err) {
            console.log(err)
            logToTxt(err, "fichiers")
            console.log("error")
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

        var filesRessources = readdirSync(dirIn3);

        filesRessources.forEach(file => {



            fichierRessourceTelechargment.forEach(element => {



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
            //return res.download(dirOut)

            //return res.json(fichierTelechargment);
        });


    }).catch((err) => {

        console.log(err)

        return res.status(404).json(err);
    });





}