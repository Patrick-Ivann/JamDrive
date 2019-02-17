import axios from 'axios';
import { TELEVERSEMENT_RESSOURCE, RESSOURCE_CHARGEMENT } from './types';

export const televerserRessource = (prosit,id) => dispatch => {
    dispatch(mettreRessourceaCharger())
    axios.put(`https://api.jampops.online/api/prosit/testressource/${id}`, prosit)
        .then((result) => {
            dispatch({
                type: TELEVERSEMENT_RESSOURCE,
                payload: result.data,
            })

        }).catch((err) => {

            dispatch({
                type: TELEVERSEMENT_RESSOURCE,
                payload: err.response.data
            })
        });
}






export const mettreRessourceaCharger = () => {


    return {
        type: RESSOURCE_CHARGEMENT
    }
}
