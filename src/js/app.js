import $$ from 'dom7';
import Framework7 from 'framework7/framework7.esm.bundle.js';

import firebaseui from 'firebaseui';
import * as database from './database';
import {db} from './database';
// Import F7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';
// Import Cordova APIs
import cordovaApp from './cordova-app.js';
// Import Routes
import routes from './routes.js';


//Prepare for framework7 init
var app;


//Sjekk om localstorage allerede har listen over restauranter
if(window.localStorage.getItem('restaurants')){
  let restaurants = JSON.parse(window.localStorage.getItem('restaurants'));
  initializeFramework7(restaurants);
}
else{
  database.getAllRestaurants().then((array) => {
    initializeFramework7(array);
    let restaurants = JSON.stringify(array);
    window.localStorage.setItem('restaurants', restaurants);
  })
}



function initializeFramework7(restaurants){
  app = new Framework7({
  root: '#app', // App root element
  id: 'io.localorder.app', // App bundle ID
  name: 'Local Order', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      muligekategorier:'["Alle", "Sushi", "Burger", "Pizza", "Kebab", "Indisk"]',
      menye: [{
        id: '31',
        meny: [{
          rettID: '1',
          navn: "Rettnavn",
          besk: "Beskrivelse av produktet kan tilpasses etter ønske og kan være ganske lang. her er det forventet å liste informasjon om retten og valg for retten",
          atrib: "0",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Rettnavn",
          besk: '"Beskrivelse av produktet kan tilpasses etter ønske og kan være ganske lang. her er det forventet å liste informasjon om retten og valg for retten"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Rettnavn",
          besk: '"Beskrivelse av produktet kan tilpasses etter ønske og kan være ganske lang. her er det forventet å liste informasjon om retten og valg for retten"',
          atrib: "2",
          prisw: '140'
        }, {
          rettID: '4',
          navn: '"Rettnavn"',
          besk: '"Beskrivelse av produktet kan tilpasses etter ønske og kan være ganske lang. her er det forventet å liste informasjon om retten og valg for retten"',
          atrib: "1",
          prisw: '150'
        },
        ],
      }, {
        id: '32',
        meny: [{
          rettID: '1',
          navn: "Annet rettnavn",
          besk: "Beskrivelse av produktet kan tilpasses etter ønske og kan være ganske lang. her er det forventet å liste informasjon om retten og valg for retten",
          atrib: "1",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Annet rettnavn",
          besk: '"Beskrivelse av produktet kan tilpasses etter ønske og kan være ganske lang. her er det forventet å liste informasjon om retten og valg for retten"',
          atrib: "2",
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Annet rettnavn",
          besk: '"Beskrivelse av produktet kan tilpasses etter ønske og kan være ganske lang. her er det forventet å liste informasjon om retten og valg for retten"',
          atrib: "1",
          prisw: '140'
        }, {
          rettID: '4',
          navn: "Annet rettnavn",
          besk: '"Beskrivelse av produktet kan tilpasses etter ønske og kan være ganske lang. her er det forventet å liste informasjon om retten og valg for retten"',
          atrib: "2",
          prisw: '150'
        },
        ],
      }, {
        id: '33',
        meny: [{
          rettID: '1',
          navn: "BrugBurg",
          besk: "digg burger, supergod snerr liom",
          atrib: "1",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Basdasdg",
          besk: '"digg burg122222222222222222222supergod snerr liom"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Bruger HEEY",
          besk: '"digg 33333333333burger, supergod snerr liom"',
          atrib: "1",
          prisw: '140'
        }, {
          rettID: '4',
          navn: "Pizza Burger",
          besk: '"di44444g burger, supergod snerr liom"',
          prisw: '150'
        },
        ],
      }, {
        id: '35',
        meny: [{
          rettID: '1',
          navn: "brennevin",
          besk: "digg burger, supergod snerr liom",
          atrib: "3",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "konjakk",
          besk: '"digg burg122222222222222222222supergod snerr liom"',
          atrib: "3",
          prisw: '120'
        }, {
          rettID: '3',
          navn: "vodka",
          besk: '"digg 33333333333burger, supergod snerr liom"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: "liquer",
          besk: '"di44444g burger, supergod snerr liom"',
          prisw: '150'
        },
        ],
      }, {
        id: '34',
        meny: [{
          rettID: '1',
          navn: "Brug2Burg",
          besk: "digg burger, supergod snerr liom",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Basda2sdg",
          besk: '"digg burg122222222222222222222supergod snerr liom"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Bruger222 HEEY",
          besk: '"digg 33333333333burger, supergod snerr liom"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: "Pizza22222 Burger",
          besk: '"di44444g burger, supergod snerr liom"',
          prisw: '150'
        },
        ],
      }, {
        id: '41',
        meny: [{
          rettID: '1',
          navn: "leverpostei",
          besk: "digg burger, supergod snerr liom",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "ostepopp",
          besk: '"digg burg122222222222222222222supergod snerr liom"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "grønsaker",
          besk: '"digg 33333333333burger, supergod snerr liom"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: '"føtter"',
          besk: '"di44444g burger, supergod snerr liom"',
          prisw: '150'
        },
        ],
      }, {
        id: '42',
        meny: [{
          rettID: '1',
          navn: "Pizzarg",
          besk: "digg burger, supergod snerr liom",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Pinabble",
          besk: '"digg burg122222222222222222222supergod snerr liom"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "sjoritsto",
          besk: '"digg 33333333333burger, supergod snerr liom"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: "oppkuttet vegetarianer",
          besk: '"di44444g burger, supergod snerr liom"',
          prisw: '150'
        },
        ],
      }, {
        id: '43',
        meny: [{
          rettID: '1',
          navn: "BrugBurg",
          besk: "digg burger, supergod snerr liom",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Basdasdg",
          besk: '"digg burg122222222222222222222supergod snerr liom"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Bruger HEEY",
          besk: '"digg 33333333333burger, supergod snerr liom"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: "Pizza Burger",
          besk: '"di44444g burger, supergod snerr liom"',
          prisw: '150'
        },
        ],
      }, {
        id: '44',
        meny: [{
          rettID: '1',
          navn: "br33ennevin",
          besk: "digg burger, supergod snerr liom",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "kon33jakk",
          besk: '"digg burg122222222222222222222supergod snerr liom"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "vod33ka",
          besk: '"digg 33333333333burger, supergod snerr liom"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: "lique33r",
          besk: '"di44444g burger, supergod snerr liom"',
          prisw: '150'
        },
        ],
      }, {
        id: '51',
        meny: [{
          rettID: '1',
          navn: "Rullekebab",
          besk: "Eksempelteskt",
          atrib: "1",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Kebab i pita",
          besk: '"digg basdasdiom"',
          atrib: "1",
          prisw: '120'
        }, {
          rettID: '3',
          navn: "grønsaker",
          besk: '"digg 33333333333burger, supergod snerr liom"',
          atrib: "1",
          prisw: '140'
        }, {
          rettID: '4',
          navn: '"føtter"',
          besk: '"di44444g burger, supergod snerr liom"',
          atrib: "1",
          prisw: '150'
        },
        ],
      }, {
        id: '52',
        meny: [{
          rettID: '1',
          navn: "Pizzarg",
          besk: "digg burger, supergod snerr liom",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Pinabble",
          besk: '"digg burg122222222222222222222supergod snerr liom"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "sjoritsto",
          besk: '"digg 33333333333burger, supergod snerr liom"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: "oppkuttet vegetarianer",
          besk: '"di44444g burger, supergod snerr liom"',
          prisw: '150'
        },
        ],
      }, {
        id: '53',
        meny: [{
          rettID: '1',
          navn: "BrugBurg",
          besk: "digg burger, supergod snerr liom",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Basdasdg",
          besk: '"digg burg122222222222222222222supergod snerr liom"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Bruger HEEY",
          besk: '"digg 33333333333burger, supergod snerr liom"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: "Pizza Burger",
          besk: '"di44444g burger, supergod snerr liom"',
          prisw: '150'
        },
        ],
      }, {
        id: '54',
        meny: [{
          rettID: '1',
          navn: "br33ennevin",
          besk: "digg burger, supergod snerr liom",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "kon33jakk",
          besk: '"digg burg122222222222222222222supergod snerr liom"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "vod33ka",
          besk: '"digg 33333333333burger, supergod snerr liom"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: "lique33r",
          besk: '"di44444g burger, supergod snerr liom"',
          prisw: '150'
        },
        ],
      }, {
        id: '55',
        meny: [{
          rettID: '1',
          navn: "br33ennevin",
          besk: "digg burger, supergod snerr liom",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "kon33jakk",
          besk: '"digg burg122222222222222222222supergod snerr liom"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "vod33ka",
          besk: '"digg 33333333333burger, supergod snerr liom"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: "lique33r",
          besk: '"di44444g burger, supergod snerr liom"',
          prisw: '150'
        },
        ],
      },],

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
      meny: null,
      realRestaurants: restaurants,
      resturants: [
        {
          id: '1',
          title: 'Burger Hub (demo) ',
          img: '/static/dmoimg/burgerhub1.png',
          description: 'Grimstad A yeah thats a sted.',
          shortdescription: 'Grimstad A yeah thats a sted.',
          restkategori:'Burger',
          adresse: 'Sentrum 4 48179'
        },
        {
          id: '2',
          title: 'Happytime Cafe (demo)',
          img: '/static/dmoimg/happytimecafe1.png',
          description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!',
          shortdescription: 'Grimstad  you seeA yeah thats a sted.',
              restkategori:'Pizza',
          adresse: 'Sentrum 4 48179'
        },
        {
          id: '3',
          title: 'Ikko sushi (demo)',
          img: '/static/dmoimg/Ikkosushi1.png',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.',
          adresse: 'Sentrum 4 48179',
              restkategori:'Sushi Fisk',
          shortdescription: 'Gradd maxleght to this field',
          categorier: [{
            catid: '31',
            catnavn: "Sushy",

          },
          {
            catnavn: "Whoak",
            catid: '32',

          },
          {
            catnavn: "SpringRoll",
            catid: '33',
          },
          {
            catnavn: "Take away desserts",
            catid: '34',
          },
          {
            catnavn: "Drink and dirty",
            catid: '35',
          }
          ]
        },
        {
          id: '4',
          title: 'Dampen (demo)',
          img: '/static/dmoimg/dampen1.png',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.',
          adresse: 'Sentrum 4 48179',
          shortdescription: 'Short description.',
              restkategori:'Pizza Kebab',
          categorier: [{
            catid: '41',
            catnavn: "burgere",

          },
          {
            catnavn: "Pizza",
            catid: '42',

          },
          {
            catnavn: "mat",
            catid: '43',
          },
          {
            catnavn: "drikke",
            catid: '44',
          }
          ]
        },
        {
          id: '5',
          title: 'Kebabish (demo)',
          img: '/static/dmoimg/Kebabish1.png',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.',
          adresse: 'Sentrum 4 48179',
              restkategori:'Burger Kebab Pizza Indisk',
              categorier: [{
                catid: '51',
                catnavn: "Kebab",
    
              },
              {
                catnavn: "Hamburger",
                catid: '52',
    
              },
              {
                catnavn: "Pizza",
                catid: '53',
              },
              {
                catnavn: "Indisk",
                catid: '54',
              },
              {
                catnavn: "Drikke",
                catid: '55',
              }
              ]
        }
      ]

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
}


//UI INIT
/*var ui = new firebaseui.auth.AuthUI(database.auth);
ui.start('#authDisplay', {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl){
      ui.reset();
      console.log(authResult);
      //app.view.router.navigate('./backend.html');
      return false;  
    }
  },
  signInOptions: [
    {
    provider: database.authKeys.emailAuth,
    requireDisplayName: false
    }
  ],
  //signInSuccessUrl: '/backendresturant/',
  credentialHelper: 'none'
}); */

//Gjør framework7 tilgjengelig i window
window.app = app;
console.log(app.data);

// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();
  // Close login screen
  app.loginScreen.close('#my-login-screen');

  // Alert username and password
  app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
});
