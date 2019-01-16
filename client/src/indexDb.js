window.indexedDB = window.indexedDB || window.mozIndexeDB || window.webkitIndexeDB || window.msIndexeDB

if (!window.indexedDB) {
    alert("tej de là avec ton navigateur de mort")
}



let request = window.indexedDB.open("PrositsOfflineDatabase",1)
,db,tx,store,index;

request.onerror = (e) => {

    alert("Erreur",e.target.errorCode)
}

request.onsuccess = () =>{
   db = request.result
   tx = db.transaction("prositsOfflineStore","readwrite");
   store = tx.objectStore("prositsOfflineStore")
   

   db.onerror = (e) =>{
       console.log("erreur" + e.target.errorCode);
   }

   tx.onComplte = () =>{
       db.close();
   }

   
     
}


request.onupgradeneeded = () => {
    let db = request.result,store
    store = db.createObjectStore("prositsOfflineStore")

}


 