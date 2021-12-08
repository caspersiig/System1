export function cartToString(sorted_cart){

    let stringify = "";

    let totalSum = 0;

    for (const item of sorted_cart) {

        let total = item.pris * item.quantity;

        totalSum += total;
        
        stringify += item.titel + "\t \t \t Antal: " + item.quantity + "\t \t \t Total: " + item.pris * item.quantity + "DKK \n"
    }

    stringify += "\nTOTAL: " + totalSum + " DKK";

    return stringify;

}