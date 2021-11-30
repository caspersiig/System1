// impotere chai og mocha
//have fun
//lets gooo!

import {assert} from "chai"

import {cartSum} from "../controller/cartSumControl.js"
import { quantity } from "../controller/quantityControl.js";


// describe("add to numbers", () => {
//     let one = 1;
//     let two = 2;

//     let result = one + two;

//     assert.equal(result, 3);
// })
// it("should return someting else", () => {
//     let one = 1;
//     let two = 3;

//     let result = one + two;

//     assert.equal(result, 5)
// })

describe("adding two or more items to return the correct price", () => {
it ("Should return the total sum of the cart", () => {
    let cart = [{imgsrc: "image.png", titel: "titel", pris: 59}, {imgsrc: "image.png", titel: "titel", pris: 59}, {imgsrc: "image.png", titel: "titel", pris: 39}]
    const result = cartSum(cart);

    assert.equal(result.total, 157);
    })
})

describe("checks the amont of items in the cart", () => {
it ("Should return the quantity of the cart", () => {
    let cart = [{imgsrc: "image.png", titel: "titel", pris: 59}, {imgsrc: "image.png", titel: "titel", pris: 59}, {imgsrc: "image.png", titel: "titel", pris: 39}]
    const result = cartSum(cart);

    assert.equal(result.quantity, 3);   
    })
})


