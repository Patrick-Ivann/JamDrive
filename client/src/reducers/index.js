import {
  combineReducers
} from "redux";

import errorReducer from './errorsReducer';
import prositReducer from "./prositReducer";
import ressourceReducer from "./ressourceReducer";
import authReducer from "./authReducer";
import navigationReducer from "./navigationReducer";
import themeReducer from './themeReducer'


export default combineReducers({

  auth: authReducer,
  errors: errorReducer,
  navigation: navigationReducer,
  prosit: prositReducer,
  ressources: ressourceReducer,
  theme: themeReducer


});