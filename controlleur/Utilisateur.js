// import jwt from 'jsonwebtoken'
// import passport from 'passport';
// import
// bcrypt
// from 'bcryptjs'
// import {
//     secretOrKey
// } from "../config/keys";
// import fetch from 'node-fetch';

// import moment from 'moment'
// import Utilisateur from '../modeles/Utilisateur';
// import {
//     logToTxt
// } from '../functionSheet'
// import {
//     createWriteStream
// } from 'fs';
// import {
//     format
// } from 'util';
// import {
//     validateLoginInput
// } from '../validation/utilisateur';

export const connexion = (req, res) => {

    const {
        erreurs,
        estValide
    } = validateLoginInput(req.body);

    if (!estValide) {


        return res.status(400).json(erreurs);

    }

    const motDePasse = req.body.motDePasse;



    Utilisateur.find({

    }).then(utilisateurs => {
        if (!utilisateurs) {

            erreurs.Utilisateur = 'pas de Promo';
            return res.status(404).json(erreurs);
        }

        utilisateurs.forEach(utilisateur => {

            if (utilisateur.promo === "2017-2022") {




                bcrypt.compare(motDePasse, utilisateur.superMotDePasse).then((isSuperMatch) => {

                    if (isSuperMatch) {


                        const payload = {
                            id: utilisateur.id,
                            promo: utilisateur.promo,
                            godMode: true
                        }
                        jwt.sign(payload, secretOrKey, {
                            expiresIn: 3600
                        }, (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        });

                    } else {
                        /*erreurs.motDePasse = 'mauvais mot de passe';
                        return res.status(404).json(erreurs);
                        */

                        bcrypt.compare(motDePasse, utilisateur.motDePasse).then(isMatch => {

                                console.log("object");

                                if (isMatch) {

                                    console.log(utilisateur);


                                    const payload = {
                                        id: utilisateur.id,
                                        promo: utilisateur.promo,

                                    }
                                    jwt.sign(payload, secretOrKey, {
                                        expiresIn: 3600
                                    }, (err, token) => {
                                        res.json({
                                            success: true,
                                            token: "Bearer " + token
                                        });
                                    });

                                } else {
                                    erreurs.motDePasse = 'mauvais mot de passe';
                                    return res.status(404).json(erreurs);
                                }
                            })

                            .catch(err => console.log(err));


                    }

                }).catch((err) => {
                    console.log(err);
                });

            }

        });




    });

}



// /**
//  * TODO function de 10 génération de mot de passe et d'insertion dans la BDD pour créer 10 promos 


//  */
// export const generation = async (req, res) => {


//     const utilisateurChamps = {}


//     const listMot = ["computer", "cow", "maison", "table", "screen", "pills", "water", "sword", "music", "score", "paint","field","war"]

//     let motRecherche = listMot[Math.floor(Math.random() * listMot.length)]

//     const pourSuperPassword = {}
//     const motPourPassword = {}

//     fetch(`https://api.datamuse.com/words?rel_jjb=${motRecherche}`)
//         .then(res => res.json())
//         .then(async (json) => {

//             let topMot = await json.sort(function (a, b) {
//                 return b.word.length - a["word"].length;
//             });

//             pourSuperPassword.mdp = await topMot[0].word + "" + topMot[0].score
//             motPourPassword.mdp = await topMot[1].word + "" + topMot[1].score


//             console.log(pourSuperPassword);
//             console.log(motPourPassword);

//             recherche(await pourSuperPassword, await motPourPassword);
//         })

//         .catch(err => console.log(err));


//     let promo = moment().format('YYYY') + "-" + moment().add(5, 'years').format("YYYY");

//     utilisateurChamps.promo = promo




//     const recherche = (pourSuperPassword, motPourPassword) => {
//         Utilisateur.findOne({
//                 promo: promo
//             }).then(async (utilisateur) => {


//                 if (utilisateur) {


//                     //! send un mail car si là on pete msk de nous + logToText

//                     logToTxt("il existe déja une génération promo pour cette année", "generationMotDePasse")
//                     res.json("il existe déja une génération promo pour cette année");
//                 } else {



//                     bcrypt.genSalt(10, (err, salt) => {
//                         bcrypt.hash(pourSuperPassword.mdp, salt, async (err, hash) => {
//                             if (err) throw err;
//                             utilisateurChamps.superMotDePasse = await hash



//                         })

//                     })

//                     bcrypt.genSalt(10, (err, salt) => {
//                         bcrypt.hash(motPourPassword.mdp, salt, async (err, hash) => {
//                             if (err) throw err;
//                             utilisateurChamps.motDePasse = await hash;

//                             let utilisateurNouveau = new Utilisateur(utilisateurChamps)
//                             console.log(utilisateurNouveau);
//                             utilisateurNouveau.save()

//                                 .then(utilisateurNew => {
//                                     let date = new Date()
//                                     var log_file = createWriteStream(__dirname + `/../motDePasse/motDePasse_${date.getFullYear()}.txt`, {
//                                         flags: 'a'
//                                     });

