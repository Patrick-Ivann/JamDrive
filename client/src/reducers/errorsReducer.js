import { GET_ERRORS,RESET_ERRORS } from "../actions/types";
import { logToTxt } from "../utils/functionSheet";
const initialState = {}

export default function (state = initialState, action) {

    switch (action.type) {

        case GET_ERRORS:


        logToTxt(action.payload);


            return action.payload;

        case RESET_ERRORS:

            return null;

       

        default: return state;
    }
}