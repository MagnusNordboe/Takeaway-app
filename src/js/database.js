//Funksjonalitet for å snakke med database
//import {db} from './app';


  // Initialize Firebase
  import firebase from 'firebase'
  import config from '../config';
import { reject } from 'q';
  let firebaseApp = firebase.initializeApp(config);
  const functions = firebase.functions(firebaseApp);
  const db = firebase.firestore(firebaseApp);


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

export function addToOrder(restaurant, order){
    const route = db.collection('Restauranter').doc(restaurant).collection('Bestillinger').doc(order.name);
    route.set(order);   
}

export function updateOrders(deleted, currentOrders, restaurant) {
    let data = {
    //Deleted = array med alle bestillinger som har blit slettet siden forrige gang funksjonen ble kalt.
        deleted: deleted,
    //currentOrders = array med alle aktive bestillinger lokalt i appen til restauranten
        currentOrders:currentOrders,
    //restaurantCtx = objekt med informasjon om restauranten som sendte request. 
        ctx: {
            restaurant: restaurant
        }
    };
    let updateOrdersCloudFunction = functions.httpsCallable('updateOrders');
    updateOrdersCloudFunction(data).then((result) => {
        let newOrders = result.data;
        console.log(newOrders);
    })
}