//const express = require('express');
const mongoDB = require("./config/keys").mongoURI;
import express from "express";
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan';
import fs from 'fs'
import docx from 'docx-pdf';
import chokidar from 'chokidar';
//const mongoose = require('mongoose');



//const bodyParser = require("body-parser");

/*********************************************Raccourcie URL **************************************/

//const prosit = require("./routes/api/prosit");
import prosit from './routes/api/prosit'
import  log from "./routes/api/log";
import utilisateur from './routes/api/utilisateur';
import { logToTxt } from "./functionSheet";
/********************************************Routage express****************************************/
const app = express();




 app.use(helmet())

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use('/pdf', express.static('fichiers/pdf'));



app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(morgan('common', {
    stream: fs.createWriteStream('./logs/access.log', {
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
app.use("/logs", log);
app.use("/magic/utilisateur",utilisateur)

app.all('*', (req, res, next) => {

    const erreurs = {}

    logToTxt(req.path, "erreur URL")
    res.sendStatus(404)
});




///https://api.datamuse.com/words?rel_jjb=computer
//http://localhost:5000/api/utilisateur/generation



const dir = "./fichiers";

var watcher = chokidar.watch(dir, {
    persistent: true,
    ignoreInitial: true
});

watcher
    .on('add', function (path) {
            console.log('File', path.split("\\")[1], 'has been added');

            let filename = path.split("\\")[1]

     if (filename.split(".")[1] === "docx") {



         docx(`${dir}/${filename}`, `${dir}/pdf/${filename.split(".")[0]}.pdf`, function (err, result) {
             if (err) {
                 console.log(err);
             }
             console.log(result);
         });
     }
    
    
})
.on('change', function (path) {
    console.log('File', path.split("\\")[1], 'has been changed');
    
    if (path.split(".")[1] === "docx") {
    
    
    
        docx(`${dir}/${path}`, `${dir}/pdf/${path.split(".")[0]}.pdf`, function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result);
        });
    }
})
    .on('unlink', function (path) {
        console.log('File', path, 'has been removed');
    })
    .on('error', function (error) {
        console.error('Error happened', error);
    })

   




/*****************************************BDD*********************************************** */
//Mise en place de la connexion mongoDB

mongoose
    .connect(mongoDB, {
        useNewUrlParser: true,
        poolSize: 20,
        socketTimeoutMS: 480000,
        keepAlive: 300000,

    })
    .then(() => console.log("\x1b[41m", "\x1b[7m", " connexion mongoDB"))
    .catch(err => console.log(err));
// permet à mongoose d'utiliser le systeme de promise via la dépendance globale Promise

mongoose.Promise = global.Promise;





/*******************************Lancement du serveur NOde avec ouverture de port et écoute de ce dernier*********************************************/
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("\x1b[45m"
        ,`Serveur demarré sur le port: ${port}`);
});