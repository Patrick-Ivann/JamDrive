import { combineReducers } from "redux";

//import authReducer from './authReducer';
import errorReducer from './errorsReducer';
import prositReducer from "./prositReducer";
import ressourceReducer from "./ressourceReducer";


export default combineReducers( {
  //auth: authReducer,
    errors: errorReducer,
        prosit: prositReducer,
        ressources: ressourceReducer,


});
