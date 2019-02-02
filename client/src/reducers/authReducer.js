import { CONNEXION, SET_CURRENT_USER } from "../actions/types";

const intialState = {

    godMode : false
   
}

export default function (state = intialState, action) {

    switch (action.type) {

  case CONNEXION:
    return { 
        ...state, 
        godMode : action.payload
     }

     case SET_CURRENT_USER:
     return{
       ...state,
       utilisateur : action.payload
     }

  default:
    return state
  }
}


