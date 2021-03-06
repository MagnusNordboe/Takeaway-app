import $$ from 'dom7';
import Framework7, { Template7 } from 'framework7/framework7.esm.bundle.js';



  // Initialize Firebase
const firebase = require('firebase/app');
const firebaseUI = require('firebaseui');
require("firebase/auth");
require("firebase/database");
require("firebase/firestore");
require("firebase/functions");


let config = {
    apiKey: "AIzaSyCzwAZsG1Kjs6vv6-d8SW3mh8BI4Bohzp4",
    authDomain: "grimstad-takeaway.firebaseapp.com",
    databaseURL: "https://grimstad-takeaway.firebaseio.com",
    projectId: "grimstad-takeaway",
    storageBucket: "grimstad-takeaway.appspot.com",
    messagingSenderId: "232052974238"
  };
  let firebaseApp = firebase.initializeApp(config);
  const db = firebase.firestore(firebaseApp);
  window.firebase = firebase;


// Import F7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';
// Import Cordova APIs
import cordovaApp from './cordova-app.js';
// Import Routes
import routes from './routes.js';

var app = new Framework7({
  root: '#app', // App root element
  id: 'io.localorder.app', // App bundle ID
  name: 'Local Order', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },

      // Demo products for Catalog section
      products: [
        {
          id: '1',
          title: 'Apple iPhone 8',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
        },
        {
          id: '2',
          title: 'Apple iPhone 8 Plus',
          description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
        },
        {
          id: '3',
          title: 'Apple iPhone X',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
        },
      ],
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
   // firebase,
   // firestore,
   // db,
  },
  // App routes
  routes: routes,


  // Register service worker
  serviceWorker: Framework7.device.cordova ? {} : {
    path: '/service-worker.js',
  },
  // Input settings
  input: {
    scrollIntoViewOnFocus: !!Framework7.device.cordova,
    scrollIntoViewCentered: !!Framework7.device.cordova,
  },
  // Cordova Statusbar settings
  statusbar: {
    overlay: Framework7.device.cordova && Framework7.device.ios || 'auto',
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
    },
  },
});

// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  // Close login screen
  app.loginScreen.close('#my-login-screen');

  // Alert username and password
  app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
});


//Event listeners. FLytt til egen modul etter hvert

//Kjører når innloggingstatus endres
firebase.auth().onAuthStateChanged(function(user){
  if(user){
    //Ting som skjer hvis man er logget inn
  }
  else{
    //ting som skjer hvis man ikke er logget inn
  }
});

magnusMeny();

//funksjon som skal kjøres hver gang det kjøres funksjonalitet som har med bruker å gjøre. 
function verifyUser(){
  let user = firebase.auth().currentUser;
  if(user){
    return user;
  }
  else{
    firebase.auth().signInAnonymously().catch(function(error){
      console.error(error.code, error.message);
    });
  }
}


  //Funksjonalitet for å snakke med database
  function magnusMeny(){
    console.log("start getfromdatabase");
    const pastaMeny = db.collection('Restauranter').doc("Magnus spiseri").collection('Menyer').where('id', '>', 0);
    pastaMeny.get().then(function(querySnapshot) {
        querySnapshot.docs.forEach(function(e){
         let template = $$('#template').html();
         let compiledTemplate = Template7.compile(template);
         let html = compiledTemplate(e.data());
         console.log(html);
         document.getElementById('container').innerHTML += html;
        });
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}
 