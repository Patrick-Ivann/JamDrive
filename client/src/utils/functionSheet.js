import moment from "moment";
export const sleep = milliseconds => {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

export const concatValeurObjet = obj => {

     
        var concatString = '';
        for (var p in obj) {
            concatString += p + ': ' + obj[p] + '\n';
        }
        return(concatString);
    
}


export const concatValeurObjetAlt = obj => {


 

    var concatString =""
    Object.keys(obj).forEach(element => {

     concatString += obj[element] + '\n'

    });

        return (concatString);

}

export const concatValeurObjetToHTML = obj => {




    var concatString =""
    Object.keys(obj).forEach(element => {

        concatString += obj[element] + '\n'

    });

    return (concatString);

}


