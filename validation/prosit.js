const Validator = require("validator");
const isEmpty = require("./is_empty");

export function validatePrositInput(data) {
    let erreurs = {};


    

    if (Validator.isEmpty(data.nomProsit) || !data.nomProsit) {
        erreurs.nomProsit = "Le nom du prosit doit être renseigné.";
    }
    if (Validator.isEmpty(data.unite)|| !data.unite) {
        erreurs.unite = "Le nom de l'unité d'enseignement doit être renseigné.";
    }
    // if (Validator.isEmpty(data.type)) {
    //     erreurs.type = "Il faut obligatoirement un nom de prosit";
    // }
   /*  if (!data.nomScribe) {
        erreurs.nomScribe = "Le nom du scribe doit être renseigné.";
    } */



    /**
     * @description 
     *! vérificateur de type d'input
     */

    if (data.nomProsit ==! typeof String) {
        erreurs.typeNomProsit = "Le nom du prosit doit être une chaîne de caractère."
    }

    if (data.unite ==! typeof String) {
        erreurs.typeNomProsit = "Le nom de l'unité d'enseignement doit être une chaîne de caractère."
    }

    // if (data.type ==!typeof Number) {
    //     erreurs.typeNomProsit = "le type du prosit (aller ou retour) doit etre une nombre"
    // }

   /*  if (data.nomScribe ==! typeof String) {
        erreurs.typeNomProsit = "Le nom du scribe doit être une chaîne de caractère."
    } */


    /**
     * !vérificateur de format des input
     * 
     */

    // if (RegExp(/^(\d{1,2})(\_)(prosit)(\_)(\w+)(\_)(aller|retour)/gm).test(data.nomProsit) === false) { // 22_prosit_gggyujujf_aller

    //     erreurs.foramtNomProsit = "le titre du fichier est mauvais et ne respecte pas la convention de nommage (XX_prosit_titreprosit_aller."
    // }

     if (RegExp(/^(\d{1,2})(\_)(prosit)(\_)(\w+)/gmi).test(data.nomProsit) === false) { // 22_prosit_gggyujujf_aller

         erreurs.foramtNomProsit = "le nom du fichier ne respecte pas la convention de nommage (XX_PROSIT_TITREDUPROSIT)."
     }


    // julien: message retiré car redondant avec celui plus haut
    /*if ((/^(\d{1,2})(\-)(\w+)/.test(data.unite)) === false) {
        erreurs.formatUnite = "Le format des unités d'enseignement est mauvais."
    }*/

    // if (RegExp(/^(2|1)/).test(data.type) === false) {
    //     erreurs.formatTypeProsit = "Le format du type est mauvais."
    // }

    // julien: message retiré car redondant avec celui plus haut
    /*if (RegExp(/^(\w+)/).test(data.nomScribe) === false) {
        erreurs.formatNomScribe = "Le format du nom du scribe est mauvais."
    }*/


    return {
        erreurs,
        estValide: isEmpty(erreurs)
    }

}