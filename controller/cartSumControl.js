

export default function cartSum(cart){
    let total = 0;
    let quantity = cart.length;

    for (const item of cart) {
        total += item.pris;
    }

    return {total: total, quantity:quantity}
}