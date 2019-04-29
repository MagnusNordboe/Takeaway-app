//Funksjonalitet for å snakke med database
//import {db} from './app';


  // Initialize Firebase
  import firebase from 'firebase/'
  import { reject } from 'q';
  import config from '../config';
  export let firebaseApp = firebase.initializeApp(config);
  export let auth = firebase.auth();
  const functions = firebase.functions(firebaseApp);
  const db = firebase.firestore(firebaseApp);
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

export function updateArray(){
    let brusArray = [
        {
            kategorinavn: 'brus'
        },
        {
            id: 192,
            navn: 'fanta',
            pris: 30,
        },
        {
            id: 193,
            navn: 'cola',
            pris: 30
        },
        {
            id: 194,
            navn: 'villa champagne',
            pris: 30
        }
    ];
    let burgerArray = [
        {
            kategorinavn: 'burgere',
        },
        {
            id: 195,
            navn: 'magnus spesialburger',
            pris: 150,
            allergener: [
                'gluten',
                'egg',
                'hvete'
            ]
        },
        {
            id: 196,
            navn: 'biffburger cheesy deluxe',
            pris: 200,
            allergener: [
                'laktose',
                'hvete'
            ]
        },
        {
            id: 197,
            navn: 'kyllingburger',
            pris: 174,
            allergener: [
                'hvete'
            ]
        }
    ];

    let magnusSpiseriArray = [
        {
            restaurant: 'Magnus Spiseri',
            adresse: 'bortevekkveien 69',
            telefon: 9999999
        },
        brusArray,
        burgerArray
    ];
    let parsedJSON = JSON.stringify(magnusSpiseriArray);
    console.log(parsedJSON);
    db.collection('Restauranter').doc('Magnus spiseri').update({jsonString: parsedJSON}).then(function(){console.log('ferdig puttet json')}).catch(function(error){console.error(error)});
}