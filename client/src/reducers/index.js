import {
  combineReducers
} from "redux";

import errorReducer from './errorsReducer';
import prositReducer from "./prositReducer";
import ressourceReducer from "./ressourceReducer";
import authReducer from "./authReducer";
import navigationReducer from "./navigationReducer";


export default combineReducers({

  auth: authReducer,
  errors: errorReducer,
  navigation: navigationReducer,
  prosit: prositReducer,
  ressources: ressourceReducer,


});