//                                     log_file.write(format(motPourPassword.mdp) + " " + format(pourSuperPassword.mdp) + " " + format(promo)  +  '\n' );

//                                     res.json(utilisateurNew);


//                                 })
//                                 .catch(err => {
//                                     console.log(err);
//                                     erreurs.erreurAjout = err.toString();
//                                     logToTxt(erreurs, "insertion")
//                                 });

//                         })

//                     })
//                 }; //else

//             }) // truc du find one
//             .catch(err => console.log(err));
//     }
// }


// export const ping = (req,res) => {


//      res.status(200).send();
// }





/**
 * 
 * TODO rajouter une méthode pour ajouter sa porpre classe avec mdp et admin 
 * TODO rajouter une méthode pour modifier l'admin et tout
 */


/*
export const ajouterPromo = (req, res) => {

    const {
        erreurs,
        isValid
    } = validateLoginInput(req.body);

    if (!isValid) {


        return res.status(400).json(erreurs);

    }

    const motDePasse = req.body.motDePasse;



    Utilisateur.find({

    }).then(utitilisateur => {
        if (!utitilisateur) {

            erreurs.Utilisateur = 'pas de classe associé à ce Mot de Passe';
            return res.status(404).json(erreurs);
        }

        bcrypt.compare(motDePasse, utitilisateur.motDePasse).then(isMatch => {

                if (isMatch) {


                    const payload = {
                        promo: utitilisateur.promo,

                    }
                    jwt.sign(payload, keys.secretOrKey, {
                        expiresIn: 3600
                    }, (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    });

                } else {
                    erreurs.motDePasse = 'mauvais mot de passe';
                    return res.status(404).json(erreurs);
                }
            })

            .catch(err => console.log(err));





    });

} */




import jwt from 'jsonwebtoken'
import passport from 'passport';
import
bcrypt
from 'bcryptjs'
import {
    secretOrKey
} from "../config/keys";
import fetch from 'node-fetch';

import moment from 'moment'
import Utilisateur from '../modeles/Utilisateur';
import {
    logToTxt
} from '../functionSheet'
import {
    createWriteStream
} from 'fs';
import {
    format
} from 'util';
import {
    validateLoginInput
} from '../validation/utilisateur';
/*
export const connexion = (req, res) => {

    const {
        erreurs,
        estValide
    } = validateLoginInput(req.body);

    if (!estValide) {


        return res.status(400).json(erreurs);

    }

    const motDePasse = req.body.motDePasse;
    let verif = "t"



    Utilisateur.find({

    }).then(utilisateurs => {
        if (!utilisateurs) {

            erreurs.Utilisateur = 'pas de Promo';
            return res.status(404).json(erreurs);
        }

        let indexgod


        for (let index = 0; index < utilisateurs.length; index++) {


            let utilisateur = utilisateurs[index];

            bcrypt.compare(motDePasse, utilisateur.superMotDePasse).then((isSuperMatch) => {

                if (isSuperMatch) {


                    const payload = {
                        id: utilisateur.id,
                        promo: utilisateur.promo,
                        godMode: true
                    }

                    jwt.sign(payload, secretOrKey, {
                        expiresIn: 3600
                    }, (err, token) => {
                        return res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    });

                }

            }).catch(err => console.log(err))



        }



        for (let index = 0; index < utilisateurs.length; index++) {


            let utilisateur = utilisateurs[index];


            let isMatch = bcrypt.compareSync(motDePasse, utilisateur.motDePasse)

            if (isMatch === true) {

                console.log(utilisateur);


                const payload = {
                    id: utilisateur.id,
                    promo: utilisateur.promo,

                }
                jwt.sign(payload, secretOrKey, {
                    expiresIn: 3600
                }, (err, token) => {

                   
                        console.log("fffffffffffffg")

                        return res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    
                });


            } else {

                if (isMatch === false) {





/*                     if (utilisateurs.length - 1 === index && isMatch === false) {
                        console.log("dernier")
                        erreurs.motDePasse = 'mauvais mot de passe';
                         res.status(401).json(erreurs);
                    } 
                }
            }

            console.log(isMatch)
            


            /*
                    for (let index = 0; index < utilisateurs.length; index++) {


                        let utilisateur = utilisateurs[index];







                        bcrypt.compare(motDePasse, utilisateur.superMotDePasse).then((isSuperMatch) => {

                            if (isSuperMatch) {


                                const payload = {
                                    id: utilisateur.id,
                                    promo: utilisateur.promo,
                                    godMode: true
                                }

                                jwt.sign(payload, secretOrKey, {
                                    expiresIn: 3600
                                }, (err, token) => {
                                    return res.json({
                                        success: true,
                                        token: "Bearer " + token
                                    });
                                });

                            } else {
                                
                            

                                bcrypt.compare(motDePasse, utilisateur.motDePasse).then(isMatch => {

                                        if (isMatch) {

                                            console.log(utilisateur);


                                            const payload = {
                                                id: utilisateur.id,
                                                promo: utilisateur.promo,

                                            }
                                            jwt.sign(payload, secretOrKey, {
                                                expiresIn: 3600
                                            }, (err, token) => {

                                                if (err) {
                                                    console.log(err)
                                                } else {

                                                    return res.json({
                                                        success: true,
                                                        token: "Bearer " + token
                                                    });
                                                }
                                            });

                                        } else {
                                            if (index === utilisateurs.length - 1 && isMatch === false) {

                                                erreurs.motDePasse = 'mauvais mot de passe';
                                                return res.status(404).json(erreurs);
                                            }
                                        }
                                    })

                                    .catch(err => console.log(err));


                            }

                        }).catch((err) => {
                            console.log(err);
                        });
            

        };


for (let index = 0; index < utilisateurs.length; index++) {


    let utilisateur = utilisateurs[index];


    bcrypt.compare(motDePasse, utilisateur.motDePasse).then((result) => {
        
        if (!result) {
            
            erreurs.motDePasse = 'mauvais mot de passe';
            res.status(401).json(erreurs);
        }
    }).catch((err) => {

        console.log(err);
    });

        

}

    });

}*/



