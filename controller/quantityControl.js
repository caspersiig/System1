export function quantity(cart) {
    if (!Array.isArray(cart)) throw new RangeError ("cart is not an array")
    let quantity_cart = [];
    let names = [];

    for (const item of cart) {
        let here = names.includes(item.titel);
        
        if (typeof item !== "object") throw new TypeError ("cart.item is not an object")
        if (typeof item.titel !== "string") throw new TypeError ("item.titel is not an String")
        if (typeof item.imgsrc !== "string") throw new TypeError ("item.imgsrc is not an string") 
    
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



