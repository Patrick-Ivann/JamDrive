var cluster = require("cluster"); // module natif qui permet la mis en place de cluster multi-threads donc les processus en simultané dans node
var os = require("os"); // pour avoir des informations sur le serveur/le hardware qui fait tourner l'appli
const fileName = __filename.slice(__dirname.length + 1, -3)

import { logToTxt } from "./functionSheet.js";




const CPUS = os.cpus(); //si on a 4 coeurs on a 4 cluster
if (cluster.isMaster) {
    CPUS.forEach(function () {

        
        cluster.fork()

    });
    cluster.on("listening", function (worker) {

        console.log("Cluster %d en place", worker.process.pid);
        logToTxt(`Cluster ${worker.process.pid} en place. `, fileName);


        
    });
    cluster.on("disconnect", function (worker) {
        console.log("Cluster %d déconnecté", worker.process.pid);
        logToTxt(`Cluster ${worker.process.pid} déconnecté. `, fileName);
    });


    cluster.on("exit", function (worker) { // si le bordel pete on peut relancer
        console.log("Cluster %d RIP", worker.process.pid);
        logToTxt(`Cluster ${worker.process.pid} RIP `, fileName);
        cluster.fork();
    });

} else {
    require("./serveur.js");
}