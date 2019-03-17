import axios from 'axios';
import { RESSOURCE_CHARGEMENT, PROSIT_SUPPRESSION, TELEVERSEMENT_PROSIT, GET_ERRORS } from './types';

export const televerserRessource = (prosit) => dispatch => {
    //dispatch(mettreRessourceaCharger())


    const config = {

        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    const formData = new FormData();
        formData.append(prosit.name.split(".")[0], prosit)

    axios.put(`https://api.jampops.online/api/prosit/ajouterfichier`, formData, config)
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






export const mettreRessourceaCharger = () => {


    return {
        type: RESSOURCE_CHARGEMENT
    }
}
