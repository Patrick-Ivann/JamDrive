import mongoose from 'mongoose';
import formidable from 'formidable'
import Prosit from "../modeles/Prosit";
mongoose.set('debug', true);

import {
    validatePrositInput
} from '../validation/prosit';



export const recupererProsit = (req, res) => {


    const erreurs = {}
    Prosit.find({})
        .then((prosit) => {

            if (!prosit) {
                erreurs.pasDeProsit = "il n'existe pas de prosit"
                return res.status(404).json(erreurs);
            }

            console.log(prosit)

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
                //console.log(key)

                console.log(req.body[key])

                prositChamps[key] = req.body[key]

            }
        }

        let url_fichierCreation = "jbfvkjs"

        prositChamps.urlFichier = url_fichierCreation



        Prosit.findOne({
                "urlFichier": url_fichierCreation

            })
            .then(prosit => {
                if (prosit) {

                    erreurs.PrositExiste = "Le prosit existe déjà"
                    return res.status(404).json(erreurs);

                } else {



                    new Prosit(prositChamps).save()

                        .then(prosit => res.json(prosit))
                        .catch(err => res.json(err));




                }



            })

            .catch(err => console.log(err));

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


    console.log('req :', req.body);




    var form = new formidable.IncomingForm();
    form.parse(req);

    form.on('fileBegin', function (name, file) {
        console.log(file)
        console.log(path.join(__dirname, '../'))
        file.path = path.join(__dirname, '../fichiers/') + file.name;
        console.log(file.path)
    });

    form.on('file', function (name, file) {
        console.log('Uploaded ' + file.name);
        return res.json(file.name);

    });


};