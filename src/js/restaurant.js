export function sync () {
    
}

export function deleteOrder(event){
    let ordersIndex = event.target.id.slice(4);
    let deletedOrders = JSON.parse(window.localStorage.getItem('toDelete')) || null;
    if(!deletedOrders){
        deletedOrders = [];
    }
    deletedOrders.push(order);
    
}