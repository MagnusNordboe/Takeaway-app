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
        id: '11',
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
        id: '12',
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
        id: '13',
        meny: [{
          rettID: '1',
          navn: "Rettnavnet",
          besk: "En tydelig beskrivelse gir et godt inntrykk",
          atrib: "1",
          prisw: '49'
        }, {
          rettID: '2',
          navn: "Rett to i kategori 3",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Rett 3 ",
          besk: '"En tydelig beskrivelse gir et godt inntrykk"',
          atrib: "1",
          prisw: '140'
        }, {
          rettID: '4',
          navn: "Godt navn for eksempel",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '150'
        },
        ],
      }, {
        id: '14',
        meny: [{
          rettID: '1',
          navn: "Salgsvare 1",
          besk: "En tydelig beskrivelse gir et godt inntrykk",
          atrib: "3",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Salgsvare 2",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          atrib: "3",
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Salgsvare 3",
          besk: '"En tydelig beskrivelse gir et godt inntrykk"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: "Salgsvare 4",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '150'
        },
        ],
      }, {
        id: '15',
        meny: [{
          rettID: '1',
          navn: "Dette er godt",
          besk: "En tydelig beskrivelse gir et godt inntrykk",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Dette er digg",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Rettnavn kan være sååååååå langt",
          besk: '"En tydelig beskrivelse gir et godt inntrykk"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: "Rettnavn stammer fra?",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '150'
        },
        ],
      },{
        id: '21',
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
        id: '22',
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
        id: '23',
        meny: [{
          rettID: '1',
          navn: "Rettnavnet",
          besk: "En tydelig beskrivelse gir et godt inntrykk",
          atrib: "1",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Rett to i kategori 3",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Rett 3 ",
          besk: '"En tydelig beskrivelse gir et godt inntrykk"',
          atrib: "1",
          prisw: '140'
        }, {
          rettID: '4',
          navn: "Pizza Burger",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '150'
        },
        ],
      }, {
        id: '24',
        meny: [{
          rettID: '1',
          navn: "Salgsvare 1",
          besk: "En tydelig beskrivelse gir et godt inntrykk",
          atrib: "3",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Salgsvare 2",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          atrib: "3",
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Salgsvare 3",
          besk: '"En tydelig beskrivelse gir et godt inntrykk"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: "Salgsvare 4",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '150'
        },
        ],
      }, {
        id: '25',
        meny: [{
          rettID: '1',
          navn: "Dette er godt",
          besk: "En tydelig beskrivelse gir et godt inntrykk",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Dette er digg",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Rettnavn kan være sååååååå langt",
          besk: '"En tydelig beskrivelse gir et godt inntrykk"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: "Rettnavn stammer fra?",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '150'
        },
        ],
      },{
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
          navn: "Rettnavnet",
          besk: "En tydelig beskrivelse gir et godt inntrykk",
          atrib: "1",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Rett to i kategori 3",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Rett 3 ",
          besk: '"En tydelig beskrivelse gir et godt inntrykk"',
          atrib: "1",
          prisw: '140'
        }, {
          rettID: '4',
          navn: "Pizza Burger",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '150'
        },
        ],
      }, {
        id: '35',
        meny: [{
          rettID: '1',
          navn: "Salgsvare 1",
          besk: "En tydelig beskrivelse gir et godt inntrykk",
          atrib: "3",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Salgsvare 2",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          atrib: "3",
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Salgsvare 3",
          besk: '"En tydelig beskrivelse gir et godt inntrykk"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: "Salgsvare 4",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '150'
        },
        ],
      }, {
        id: '34',
        meny: [{
          rettID: '1',
          navn: "Dette er godt",
          besk: "En tydelig beskrivelse gir et godt inntrykk",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Dette er digg",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Rettnavn kan være sååååååå langt",
          besk: '"En tydelig beskrivelse gir et godt inntrykk"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: "Rettnavn stammer fra?",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '150'
        },
        ],
      }, {
        id: '41',
        meny: [{
          rettID: '1',
          navn: "Rettnavnet stammer fra?",
          besk: "En tydelig beskrivelse gir et godt inntrykk",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Rettnavn",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Rettnavn",
          besk: '"En tydelig beskrivelse gir et godt inntrykk"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: '"Rettnavn"',
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '150'
        },
        ],
      }, {
        id: '42',
        meny: [{
          rettID: '1',
          navn: "Rettnavn",
          besk: "En tydelig beskrivelse gir et godt inntrykk",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Rettnavn",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Rettnavn",
          besk: '"En tydelig beskrivelse gir et godt inntrykk"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: "Rettnavn",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '150'
        },
        ],
      }, {
        id: '43',
        meny: [{
          rettID: '1',
          navn: "Rettnavnet",
          besk: "En tydelig beskrivelse gir et godt inntrykk",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Rett to i kategori 3",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Rett 3 ",
          besk: '"En tydelig beskrivelse gir et godt inntrykk"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: "Pizza Burger",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '150'
        },
        ],
      }, {
        id: '44',
        meny: [{
          rettID: '1',
          navn: "Rettnavn",
          besk: "En tydelig beskrivelse gir et godt inntrykk",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Rettnavnet beskriver litt",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Fylltekst for rett",
          besk: '"En tydelig beskrivelse gir et godt inntrykk"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: "Fylltekst for rett @freedom",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
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
          besk: '"God smak" - det er mange måter å beskrive et produkt. men det er viktig å få med En tydelig beskrivelse gir et godt inntrykk og Inneholder: ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          atrib: "1",
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Rettnavn",
          besk: '"En tydelig beskrivelse gir et godt inntrykk"',
          atrib: "1",
          prisw: '140'
        }, {
          rettID: '4',
          navn: '"Rettnavn"',
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          atrib: "1",
          prisw: '150'
        },
        ],
      }, {
        id: '52',
        meny: [{
          rettID: '1',
          navn: "Rettnavn",
          besk: "En tydelig beskrivelse gir et godt inntrykk",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Rettnavn",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Rettnavn",
          besk: '"En tydelig beskrivelse gir et godt inntrykk"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: "Rettnavn",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '150'
        },
        ],
      }, {
        id: '53',
        meny: [{
          rettID: '1',
          navn: "Rettnavnet",
          besk: "En tydelig beskrivelse gir et godt inntrykk",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Rett to i kategori 3",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Rett 3 ",
          besk: '"En tydelig beskrivelse gir et godt inntrykk"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: "Pizza Burger",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '150'
        },
        ],
      }, {
        id: '54',
        meny: [{
          rettID: '1',
          navn: "Rettnavn",
          besk: "En tydelig beskrivelse gir et godt inntrykk",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Rettnavnet beskriver litt",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Fylltekst for rett",
          besk: '"En tydelig beskrivelse gir et godt inntrykk"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: "Fylltekst for rett @freedom",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '150'
        },
        ],
      }, {
        id: '55',
        meny: [{
          rettID: '1',
          navn: "Rettnavn",
          besk: "En tydelig beskrivelse gir et godt inntrykk",
          prisw: '100'
        }, {
          rettID: '2',
          navn: "Rettnavnet beskriver litt",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
          prisw: '120'
        }, {
          rettID: '3',
          navn: "Fylltekst for rett",
          besk: '"En tydelig beskrivelse gir et godt inntrykk"',
          prisw: '140'
        }, {
          rettID: '4',
          navn: "Fylltekst for rett @freedom",
          besk: '"Gode råvarer gir en god smak. Inneholder, ingrediens 1. ingrediens 2. osv.   Allergener: her kan det være"',
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
          description: 'Her kan det være en lang beskrivelse av bedriften. Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!Grimstad A yeah thats a sted.',
          shortdescription: 'En kort beskrivelse av bedriften',
          restkategori:'Burger',
          adresse: 'Sentrum 4 48179',
          categorier: [{
            catid: '21',
            catnavn: "Hamburger",

          },
          {
            catnavn: "Kategorinavn 1 ",
            catid: '22',

          },
          {
            catnavn: "Katekorinavn 2",
            catid: '23',
          },
          {
            catnavn: "Katekorinavn 3",
            catid: '24',
          },
          {
            catnavn: "Katekorinavn 4",
            catid: '25',
          }
          ]
        },
        {
          id: '2',
          title: 'Happytime Cafe (demo)',
          img: '/static/dmoimg/happytimecafe1.png',
          description: 'Her kan det være en lang beskrivelse av bedriften. Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!',
          shortdescription: 'En kort beskrivelse av bedriften .',
              restkategori:'Pizza',
          adresse: 'Sentrum 4 48179',
          categorier: [{
            catid: '21',
            catnavn: "Pizza",

          },
          {
            catnavn: "Kategorinavn 1 ",
            catid: '22',

          },
          {
            catnavn: "Katekorinavn 2",
            catid: '23',
          },
          {
            catnavn: "Katekorinavn 3",
            catid: '24',
          },
          {
            catnavn: "Katekorinavn 4",
            catid: '25',
          }
          ]
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
            catnavn: "Sushi",

          },
          {
            catnavn: "Kategorinavn 1 ",
            catid: '32',

          },
          {
            catnavn: "Katekorinavn 2",
            catid: '33',
          },
          {
            catnavn: "Katekorinavn 3",
            catid: '34',
          },
          {
            catnavn: "Katekorinavn 4",
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
    updateOrders: function(restT) {
      let data = {
        //Deleted = array med alle bestillinger som har blit slettet siden forrige gang funksjonen ble kalt.
            deleted: null,
        //currentOrders = array med alle aktive bestillinger lokalt i appen til restauranten
            currentOrders:null,
        //restaurantCtx = objekt med informasjon om restauranten som sendte request.
        };

       /* let updateOrdersCloudFunction = database.functions.httpsCallable('updateOrders');
        return updateOrdersCloudFunction(data).then((result) => {
          console.log(result);
            let newOrders = result.data;
            return newOrders;"Kebabish (demo)"
        }); */
        return db.collection('Restauranter').doc(restT).collection('Bestillinger').get().then(querySnapshot => {
          let serverSideOrders = [];

            querySnapshot.docs.forEach((element) => {
              console.log(element);
                let docData = element.data();
                serverSideOrders.push(docData);
               // element.ref.delete();
            });
            console.log(serverSideOrders);

            return serverSideOrders;
        });
    },
    addToOrder: function(ttl, order) {
    //  let restaurant = order[0][0];
    console.log(ttl);
    console.log(order);
    let restaurant = ttl;
      console.log('navn på restaurant for addToOrder: ' + restaurant);
    //  order = {  jsonstring: JSON.stringify(order)  };
    order = { order };
      const route = db.collection('Restauranter').doc(restaurant).collection('Bestillinger');
      route.add(order).then(document =>{
        console.log("Dokument laget at AddToOrder: ",document);
      });
    }
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
