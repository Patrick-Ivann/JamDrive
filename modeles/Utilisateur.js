const mongoose = require('mongoose');



/**
 * définition du schema mongoose permettant de donner un modele à l'intégration des documents dans la bdd mongoDB
 */

const Schema = mongoose.Schema;

const UtilisateurSchema = new Schema({

    motDePasse: {

        type: String,
        required: true,
        unique: true

    },

    promo: {
        type: String,
        required: true,
        unique: true
    },


    superMotDePasse: {
        type: String,
        required: true,
        unique: true
    },



    dateCreation: {
        type: Date,
        required: true,
        default: Date.now

    }



});


const Utilisateur = mongoose.model('utilisateur', UtilisateurSchema)

export default Utilisateur