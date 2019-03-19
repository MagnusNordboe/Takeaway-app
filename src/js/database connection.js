import firebase from '../../node_modules/firebase/firebase-app.js';
import firestore from '../../node_modules/firebase/firebase-firestore.js';

const db = firebase.firestore();
const magnusSpiseri = db.collection('Restauranter').doc('Magnus spiseri');
const magnusMeny = magnusSpiseri.collection('Menyer');

function getMagnusData(){
    magnusMeny.get().then(function (doc) {
        if(doc.exists) {
            console.log("Document data:", doc.data());
        }
        else{
            console.error("Did not find document");
        }
    }).catch(function (error) {
        console.error("Error ");
    });
}

