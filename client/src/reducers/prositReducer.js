import {

    RECUPERER_PROSITS,
    PROSIT_CHARGEMENT,
    AJOUTER_PROSIT,
    PROSIT_SUPPRESSION,
    TELEVERSEMENT_PROSIT,
    METTRE_A_JOUR_RECHERCHE
} from "../actions/types";

const intialState = {

    //prosits: [],
    //prosit: {},
    prosits: [],
    prosit: {},
    televerse:{},
    recherche:[],
    valeurSelect:[],
    chargement: false,
    rechercheString:'',
}

let uniteSansDoublon
let prositUnite = []


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
                    valeurSelect: action.payload.forEach(element => {
                        prositUnite.push(element.unite)

                    }), 
                    uniteSansDoublon : [...new Set(prositUnite)],
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
                televerse: action.payload,
                chargement: false 
            }


            case PROSIT_SUPPRESSION:
                return {
                    ...state,
                    prosits: state.prosits.filter(prosit => prosit._id !== action.payload)
                }

                /*case METTRE_A_JOUR_RECHERCHE:{
                    return{
                        ...state,
                        prosits: state.prosits.filter(prosit => prosit.nomProsit.toLowerCase().indexOf(action.payload.toLocaleLowerCase()) !== -1)
                    }
                }*/


                 case METTRE_A_JOUR_RECHERCHE: {
                     return {
                         ...state,
                        rechercheString: action.payload
                        }
                 }
        default:
            return state;
    }


}