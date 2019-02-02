import express from 'express'
import {
    generation, connexion
} from '../../controlleur/Utilisateur';

const router = express.Router();


router.route("/generation")
    .get(generation)

    router.route("/connexion").post(connexion)

    


export default router