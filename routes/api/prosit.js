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
    telechargementRessource,
    telechargementUe
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

router.route("/ajouter", passport.authenticate('jwt', {
        session: false
    }))
    .post(passport.authenticate('jwt', {
        session: false
    }) ,ajouterProsit)

router.route("/recuperer")
    .get(passport.authenticate('jwt', {
        session: false
    }), recupererParPromo)

router.route('/testtelechargement/:nomProsit/:type')
    .get(telechargementProsit)

router.route('/testtelechargementRessources/:id')
    .get(telechargementRessource)

router.route('/telechargementue/:unite/:promo',passport.authenticate('jwt', {
        session: false
    }))
    .get(telechargementUe)

router.route('/ajouterFichier')
    .post(passport.authenticate('jwt', {
        session: false
    }) ,televerserProsit)

router.route('/ajouterFichier')
    .post(passport.authenticate('jwt', {
        session: false
    }) ,televerserRessource)

router.route('/test/:nom')
    .get(recupererParNom)

router.route('/test/:id')
    .get(passport.authenticate('jwt', {
        session: false
    }) ,recupererParId)
    .put(passport.authenticate('jwt', {
        session: false
    }) ,checkerPrositParId)
    .delete(passport.authenticate('jwt', {
        session: false
    }) ,supprimerProsit)




export default router;