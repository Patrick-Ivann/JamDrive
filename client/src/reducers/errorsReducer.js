import { GET_ERRORS } from "../actions/types";
import { logToTxt } from "../utils/functionSheet";
const initialState = {}

export default function (state = initialState, action) {

    switch (action.type) {

        case GET_ERRORS:


        logToTxt(action.payload, "AllErrors");


            return action.payload;
       

        default: return state;
    }
}