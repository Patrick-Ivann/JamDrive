const Validator = require("validator");
const isEmpty = require("./is_empty");

export function validateLoginInput(data) {
    let erreurs = {};




    if (Validator.isEmpty(data.motDePasse) || !data.motDePasse) {
        erreurs.motDePasse = "Le mot de passe  doit être renseigné.";
    }
    



    /**
     * @description 
     *! vérificateur de type d'input
     */

    if (data.motDePasse == !typeof String) {
        erreurs.typeMotDePasse = "Le nom du prosit doit être une chaîne de caractère."
    }

    


    /***
     * TODO RAJOUTER REGEX POUR VERIFIER FORMAT 
     */

    return {
        erreurs,
        estValide: isEmpty(erreurs)
    }

}