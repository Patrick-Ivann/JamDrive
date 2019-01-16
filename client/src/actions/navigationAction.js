import { CHANGEMENT_DE_PAGE } from "./types";

export const changementDePage = (pathname) => dispatch => {
  

    dispatch({
        type : CHANGEMENT_DE_PAGE,
        payload : pathname
    })

}
