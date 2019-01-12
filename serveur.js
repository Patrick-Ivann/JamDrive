//const express = require('express');
const mongoDB = require("./config/keys").mongoURI;
import express from "express";
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan';
import fs from 'fs'
//const mongoose = require('mongoose');



//const bodyParser = require("body-parser");

/*********************************************Raccourcie URL **************************************/

//const prosit = require("./routes/api/prosit");
import prosit from './routes/api/prosit'

/********************************************Routage express****************************************/
const app = express();




 app.use(helmet())

app.use(bodyParser.urlencoded({
    extended: false
}))



app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(morgan('common', {
    stream: fs.createWriteStream('./access.log', {
        flags: 'a'
    })
}));
app.use(compression());

/*app.all("*", (req,res) =>{

console.log('nsm native');
})*/

app.get('/', (req, res) => {

    res.send("Le serveur node tourne " + Date.now());
});

app.use("/api/prosit", prosit);


/*****************************************BDD*********************************************** */
//Mise en place de la connexion mongoDB

mongoose
    .connect(mongoDB, {
        useNewUrlParser: true,
        poolSize: 20,
        socketTimeoutMS: 480000,
        keepAlive: 300000,

    })
    .then(() => console.log(" connexion mongoDB"))
    .catch(err => console.log(err));
// permet à mongoose d'utiliser le systeme de promise via la dépendance globale Promise

mongoose.Promise = global.Promise;





/*******************************Lancement du serveur NOde avec ouverture de port et écoute de ce dernier*********************************************/
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Serveur demarré sur le port: ${port}`);
});