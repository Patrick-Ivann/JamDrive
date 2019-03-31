import axios from 'axios';


import {
    GET_ERRORS,
    RECUPERER_PROSIT,
    AJOUTER_PROSIT,
    PROSIT_SUPPRESSION,
    PROSIT_CHARGEMENT,
    RECUPERER_PROSITS,
    TELEVERSEMENT_PROSIT,
    METTRE_A_JOUR_RECHERCHE,
    RECUPERER_PROSIT_NULL,

} from "./types";

import db from '../indexDB2';

export const setErreur = (message) => dispatch => {


    dispatch({
        type: GET_ERRORS,
        payload: message
    })

}




export const ajouterProsit = (prositData) => dispatch => {



    axios.post('https://api.jampops.online/api/prosit/ajouter', prositData)

        .then((result) => {


            dispatch({
                type: AJOUTER_PROSIT,
                payload: result.data,
            })



        }).catch((err) => {

            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}



export const supprimerProsit = id => dispatch => {
    if (window.confirm('Vous allez supprimer le prosit ')) {
        axios.delete(`https://api.jampops.online/api/prosit/supprimer/${id}`, )
            .then(() => {
                dispatch({
                    type: PROSIT_SUPPRESSION,
                    payload: id,
                })

                db.table('prositsOffline').clear();


            }).catch((err) => {

                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            });
    }
}

export const supprimerAllerRetourRessource = id => dispatch => {
    if (window.confirm('Vous allez supprimer la ressource')) {
        axios.delete(`https://api.jampops.online/api/prosit/supprimerallerretour/${id}`, )
            .then(() => {


            }).catch((err) => {

                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            });
    }
}



export const recupererProsits = () => dispatch => {
    dispatch(mettrePrositaCharger())
    axios.get('https://api.jampops.online/api/prosit/test')
        .then((result) => {

            localStorage.setItem("prosits", JSON.stringify(result.data))

            localStorage.setItem("chevree", 1)


            let res = result.data


            db.table('prositsOffline')
                .add(res)
                .then((id) => {
                });


            dispatch({
                type: RECUPERER_PROSITS,
                payload: result.data,
            })


        }).catch((err) => {

            dispatch({
                type: RECUPERER_PROSIT_NULL,
                payload: null
            })

            dispatch({
                type: GET_ERRORS,
                payload: "Impossible de récuperer les prosit depuis le serveur."
            })
        });
}


export const recupererFicheID = (id) => dispatch => {
    dispatch(mettrePrositaCharger())
    axios.get(`https://api.jampops.online/api/prosit/test/${id}`)
        .then((result) => {
            dispatch({
                type: RECUPERER_PROSIT,
                payload: result.data,
            })

        }).catch((err) => {

            dispatch({
                type: RECUPERER_PROSIT,
                payload: null
            })
        });
}

export const recupererPrositsParPromo = () => dispatch => {

    dispatch(mettrePrositaCharger())


    axios.get('https://api.jampops.online/api/prosit/recuperer')

        .then((result) => {


            if (Array.isArray(result.data) && result.data !== []) {

                let res = result.data




                db.table('prositsOffline').clear();
                db.table('prositsOffline').add(res).then((id) => {
                }).catch();

                dispatch({
                    type: RECUPERER_PROSITS,
                    payload: result.data
                })

            } else {

                if (result.data === {} || result.data === []) {


                    let res = result.data



                    db.table('prositsOffline').clear();
                    db.table('prositsOffline').add(res).then((id) => {
                    }).catch();

                    dispatch({
                        type: RECUPERER_PROSIT_NULL,
                        payload: result.data

                    })

                } else {

                    let res = [result.data]



                    db.table('prositsOffline').clear();
                    db.table('prositsOffline').add(res).then((id) => {
                    }).catch();

                    dispatch({
                        type: RECUPERER_PROSITS,
                        payload: [result.data]
                    })





                }
            }



        });
    axios.get('https://api.jampops.online/api/prosit/recuperer').catch((errAxios) => {

        // dispatch({
        //     type:RECUPERER_PROSIT_NULL,
        //     payload: null
        // })


        dispatch({
            type: GET_ERRORS,
            payload: errAxios.response.data
        })
    });
}


export const mettreAjourRecherche = (recherche) => dispatch => {
    dispatch({
        type: METTRE_A_JOUR_RECHERCHE,
        payload: recherche
    })
}


export const checkerProsit = (id) => dispatch => {
    dispatch(mettrePrositaCharger())
    axios.put(`https://api.jampops.online/api/prosit/test/${id}`)
        .then((result) => {
            dispatch({
                type: RECUPERER_PROSIT,
                payload: result.data,
            })

        }).catch((err) => {

            dispatch({
                type: RECUPERER_PROSIT,
                payload: null
            })

            dispatch({
                type: GET_ERRORS,
                payload: "Impossible de mettre à jour le prosit sur le serveur"
            })
        });
}


/**
 * @param {*} prosit 
 */
export const televerserProsit = (prosit) => dispatch => {
    //dispatch(mettrePrositaCharger())

    const config = {

        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    const formData = new FormData(); //peremt d'envoyer des fichiers au backend sans pt le parser de json 
    formData.append(prosit.name.split(".")[0], prosit)
    //formData.append(prosit.name, prosit.name.split(".")[0])

    axios.post(`https://api.jampops.online/api/prosit/ajouterfichier`, formData, config)
        .then((result) => {
            dispatch({
                type: PROSIT_SUPPRESSION,
                payload: result.data._id
            })

            dispatch({
                type: TELEVERSEMENT_PROSIT,
                payload: result.data,
            })




        }).catch((err) => {


            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}








export const mettrePrositaCharger = () => {


    return {
        type: PROSIT_CHARGEMENT
    }
}