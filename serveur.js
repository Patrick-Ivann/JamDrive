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
require('dotenv').config()

const app = express();
var cors = require('cors');






 app.use(helmet())

var allowedOrigins = ['http://localhost:3000', 'http://drive.jampops.com',
    'https://drive.jampops.com', 'http://104.248.167.41:3000', "https://104.248.167.41:3000"
];
app.use(cors({
      credentials: true,
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = "Ce site ne permet pas CORS depuis cette Origine";
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use('/pdf', express.static('fichiers/pdf'));
app.use('/apk', express.static('fichiers/apk'));




app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(morgan('common', {
    stream: fs.createWriteStream('./logs/access.log', {
        flags: 'a'
    })
}));
app.use(compression());



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
console.log(`                                      ....''''....                                            
                                      ..,;:cloddxxxxdddolc:,..                                      
                                  ..;codxxxxkkkkkkkkkkOOOOOOkdl;'.                                  
                               .';lddxxxxxxxkkkkkkkkkkkOOOOOOOOOkd:'.                               
                             .,coddddddxxxxxdooollloodxkkOOOOOOOOOOkc.                              
                           .,coooddddddoc;,....     ....,;ldkOOOOOO0d'                              
                          .:loooooddl;'.     .             .':oxOOOd;.                              
                        .,clloooooc,.       ck:.              ..,,'.                                
                       .,cllloool,.        'OMNk;.                     ..'.. ..,,,,,'''.....        
                      .,cclllllc'          lNMMMNxc,                 .:xkOkl'.:kOOOOOOOOkkkxdoc:,.  
                      ':ccllllc.          'OMMMMMMWXd,.''',,;:::.    ;k0OO0Oo..o0000000000000000Okc.
                     .;cccclll,.          lNMMMMMMMMWNXXNNNWWWNx.    ,xOO0O0Oc.'lollllldO00000000Oo.
                    .':ccccclc'       .':dKMMMMMMMMMMMMMMMMMMNd.     .lOOOO00x,..,;:cldkO000000ko;. 
              ...'',;:ccccccc:.   .;lx0NWMMMMMMMMMMMMMMMMMMMXo.     ..ckOOOOOOkxkOO00000000Odl;..   
         ...',;;:::::::ccccc:'. 'dKNMMMMMMMMMMMMMMMMMMMMMMMXc..;:clodxkOOOOOOOO000000Okxoc;..       
     ...',;;;::::::::;;;,,'..   .'ckXWMMMMMMMMMMMMMMMMMMMMWd.'dkOOOOOOOOOOOOOOOOkxoc:,..            
  ..',;;;;;;;,,''......    .........'cxKWMMMMMMMMMMMMMMMMMM0,.okkkkOOOOOOOOOOOo,..                  
 .,,;;;;;;;;,'......''',,,;;:::cccc:,...:OWMMMMMMMMMMMMMMMMWk''oxdolccxOOOOOOk,                     
..,,;;;;;;;;;;;:::::::::::ccccccclllllc'.cNMMMMMMMMMMMMMMMMMWd.....  ,xOOOOOOo.                     
  ...'',,;;;;;;;:::::::::::ccccccccccc:,.;KMMMMMMWNKkkO0XNWMMNl.    'dOOOOOOx,                      
       ................................  'OMMMMNkc,.  ...';:loc.   ,okOOOOOk:.                      
                              ....       .xWWKd;.                .:xkkOOOOkc.                       
                            .';::;,..     ckl.                 .;okkkkkOOx:.                        
                            ':cccccc;'..  ..                .':oxkkkkkkko,                          
                            .;ccccccccc:,'...          ..',coxxxxkkkkkd:.                           
                             .';:ccccccllllc::;;;;;;::clodxxxxxxxkkxo:.                             
                               ..,:cccccclllloooooooddddddxxxxxxxdc,.                               
                                  ..,;:ccllllllooooooddddddxddl:,.                                  
                                     ...',;:cclllooooolllc:,'..                                     
                                           ..............                                           
                           ...        .....     ..   ..       ..  .......                           
                          ;OOxxo:.   ;OOxxxd,. .dd;..lx,     ;kc.,kOxxxxo'                          
                          :Xd',lOk;  cXd..,xKl..OOc. ;0k.   'OO' :Kx'....                           
                          :Ko   'k0, cKl   ,0k..OOc.  cKo. .xK:  :Kd.....                           
                          cXo    lXc cXx,':k0: .OOc.  .dK:.lKl.  :KKxxxxo'                          
                          cKo   .k0; cXKk0Nk'  .OOc.   'O0d0x.   :Kx'.....                          
                          cXd.'ckO:. cXo.;OO;  .OOc.    :KW0,    :Kd.....                           
                          ;0Oxxdc.   :Oc  .dk; .xx:.    .lO:     ;O0xxxxo'                          
                          .','.      .'.   .'.  ....     ...     .',,,,,,. `);


    console.log("\x1b[45m"
        ,`Serveur demarré sur le port: ${port}`);
});