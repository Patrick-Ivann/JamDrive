import {
  CHANGER_THEME
} from "../actions/types";

const intialState = {

  theme: false
}

export default function (state = intialState, action) {

  switch (action.type) {

    case CHANGER_THEME:
      return {
        ...state,
        theme: !state.theme
      }


    default:
      return state
  }
}