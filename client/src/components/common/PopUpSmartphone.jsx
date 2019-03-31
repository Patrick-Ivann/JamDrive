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
                      <a href='http://play.google.com/store/apps/details?id=com.jamdriveviewer&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img className="img-fluid" alt='Disponible sur Google Play' src='https://play.google.com/intl/en_us/badges/images/generic/fr_badge_web_generic.png' /></a>
                </p>

                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>) : (null)


         }
                </div>



         )  
            
         }


  
