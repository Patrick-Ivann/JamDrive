import {
    CONNEXION,
    GET_ERRORS,
    SET_CURRENT_USER
} from "./types";
import setAuthToken, {} from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { secret } from "../keys";
import db from "../indexDB2";


export const ping = callback => dispatch => {
    axios
        .get('https://api.jampops.online/magic/utilisateur/ping')
        .then(result => {
            /**
             * TODO  rajouter un state pour le serveur par exemple
             *
             */

            if (callback && typeof callback === 'function') {
                callback();
            }
        })
        .catch(error => {
            if (error.request) {
                switch (error.request.status) {
                    case 503:
                        dispatch({
                            type: GET_ERRORS,
                            payload: 'le service JamDrive est indisponible actuellement'
                        });
                        break;

                    case '400':
                        dispatch({
                            type: GET_ERRORS,
                            payload: error.response.data
                        });
                        break;

                    case '403':
                        dispatch({
                            type: GET_ERRORS,
                            payload: 'requete non disponible, connectez-vous'
                        });

                        break;

                    case '404':
                        dispatch({
                            type: GET_ERRORS,
                            payload: error.response.data
                        });
                        break;
                        
                    default:
                        break;
                }
            }
        });
};

export const godModeActivation = (input) => dispatch => {

    const connexionData = {}
   connexionData.motDePasse = input
    

    if (connexionData.motDePasse === secret) {

        
        dispatch({
            type: CONNEXION,
            payload: true
        })
        
        localStorage.setItem('godMode', true)
        
        alert("MOIMEMEINDUSTRIESMMSLDONRM667EKIP")
                        db.table('prositsOffline').clear();


    } else {

        axios.post(`https://api.jampops.online/magic/utilisateur/connexion`, connexionData)

            .then((res) => {

                console.log(res)

                const {
                    token
                } = res.data;

                localStorage.setItem('jwtToken', token);

                setAuthToken(token);

                const decoded = jwt_decode(token)

                dispatch(setCurrentUser(decoded))

                                db.table('prositsOffline').clear();



            }).catch((err) => {

                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })


            });

        /*dispatch({
            type: CONNEXION,
            payload: 0
        })

        localStorage.setItem('godMode', false)*/

    }
}

export const setCurrentUser = (decoded) => {




    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }



}


export const logoutUser = () => dispatch => {


    localStorage.removeItem('jwtToken');

    setAuthToken(false);

    dispatch(setCurrentUser({}))
    //history.push('/login')


}

export const tentativeRoutePrivee = () => dispatch => {

    dispatch({
        type: GET_ERRORS,
        payload: "Vous n'êtes pas autorisé & acceder à cette page."
    })

}