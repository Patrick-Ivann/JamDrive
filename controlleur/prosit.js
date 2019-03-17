import formidable from 'formidable';
import mongoose from 'mongoose';
import {
    move
} from '../functionSheet';
import Prosit from "../modeles/Prosit";
import {
    validatePrositInput
} from '../validation/prosit';
mongoose.set('debug', true);
mongoose.set('useFindAndModify', false)




export const recupererProsit = (req, res) => {


    const erreurs = {}
    Prosit.find({})
        .then((prosit) => {

            if (!prosit) {
                erreurs.pasDeProsit = "il n'existe pas de prosit"
                return res.status(404).json(erreurs);
            }


            res.json(prosit);

        }).catch((err) => {

            return res.status(404).json(err);

        });


};


export const recupererParId = (req, res) => {

    const erreurs = {}
    Prosit.findById({
            _id: req.body.id
        })
        .then((prosit) => {

            if (!prosit) {
                erreurs.pasDePrositId = "il n'existe pas de prosit avec cet id"
                return res.status(404).json(erreurs);
            }

            res.json(prosit);

        }).catch((err) => {

            return res.status(404).json(err);

        });


};


export const recupererParPromo = (req, res) => {

    const erreurs = {}
    Prosit.find({
            promo: req.user.promo
        })
        .then((prosit) => {

            if (!prosit) {
                erreurs.pasDePrositPromo = "il n'existe pas de prosit pour cette promo"
                return res.status(404).json(erreurs);
            }

            res.json(prosit);

        }).catch((err) => {

            return res.status(404).json(err);

        });


};

export const recupererParNom = (req, res) => {

    const erreurs = {}
    Prosit.findOne({
            _id: req.body.nom_prosit
        })
        .then((prosit) => {

            if (!prosit) {
                erreurs.pasDePrositNom = "il n'existe pas de prosit avec ce nom"
                return res.status(404).json(erreurs);
            }

            res.json(prosit);

        }).catch((err) => {

            return res.status(404).json(err);

        });


};

export const ajouterProsit = (req, res) => {

    const {
        erreurs,
        estValide
    } = validatePrositInput(req.body);



    if (!estValide) {



        return res.status(400).json(erreurs);

    } else {

        const prositChamps = {};




        for (var key in req.body) {

            if (JSON.parse(JSON.stringify(req.body)).hasOwnProperty(key)) {

                prositChamps[key] = req.body[key]

                if (typeof req.body.motsClef !== 'undefined') prositChamps.motsClef = req.body.motsClef.toString().split(",")



            }
        }

        if (!req.user) {
            return res.status(403).json("pas d'utilisateur")
        } else {

            prositChamps['promo'] = req.user.promo
        }





        Prosit.findOne({
                "nomProsit": req.body.nomProsit

            })
            .then(prosit => {
                if (prosit) {

                    erreurs.PrositExiste = "Le prosit existe dÃ©jÃ "
                    return res.status(404).json(erreurs);

                } else {



                    new Prosit(prositChamps).save()

                        .then(prosit => res.json(prosit))
                        .catch(err => res.json(err));




                }



            })

            .catch(err => {
                console.log(err);
                erreurs.erreurAjout = err.toString();
                res.status(404).json(erreurs);
            });

    }



};



export const supprimerProsit = (req, res) => {

    const erreurs = {}


    mongoose.set('useFindAndModify', false);
    let ObjectId = mongoose.Types.ObjectId
    let id = req.params.id


    Prosit.findByIdAndRemove({
        "_id": id
    }).then((result) => {

        if (!result) {
            erreurs.PasDePrositId = "Pas de prosit avec cet id"
            res.status(404).json(erreurs);
        }
        res.json({
            sucess: true
        });
    }).catch(err => res.status(400).json("fail"));






};



export const checkerPrositParId = (req, res) => {

    const erreurs = {}

    Prosit.findOneAndUpdate({
        "_id": req.params.id

    }, {
        $set: {
            'certification': req.body.certification
        }
    }, {
        new: true
    }).then((result) => {

        if (!result) {
            erreurs.PasDePrositId = "il n'y a pas de prosit avec cet ID"
            return res.status(404).json(erreurs);
        }

        res.json(result);
    }).catch((err) => {
        res.status(404).json(err);
    });

};





export const televerserProsit = (req, res) => {


    var path = require("path")
    const erreurs = {}
    var fileEnd = {}

    var form = new formidable.IncomingForm();
    form.parse(req);

    const renameBdd = (titreProsit, file, callback) => {



        Prosit.findOne({
            "nomProsit": titreProsit

        }).then((result) => {



            if (!result || result.length === 0 || result === {}) {
                erreurs.insertionFichier = "aucun prosit associé, vérifiez nom du fichier" + err

                callback(erreurs, null);


                return res.status(404).json(erreurs);
            } else {

                fileEnd.temp = file.path
                file.name = file.name.split(".")[0] + result['_id'] + "." + file.name.split(".")[1]
                file.path = path.join(__dirname, '../fichiers/') + file.name;

                fileEnd.path = file.path


                callback(null, file)
                //return file

            }



        

        }).catch((err) => {

            console.log(err)

            erreurs.erreurTransfertFichier = "erreur lors du transfert de fichier, impossible de lui associer un prosit, veuillez reÃ©ssayer ultÃ©rieurement.   "
            callback(err, null);

            return res.status(400).json(erreurs);

        });


    }


    form.on('fileBegin', function (name, file) {


            if (name !== "files") {

                const regex = /(_aller|_retour)/
                var nomProsit = name.split(regex)[0].toString()

                var typeProsit = name.split("_")[3]
                fileEnd.prositType = typeProsit

                renameBdd(nomProsit, file, function (err, fileToBDD) {

                    if (err) {
                        console.log(err);
                    }

                    fileEnd.file = fileToBDD

                    if (fileEnd.path !== fileEnd.temp) {
                        move(fileEnd.temp, fileEnd.path, function (err) {

                            if (err) {
                                console.log(err)
                            } else {

                                console.log('Uploaded ' + fileEnd.file.path);
                                rajouterFicherAprosit(fileEnd.file, fileEnd.prositType, res)

                            }
                        })
                    }
                })
            }


        })

        .on('aborted', function () {

            console.log("erreur");

        })
        .on('error', function (err) {

            console.log(err);

            erreurs.erreurTransfertFichier = "erreur lors du transfert de fichier, veuillez reÃ©ssayer ultÃ©rieurement.   "
            return res.status(404).json(erreurs);

        })








}

