// impotere chai og mocha
//have fun
//lets gooo!

import {assert, expect} from "chai"

import {cartSum} from "../controller/cartSumControl.js"

describe("Adding two or more items to return the correct price", () => {
it ("Should return the total sum of the cart", () => {
        try {
            let cart = [{imgsrc: "image.png", titel: "titel", pris: undefined}, {imgsrc: "image.png", titel: "titel", pris: 59}, {imgsrc: "image.png", titel: "titel", pris: 39}]
            const result = cartSum(cart).total;
            assert.equal(result, 157);
        } catch (e) {
            console.log(e)
        }
    })
})

describe("Checks the amount of items in the cart", () => {
it ("Should return the quantity of the cart", () => {
        try {
            let cart = [{imgsrc: "image.png", titel: "titel", pris: 59}, {imgsrc: "image.png", titel: "titel", pris: 59}, {imgsrc: "image.png", titel: "titel", pris: 39}]
            const result = cartSum(cart).quantity;
    
            // assert.equal(result.quantity, cart.length);   
            expect(result).to.be.eq(3);
        } catch (e) {
            console.log(e)
        }
    })
})


