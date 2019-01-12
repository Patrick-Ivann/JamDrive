import { CONNEXION } from "../actions/types";

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

  default:
    return state
  }
}


