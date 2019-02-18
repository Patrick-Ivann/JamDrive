import { CHANGER_THEME } from "./types";

export const changerTheme = () => dispatch => {

    
    dispatch({
        type:CHANGER_THEME,
    })
    var list = document.getElementsByClassName("sc-bZQynM");
    

    
   


        let para = list[0]
        let compStyles = window.getComputedStyle(para);


          if (compStyles.backgroundColor === "rgba(0, 0, 0, 0)") {
              let a = 35
              let b = 35
              let c = 35


            document.getElementsByTagName("body")[0].style.backgroundColor = 'rgb(' + a + ',' + b + ',' + c + ')'


        }else{

             let a = 0
             let b = 0
             let c = 0
             let d = 0


             document.getElementsByTagName("body")[0].style.backgroundColor = 'rgba(' + a + ',' + b + ',' + c + ',' + d + ')'

        }



      
}