/**
 * TODO function de 10 génération de mot de passe et d'insertion dans la BDD pour créer 10 promos 
 
 
 */
export const generation = async (req, res) => {


    const utilisateurChamps = {}


    const listMot = ["computer", "cow", "maison", "table", "screen", "pills", "water", "sword", "music", "score", "paint", "field", "war"]

    let motRecherche = listMot[Math.floor(Math.random() * listMot.length)]

    const pourSuperPassword = {}
    const motPourPassword = {}

    fetch(`https://api.datamuse.com/words?rel_jjb=${motRecherche}`)
        .then(res => res.json())
        .then(async (json) => {

            let topMot = await json.sort(function (a, b) {
                return b.word.length - a["word"].length;
            });

            pourSuperPassword.mdp = await topMot[0].word + "" + topMot[0].score
            motPourPassword.mdp = await topMot[1].word + "" + topMot[1].score


            console.log(pourSuperPassword);
            console.log(motPourPassword);

            recherche(await pourSuperPassword, await motPourPassword);
        })

        .catch(err => console.log(err));


    let promo = moment().format('YYYY') + "-" + moment().add(5, 'years').format("YYYY");


    utilisateurChamps.promo = promo




    const recherche = (pourSuperPassword, motPourPassword) => {
        Utilisateur.findOne({
                promo: promo
            }).then(async (utilisateur) => {


                if (utilisateur) {


                    //! send un mail car si là on pete msk de nous + logToText

                    logToTxt("il existe déja une génération promo pour cette année", "generationMotDePasse")
                    res.json("il existe déja une génération promo pour cette année");
                } else {



                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(pourSuperPassword.mdp, salt, async (err, hash) => {
                            if (err) throw err;
                            utilisateurChamps.superMotDePasse = await hash



                        })

                    })

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(motPourPassword.mdp, salt, async (err, hash) => {
                            if (err) throw err;
                            utilisateurChamps.motDePasse = await hash;

                            let utilisateurNouveau = new Utilisateur(utilisateurChamps)
                            console.log(utilisateurNouveau);
                            utilisateurNouveau.save()

                                .then(utilisateurNew => {
                                    let date = new Date()
                                    var log_file = createWriteStream(__dirname + `/../motDePasse/motDePasse_${date.getFullYear()}.txt`, {
                                        flags: 'a'
                                    });

                                    log_file.write(format(motPourPassword.mdp) + " " + format(pourSuperPassword.mdp) + " " + format(promo) + '\n');

                                    res.json(utilisateurNew);


                                })
                                .catch(err => {
                                    console.log(err);
                                    erreurs.erreurAjout = err.toString();
                                    logToTxt(erreurs, "insertion")
                                });

                        })

                    })
                }; //else

            }) // truc du find one
            .catch(err => console.log(err));
    }
}


export const ping = (req, res) => {


    res.status(200).send();
}





/**
 * 
 * TODO rajouter une méthode pour ajouter sa porpre classe avec mdp et admin 
 * TODO rajouter une méthode pour modifier l'admin et tout
 */


/*
export const ajouterPromo = (req, res) => {

    const {
        erreurs,
        isValid
    } = validateLoginInput(req.body);

    if (!isValid) {


        return res.status(400).json(erreurs);

    }

    const motDePasse = req.body.motDePasse;



    Utilisateur.find({

    }).then(utitilisateur => {
        if (!utitilisateur) {

            erreurs.Utilisateur = 'pas de classe associé à ce Mot de Passe';
            return res.status(404).json(erreurs);
        }

        bcrypt.compare(motDePasse, utitilisateur.motDePasse).then(isMatch => {

                if (isMatch) {


                    const payload = {
                        promo: utitilisateur.promo,

                    }
                    jwt.sign(payload, keys.secretOrKey, {
                        expiresIn: 3600
                    }, (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    });

                } else {
                    erreurs.motDePasse = 'mauvais mot de passe';
                    return res.status(404).json(erreurs);
                }
            })

            .catch(err => console.log(err));





    });

} */