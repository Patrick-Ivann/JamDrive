import { combineReducers } from "redux";

import errorReducer from './errorsReducer';
import prositReducer from "./prositReducer";
import ressourceReducer from "./ressourceReducer";
import authReducer from "./authReducer";


export default combineReducers( {

      auth: authReducer,
      errors: errorReducer,
        prosit: prositReducer,
        ressources: ressourceReducer,


});
