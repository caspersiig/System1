export function quantity(cart){

    let quantity_cart = [];

    let names = [];

    for (const item of cart) {

        let here = names.includes(item.titel);
    
        if(!here){
            names.push(item.titel);
            item.quantity = 1;
            quantity_cart.push(item);
        }else{
            let found = quantity_cart.find(item1 => item.titel == item1.titel);
            found.quantity += 1;
        }
    }
    return quantity_cart;
}