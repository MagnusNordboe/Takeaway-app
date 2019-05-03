import {functions} from './database';
function intializeSync(currentRestaurant, stopSync = false){
    //variabel for å holde orden på timer
    let syncTimer;
    //Ved bruk av dobbel negativ vil man kunne stoppe timeren ved å sende inn
    //stopSync med hvilken som helst verdi, uten å risikere å starte flere timere
    if(!stopSync){
        syncTimer = setInterval(syncOrders(currentRestaurant), 10000);
    }
    else{
        clearInterval(syncTimer);
    }
}

function syncOrders(currentRestaurant){
    
}