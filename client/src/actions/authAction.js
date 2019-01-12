import { CONNEXION, GET_ERRORS } from "./types";

export const godModeActivation = (connexionData) => dispatch =>  {


    if (connexionData === "JamDrive") {
        
        dispatch({
            type: CONNEXION ,
            payload: true
        })
        
    }else{

        dispatch({
            type:CONNEXION,
            payload:0
        })

        
    } 
}


export const tentativeRoutePrivee = () => dispatch => {

    dispatch({
        type:GET_ERRORS,
        payload : "Vous n'êtes pas autorisé & acceder à cette page."
    })
  
}
