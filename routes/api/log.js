import { lirelog, ajouterLog } from "../../controlleur/log";
import express from 'express';
const router = express.Router();




router.route("/log")
    .get(lirelog)
    .post(ajouterLog)

    router.get('/ssss', (req, res) => {
     res.json(
         "ffdsfds"
     );
    });

export default router