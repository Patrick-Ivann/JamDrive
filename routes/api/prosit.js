import express from 'express'
import {
    ajouterProsit,
    recupererProsit,
    supprimerProsit,
    recupererParNom,
    recupererParId,
    checkerPrositParId,
    televerserProsit
} from "../../controlleur/prosit";


const validatePrositInput = require('../../validation/prosit')

const router = express.Router();


// @route   DELETE /radioprotection/fiche/
// @desc    supprimer fiche  et travailleur
// @access  Public


/**
 * !egfsdgdsg
 * TODO esdfgsdg
 * @access
 * @description
 */
router.route('/test')
    .get(recupererProsit)
    .post(ajouterProsit)


router.route('/testfichier')
.post(televerserProsit)

router.route('/test/:nom')
    .get(recupererParNom)

router.route('/test/:id')
    .get(recupererParId)
    .put(checkerPrositParId)
    .delete(supprimerProsit)



export default router;