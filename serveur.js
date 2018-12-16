const express = require('express');
const mongoose = require('mongoose');
const mongoDB = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");

/*********************************************Raccourcie URL **************************************/


/********************************************Routage express****************************************/
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

app.get('/', (req, res) => {

    res.send("Le serveur node tourne" + Date.now);
});




/*****************************************BDD*********************************************** */
//Mise en place de la connexion mongoDB
mongoose
    .connect(mongoDB, {
        useNewUrlParser: true
    })
    .then(() => console.log(" connexion mongoDB"))
    .catch(err => console.log(err));
// permet à mongoose d'utiliser le systeme de promise via la dépendance globale Promise
mongoose.Promise = global.Promise;





/*******************************Lancement du serveur NOde avec ouverture de port et écoute de ce dernier*********************************************/
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});



