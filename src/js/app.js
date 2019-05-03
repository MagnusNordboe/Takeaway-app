import $$ from 'dom7';
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';
// Import Cordova APIs
import cordovaApp from './cordova-app.js';
// Import Routes
import routes from './routes.js';

import firebaseui from 'firebaseui';
import * as database from './database';

//Prepare for framework7 init
var framework7app;

//Sjekk om localstorage allerede har listen over restauranter
if(window.localStorage.getItem('restaurants')){
  let restaurants = JSON.parse(window.localStorage.getItem('restaurants'));
  initializeFramework7(restaurants);
}
else{
  database.getAllRestaurants().then((array) => {
    initializeFramework7(array);
    let restaurants = JSON.stringify(array);
    window.localStorage.clear();
    window.localStorage.setItem('restaurants', restaurants);
  })
}




function initializeFramework7(restaurants){
  framework7app = new Framework7({
  root: '#app', // App root element
  id: 'io.localorder.app', // App bundle ID
  name: 'Local Order', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      menye: [{
        id: '31',
        meny: [{
          rettID: '1',
          navn: "Flying fish",
          besk: "digg burger, supergod snerr liom",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Fly fish",
          besk: '"digg burg122222222222222222222supergod snerr liom"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Catch and release",
          besk: '"digg 33333333333burger, supergod snerr liom"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: '"Glipper"',
          besk: '"di44444g burger, supergod snerr liom"',
          prisw: '150'
        },
        ],
      }, {
        id: '32',
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
        id: '33',
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
        id: '35',
        meny: [{
          rettID: '1',
          navn: "brennevin",
          besk: "digg burger, supergod snerr liom",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "konjakk",
          besk: '"digg burg122222222222222222222supergod snerr liom"',
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
          title: 'Burger 1 sjappa ',
          img: 'https://www.tynker.com/projects/screenshot/5c3ca926b7ccdd0e6220eadd/smiol.png',
          description: 'Grimstad A yeah thats a sted.',
          shortdescription: 'Grimstad A yeah thats a sted.',
          adresse: 'Sentrum 4 48179'
        },
        {
          id: '2',
          title: 'Pizza 1 stedet',
          img: 'https://www.tynker.com/projects/screenshot/5c3ca926b7ccdd0e6220eadd/smiol.png',
          description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!',
          shortdescription: 'Grimstad  you seeA yeah thats a sted.',
          adresse: 'Sentrum 4 48179'
        },
        {
          id: '3',
          title: 'Pizza 2 resturanten',
          img: 'https://www.tynker.com/projects/screenshot/5c3ca926b7ccdd0e6220eadd/smiol.png',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.',
          adresse: 'Sentrum 4 48179',
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
          title: 'Pizza 3 serveringsted',
          img: 'https://www.tynker.com/projects/screenshot/5c3ca926b7ccdd0e6220eadd/smiol.png',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.',
          adresse: 'Sentrum 4 48179',
          shortdescription: 'Short description.',
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
          title: 'Burger 2 inntak plassering',
          img: 'https://www.tynker.com/projects/screenshot/5c3ca926b7ccdd0e6220eadd/smiol.png',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.',
          adresse: 'Sentrum 4 48179',
          retter: [{
            rettID: `'1'`,
            navn: "BrudasdasdBurg",
            besk: `"digg dasbasdasurger, supergod snerr liom"`,
            prisw: '130'
          }, {
            rettID: `'2'`,
            navn: "xcvxcvbxcvbxcvzxcvxcvxcvg",
            besk: `'"dasdsadasdsadasdas snerr liom"'`,
            prisw: '120'
          }, {
            rettID: `'3'`,
            navn: "werwr4334t34EEY",
            besk: `'"digg 33333333333burger, supergod snerr liom"'`,
            prisw: '140'
          }, {
            rettID: `'4'`,
            navn: "Pizza 2343242342342342342342342342343242342er",
            besk: `'"di44444g burger, supergod snerr liom"'`,
            prisw: '150'
          }
          ]
        }
      ]

    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      framework7app.dialog.alert('Hello World!');
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

var ui = new firebaseui.auth.AuthUI(database.auth);
ui.start('#authDisplay', {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl){
      ui.reset();
      console.log(authResult);
      return true;
    }
  },
  signInOptions: [
    {
    provider: database.authKeys.emailAuth,
    requireDisplayName: false
    }
  ],
  signInSuccessUrl: '/resturantback/',
  credentialHelper: 'none'
});

//Gjør framework7 tilgjengelig i window
window.app = framework7app;
console.log(framework7app.data);
database.updateArray();
// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();
  // Close login screen
  framework7app.loginScreen.close('#my-login-screen');
  // Alert username and password
  framework7app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
});