export const rajouterFicherAprosit = (file, typeProsit, res) => {

    console.log("rajouter prosit");
    const erreurs = {}

    const titreProsit = file.name.split("_")[0] + "_" + file.name.split("_")[1] + "_" + file.name.split("_")[2]
    const typeFichier = typeProsit
    const addressFichier = file.path


    console.log(file.path)


    /*
    Prosit.findOne({"nomProsit" : titreProsit },function(err, objet){
        if (err) {
          return  res.status(500).send(err);
        }
        else{
            if (!objet) {
                return res.status(404).send("pas de prosit");
            } else {
                 objet[typeFichier] = addressFichier;
                    

                 objet.save(function(err,majObjet){
                     if (err) {
                         console.log("dsfsdfsf" + err)
                        return res.status(500).send(err);
                     } else {
                        return res.send(majObjet);

                     }
                 })
                
            }
        }
    })*/





    Prosit.findOneAndUpdate({
        "nomProsit": titreProsit
    }, {
        $set: {
            [typeFichier]: addressFichier
        }
    }, {
        new: true
    }).then((prosit) => {
        //return  res.json(prosit)
        if (!prosit) {
            erreurs.insertionFichier = "le fichier du prosit n'est pas intÃ©grÃ©"
            return res.status(400).json(erreurs)
        } else {

            return res.status(200).json(prosit);
        }




    }).catch((err) => {
        console.log(err)
        erreurs.insertionFichier = "impossible de mettre Ã  jour la BDD" + err
        return res.status(400).json(erreurs);
    });

}


export const televerserRessource = (req, res) => {

    var path = require("path")

    const erreurs = {}






    var form = new formidable.IncomingForm();
    form.parse(req);

    form.on('fileBegin', function (name, file) {
        console.log(file)
        console.log(path.join(__dirname, '../'))


        if ((/^(\d{1,2})(_)(ressources)(_)(\w+)(\d{1,2})(\-)(\w+)/.test(file.name)) === false) {
            erreurs.formatUnite = "Le titre du document ne respecte pas les convention xx_ressources_titre_x-ue."
            return res.status(400).json(erreurs);
        }

        let unite = file.name.split("_")[file.name.split('_').length - 1]
        unite = unite.split(".")[0]
        let nomRessource = file.name.split("_")[2]
        file.path = path.join(__dirname, '../fichiers/ressources/') + file.name;



        Prosit.findOne({
            "unite": unite

        }).then((result) => {

            if (!result) {

                console.log("on a pas trouvÃ©")

            }


            result.ressources.forEach(ressource => {
                console.log(nomRessource + ressource.nomRessource + ressource + "ggsdg")
                if (ressource.nomRessource === nomRessource) {
                    erreurs.ressourceExiste = "cette ressource existe dÃ©jÃ "
                    return res.status(404).json(erreurs);
                }
            })

            const nouvelleRessource = {
                nomRessource: nomRessource,
                urlRessource: file.path,
            }
            result.ressources.unshift(nouvelleRessource)

            result.save()
                .then(result => console.log(result)) //res.json(result))
                .catch(err => console.log(err)) //res.status(404).json(err));

        }).catch((err) => {
            console.log(err)
            //return res.status(404).json(err);
        });
    });

    if (erreurs === {}) {

        form.on('file', function (name, file) {
            console.log('Uploaded ' + file.name);
            return res.json(file.name);

        });
    }



};



export const supprimerRessource = (req, res) => {

    /*

    Prosit.findOne(req.params.id)
        .then(prosit => {

            if (prosit.ressources.filter(comment => comment._id.toString() === req.params.comment_id).lenght === 0) {

                res.status(404).json({
                    ressourceExist: "La ressource n'existre pas."
                })
            }

            const removeIndex = prosit.ressources
                .map(item => item.user.toString)
                .indexOf(req.user.id);

            prosit.like.splice(removeIndex, 1);

            prosit.save()
                .then(prosit => res.json(prosit))
                .catch(err => res.status(404).json(err));


        })

        .catch(err => res.status(404).json(err));*/


    const erreurs = {}


    let id = req.params.id.split("_")[0]
    let typeFichier = req.params.id.split("_")[1]


    Prosit.findOneAndUpdate({
        "_id": id

    }, {
        $unset: {
            [typeFichier]: ""
        }
    }, {
        new: true
    }).then((result) => {

        if (!result) {
            erreurs.PasDePrositId = "il n'y a pas de prosit avec cet ID"
            return res.status(404).json(erreurs);
        }

        res.json(result);
    }).catch((err) => {
        res.status(404).json(err);
    });


}