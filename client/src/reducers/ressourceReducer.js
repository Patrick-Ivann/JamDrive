import {

    AJOUTER_RESSOURCE,
    RESSOURCE_CHARGEMENT,
    RECUPERER_RESSOURCE,
    RECUPERER_RESSOURCES,
    RESSOURCE_SUPPRESSION,

} from "../actions/types";


const intialState = {

    ressource: null,
    ressources: null,
    chargement: false
}

export default function (state = intialState, action) {

    switch (action.type) {
        case RESSOURCE_CHARGEMENT:
            return {
                ...state,
                chargement: true
            };
        case AJOUTER_RESSOURCE:
            return {
                ...state,
                ressources: [action.payload, ...state.prosits]
            };

        case RECUPERER_RESSOURCE:
            return {
                ...state,
                ressource: action.payload,
                chargement: false
            };
        case RECUPERER_RESSOURCES:
            return {
                ...state,
                ressources: action.payload,
                chargement: false
            };

       

        case RESSOURCE_SUPPRESSION:
            return {
                ...state,
                ressources: state.ressources.filter(ressource => ressource._id !== action.payload)
            };
        default:
            return state;
    }

}