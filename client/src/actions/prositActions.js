import axios from 'axios';

import {
    GET_ERRORS,
    RECUPERER_PROSIT,
    AJOUTER_PROSIT,
    PROSIT_SUPPRESSION,
    PROSIT_CHARGEMENT,
    RECUPERER_PROSITS,
    TELEVERSEMENT_PROSIT,
    
} from "./types";

export const ajouterProsit = (prositData) => dispatch => {
    axios.post('api/prosit/test', prositData)

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
    if (window.confirm('Vous allez supprimer le travailleur et la fiche ')) {
    axios.delete(`/api/prosit/test/${id}`, )
        .then(() => {
            dispatch({
                type: PROSIT_SUPPRESSION,
                payload: id,
            })

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
    axios.get('/api/prosit/test')
        .then((result) => {
            console.log(result)
            dispatch({
                type: RECUPERER_PROSITS,
                payload: result.data,
            })

        }).catch((err) => {

            dispatch({
                type: RECUPERER_PROSITS,
                payload: null
            })
        });
}


export const recupererFicheID = (id) => dispatch => {
    dispatch(mettrePrositaCharger())
    axios.get(`/api/prosit/test/${id}`)
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


export const checkerProsit = (id) => dispatch => {
    dispatch(mettrePrositaCharger())
    axios.put(`/api/prosit/test/${id}`)
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


export const televerserProsit = (prosit) => dispatch => {
    dispatch(mettrePrositaCharger())
    axios.put(`/api/prosit/testfichier/`, prosit)
        .then((result) => {
            dispatch({
                type: TELEVERSEMENT_PROSIT,
                payload: result.data,
            })

        }).catch((err) => {

            dispatch({
                type: TELEVERSEMENT_PROSIT,
                payload: err.response.data
            })
        });
}








export const mettrePrositaCharger = () => {


    return {
        type: PROSIT_CHARGEMENT
    }
}