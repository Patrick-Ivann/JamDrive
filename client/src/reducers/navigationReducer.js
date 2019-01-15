import { CHANGEMENT_DE_PAGE } from "../actions/types";

const intialState = {

    lastPath : ''
}

export default function (state = intialState, action) {

    switch (action.type) {

        case CHANGEMENT_DE_PAGE:return{

            ...state,
            lastPath : action.payload

        }

         default:
         return state;
    }

}