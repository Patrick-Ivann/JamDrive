import { CONNEXION, GET_ERRORS } from "./types";

export const godModeActivation = (connexionData) => dispatch =>  {


    if (connexionData === "JamDrive") {
        
        dispatch({
            type: CONNEXION ,
            payload: true
        })

        localStorage.setItem('godMode', true)
        
    }else{

        dispatch({
            type:CONNEXION,
            payload:0
        })

        localStorage.setItem('godMode', false)
        
    } 
}


export const tentativeRoutePrivee = () => dispatch => {

    dispatch({
        type:GET_ERRORS,
        payload : "Vous n'êtes pas autorisé & acceder à cette page."
    })
  
}
