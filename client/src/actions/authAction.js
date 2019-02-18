import {
    CONNEXION,
    GET_ERRORS,
    SET_CURRENT_USER
} from "./types";
import setAuthToken, {} from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axios from 'axios';

export const godModeActivation = (input) => dispatch => {

    const connexionData = {}
   connexionData.motDePasse = input
    

    if (connexionData.motDePasse === "roadToUneThune") {

        dispatch({
            type: CONNEXION,
            payload: true
        })

        localStorage.setItem('godMode', true)

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