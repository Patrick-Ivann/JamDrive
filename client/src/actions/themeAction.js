import { CHANGER_THEME } from "./types";

export const changerTheme = () => dispatch => {

    dispatch({
        type:CHANGER_THEME,
    })
}