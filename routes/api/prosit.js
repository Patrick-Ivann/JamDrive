import express from 'express'
import passport from 'passport'
//import passport from '../../config/passport';
import {
    ajouterProsit,
    recupererProsit,
    supprimerProsit,
    recupererParNom,
    recupererParId,
    checkerPrositParId,
    televerserProsit,
    televerserRessource,
    recupererParPromo
} from "../../controlleur/prosit";
import {
    telechargementProsit,
    telechargementRessource
} from '../../controlleur/telechargement';


require('../../config/passport')(passport)
const router = express.Router();


// @route   DELETE /radioprotection/fiche/
// @desc    supprimer fiche  et travailleur
// @access  Public


/**
 * 
 * 
 * @access
 * @description
 */
router.route('/test')
    .get(recupererProsit)

router.route("ajouter", passport.authenticate('jwt', {
        session: false
    }))
    .post(ajouterProsit)

router.route("/recuperer")
    .get(passport.authenticate('jwt', {
        session: false
    }), recupererParPromo)

router.route('/testtelechargement/:nomProsit/:type')
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