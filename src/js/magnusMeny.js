//Funksjonalitet for å snakke med database
export function getMagnusMeny() {
  console.log("start getfromdatabase");
  const pastaMeny = db.collection('Restauranter').doc("Magnus spiseri").collection('Menyer').where('id', '>', 0);
  pastaMeny.get().then(function(querySnapshot){
    let array = [];
    querySnapshot.docs.forEach(function(document){
        array.push(document.data());
    });
    return array;
}).catch(function (error) {
    console.log("Error getting document:", error);
  });
}
export function getAllRestaurants(){
    const route = db.collection('Restauranter');
    route.get().then(function(querySnapshot){
        let array = [];
        querySnapshot.docs.forEach(function(document){
            array.push(document.data());
        });
        return array;
    }).catch(function(error){
        console.error('error i firebase getallrestaurants: ', error);
    });
}

export function getTakeoutMenu(restaurant){
    if (typeof restaurant !== 'string'){
        console.error('invalid type: Function requires string, got', typeof restaurant);
    }
    const route = db.collection('Restauranter').doc(restaurant).collection('Menyer');
    route.get().then(function(querySnapshot){
        let array = [];
        querySnapshot.docs.forEach(function(document){
            array.push(document.data());
        });
        return array;
    }).catch(function(error){
        console.error('error i getTakeOutMenu: ', error);
    })
}
