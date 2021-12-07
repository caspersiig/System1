export function cartToString(sorted_cart){

    let stringify = "";

    for (const item of sorted_cart) {
        
        stringify += item.titel + "\t \t \t Antal: " + item.quantity + "\t \t \t Total: " + item.pris * item.quantity + "DKK \n"
    }

    return stringify;

}