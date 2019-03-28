import $$ from 'dom7'; 
import { Template7 } from 'framework7/framework7.esm.bundle.js';
import { db } from './app';
//Funksjonalitet for å snakke med database
export function magnusMeny() {
  console.log("start getfromdatabase");
  const pastaMeny = db.collection('Restauranter').doc("Magnus spiseri").collection('Menyer').where('id', '>', 0);
  pastaMeny.get().then(function (querySnapshot) {
    let template = $$('#template').html();
    let compiledTemplate = Template7.compile(template);
    querySnapshot.docs.forEach(function (e) {
      let html = compiledTemplate(e.data());
      console.log(html);
      document.getElementById('container').innerHTML += html;
    });
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });
}
export function getAllRestaurants(){
    const route = db.collection('Restauranter').where('id','<','1');
    route.get().then(function(querySnapshot){
        let restauranter = $$('#restauranter').html();
        let compiledTemplate = Template7.compile(restauranter);
        querySnapshot.docs.forEach(function(e){
            let html = compiledTemplate(e.data());
            console.log(html);
            document.getElementById('container').innerHTML += html;
        });
    }).catch(function(error){
        console.error('error i firebase getallrestaurants ', error);
    });
}