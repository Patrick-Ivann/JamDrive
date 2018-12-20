import express from 'express'
import {
    ajouterProsit,
    recupererProsit,
    supprimerProsit,
    recupererParNom,
    recupererParId,
    checkerPrositParId,
    televerserProsit,
    televerserRessource
} from "../../controlleur/prosit";
import {
    telechargementProsit,
    telechargementRessource
} from '../../controlleur/telechargement';



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


router.route('/testtelechargement/:id')
    .get(telechargementProsit)

router.route('/testtelechargementRessources/:id')
    .get(telechargementRessource)

router.route('/testfichier')
    .post(televerserProsit)

router.route('/testressource')
    .post(televerserRessource)

router.route('/test/:nom')
    .get(recupererParNom)

router.route('/test/:id')
    .get(recupererParId)
    .put(checkerPrositParId)
    .delete(supprimerProsit)



export default router;