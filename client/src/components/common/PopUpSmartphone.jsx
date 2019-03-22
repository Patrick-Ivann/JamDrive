import React from 'react'

export default function PopUpSmartphone() {
  return (
    <div>
         {(navigator.userAgent.match(/Android/i)) ? (
         
         <div class="alert alert-success alert-dismissible fade show" role="alert">
                <h4 class="alert-heading">Télécharger l'application</h4>
                <p>Nous nous sommes aperçus que vous utilisiez JamDrive sur un téléphone, souhaitez-vous télécharger notre application mobile ?</p>
                <hr/>
                <p class="mb-0">
                    <span>Pour les systèmes Android seulement.</span>
                    <br/>
                  <button class="btn btn-success" ><a href={`https://api.jampops.online/apk/JamDrive.apk`}>Télécharger </a></button>
                </p>

                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>) : (null)


         }
                </div>



         )  
            
         }


  
