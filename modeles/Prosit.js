const mongoose = require('mongoose');



/**
 * définition du schema mongoose permettant de donner un modele à l'intégration des documents dans la bdd mongoDB
 */

const Schema = mongoose.Schema;

const PrositSchema = new Schema({

    // urlFichier: { // adresse du fichier sur le serveur

    //     type: String,
    //     required: true
    // },



    nomProsit: {

        type: String,
        required: true,
        unique: true

    },


    unite: { // unité d'enseignement  1-nom 

        type: String,
        required: true

    },

    validation: { // si le prosit est cerifié par idotruc
        type: Number, // 0 non certif (pour les allers) 1 certif classe 2 certif idotruc 
        default: 0,
    },


    retour: {
        type: String,
    }, // si il est aller ou retour

    aller: {
        type: String,
    }, // si il est aller ou retour
    nomScribe: {

        type: String,
        required: true
    },
    annee: {

        type: String,
        required: true
    },


    motDePasse: {

        type: String,
        required: true
    },

    motsClef: {
        type: [String],
    },

    dateUpload: {
        type: Date,
        default: Date.now
    },

    ressources: [{

        nomRessource: {
            type: String
        },
        urlRessource: {
            type: String,
        },
        dateRessource: {
            type: Date,
            default: Date.now
        }

    }]





});

PrositSchema.virtual('nomShort')
    .get(function () {
        return this.nomProsit.split("_")[2];
    });

const prosit = mongoose.model('prosit', PrositSchema)
//module.exports = prosit = mongoose.model('prosit', PrositSchema);

export default prosit