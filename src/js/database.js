//Funksjonalitet for å snakke med database
//import {db} from './app';


  // Initialize Firebase
  import firebase from 'firebase/'
  import { reject } from 'q';
  import config from '../config';
  export let firebaseApp = firebase.initializeApp(config);
  export let auth = firebase.auth();
  export const functions = firebase.functions(firebaseApp);
  export const db = firebase.firestore(firebaseApp);
  export let authKeys = {
      emailAuth: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      googleAuth: firebase.auth.GoogleAuthProvider.PROVIDER_ID
}

export function getMagnusMeny() {
  console.log("start getfromdatabase");
  const pastaMeny = db.collection('Restauranter').doc("Magnus spiseri").collection('Menyer').where('id', '>', 0);
  return pastaMeny.get().then(function(querySnapshot){
    let array = [];
    querySnapshot.docs.forEach(function(document){
        array.push(document.data());
    });
    return array;
}).catch(function (error) {
    console.log("Error getting document:", error);
    reject(error);
  });
}
export function getAllRestaurants(){
    const route = db.collection('Restauranter');
    console.log(route);
    let array = [];
    return route.get().then(function(querySnapshot){
        querySnapshot.docs.forEach(function(document){
            array.push(document.data());
        });
        return array;
    })
    .catch(function(error){
        console.error('error i firebase getallrestaurants: ', error);
        reject(error);
    });
}

export function getTakeoutMenu(restaurant){
    if (typeof restaurant !== 'string'){
        console.error('invalid type: Function requires string, got', typeof restaurant);
    }
    const route = db.collection('Restauranter').doc(restaurant).collection('Menyer');
    return route.get().then(function(querySnapshot){
        let array = [];
        querySnapshot.docs.forEach(function(document){
            array.push(document.data());
        });
        return array;
    }).catch(function(error){
        console.error('error i getTakeOutMenu: ', error);
        reject(error);
    })
}

export function addToOrder(order){
    let restaurant = order[8];
    console.log('navn på restaurant for addToOrder: ' + restaurant);
    order = JSON.stringify(order);
    const route = db.collection('Restauranter').doc(restaurant).collection('Bestillinger');
    route.add(order);
}

export function updateOrders(deleted = null, currentOrders = null) {
    let data = {
    //Deleted = array med alle bestillinger som har blit slettet siden forrige gang funksjonen ble kalt.
        deleted: deleted,
    //currentOrders = array med alle aktive bestillinger lokalt i appen til restauranten
        currentOrders:currentOrders,
    //restaurantCtx = objekt med informasjon om restauranten som sendte request. 
    };

    let updateOrdersCloudFunction = functions.httpsCallable('updateOrders');
    updateOrdersCloudFunction(data).then((result) => {
        let newOrders = result.data || null;
        return newOrders;
    })
}