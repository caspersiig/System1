export function cartSum(cart){
    if (!Array.isArray(cart)) throw TypeError ("cart is not an array")
    let total = 0;
    let quantity = cart.length;

    for (const item of cart) {
        if (typeof item.pris === "string") throw new TypeError ("item.pris is a String and should be a number")
        if (isNaN(item.pris)) throw new TypeError ("item.pris is not a Number")
        if(item.pris <= 0) throw new RangeError ("item.pris is equal to or less than 0)")
        total += item.pris;
    } 
    return {total: total, quantity: quantity}
}
