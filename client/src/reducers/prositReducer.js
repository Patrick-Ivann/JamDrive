import {

    RECUPERER_PROSITS,
    PROSIT_CHARGEMENT,
    AJOUTER_PROSIT,
    PROSIT_SUPPRESSION,
    TELEVERSEMENT_PROSIT
} from "../actions/types";

const intialState = {

    //prosits: [],
    //prosit: {},
    prosits: [],
    prosit: {},
    televerse:{},
    chargement: false
}

export default function (state = intialState, action) {

    switch (action.type) {


        /* case RECUPERER_PROSIT:
            return {
                ...state,
                prosit: action.payload ,
                chargement: false
            } */

            case RECUPERER_PROSITS:
                return {
                    ...state,
                    prosits: action.payload,
                    chargement: false
                }

        case PROSIT_CHARGEMENT:
            return {
                ...state,
                chargement: true
            }

        // case AJOUTER_PROSIT:
        //     return {
        //         ...state,
        //         prosits: [action.payload, ...state.prosits]
        //     }

        case AJOUTER_PROSIT:
             return {
                 ...state,
                 prosit: action.payload,
                 prosits: [...state.prosits,action.payload ]
             }


            case TELEVERSEMENT_PROSIT:
            return{
                ...state,
                televerse: action.payload 
            }


            case PROSIT_SUPPRESSION:
                return {
                    ...state,
                    prosits: state.prosits.filter(prosit => prosit._id !== action.payload)
                }

        default:
            return state;
    }


}